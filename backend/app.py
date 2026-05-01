from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'mysql123'
app.config['MYSQL_DB'] = 'event_booking'

mysql = MySQL(app)


# HOME ROUTE
@app.route('/')
def home():
    return "Flask is running"


# TEST DATABASE CONNECTION
@app.route('/test-db')
def test_db():
    cur = mysql.connection.cursor()
    cur.execute("SELECT 1")
    cur.close()
    return "Database connected"


#register
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    name = data['name']
    email = data['email']
    password = data['password']
    role = data.get('role', 'user')

    # ❌ block organizer self-registration
    if role == "organizer":
        return jsonify({"message": "Organizer can only be created by admin"}), 403

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM users WHERE email=%s", (email,))
    if cur.fetchone():
        return jsonify({"message": "User already exists"}), 409

    cur.execute(
        "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
        (name, email, password, role)
    )

    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "User registered successfully"})


# LOGIN API
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data['email'].strip()
    password = data['password'].strip()

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cur.fetchone()

    if not user:
        cur.close()
        return jsonify({"message": "User not found"}), 404

    if user[3] != password:
        cur.close()
        return jsonify({"message": "Wrong password"}), 401

    cur.close()

    return jsonify({
        "message": "Login successful",
        "user_id": user[0],
        "name": user[1],   # ✅ FIX
        "role": user[4]
    })

# admin created organizer
@app.route('/admin/create-organizer', methods=['POST'])
def create_organizer():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')   # ✅ admin provides

    if not name or not email or not password:
        return jsonify({"message": "All fields required"}), 400

    cur = mysql.connection.cursor()

    # check duplicate
    cur.execute("SELECT id FROM users WHERE email=%s", (email,))
    if cur.fetchone():
        return jsonify({"message": "Email already exists"}), 409

    # insert organizer (plain password)
    cur.execute(
        "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
        (name, email, password, "organizer")
    )

    mysql.connection.commit()
    cur.close()

    return jsonify({
        "message": "Organizer created successfully",
        "email": email
    })

#roles
@app.route('/<role>', methods=['GET'])
def get_users_by_role(role):
    cur = mysql.connection.cursor()

    try:
        # validate role (important)
        if role not in ['admin', 'organizer', 'user']:
            return jsonify({"message": "Invalid role"}), 400

        cur.execute(
            "SELECT id, name, email, role FROM users WHERE role=%s",
            (role,)
        )

        rows = cur.fetchall()
        columns = [col[0] for col in cur.description]

        data = [dict(zip(columns, row)) for row in rows]

        return jsonify(data)

    finally:
        cur.close()

# GET EVENTS API
@app.route('/events', methods=['GET'])
def get_events():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM events")

    rows = cur.fetchall()
    columns = [col[0] for col in cur.description]

    data = []
    for row in rows:
        data.append(dict(zip(columns, row)))

    cur.close()
    return jsonify(data)

#EVENT POST
@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()

    # Validation
    required_fields = ['title', 'date', 'location', 'organizer_id', 'price']
    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return jsonify({"message": f"{field} is required"}), 400

    title = data['title']
    description = data.get('description', "")
    date = data['date']
    location = data['location']
    seats = data.get('seats', 0)
    price = data['price']
    organizer_id = data['organizer_id']

    cur = mysql.connection.cursor()

    try:
        cur.execute(
            """
            INSERT INTO events 
            (title, description, date, location, seats, price, organizer_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (title, description, date, location, seats, price, organizer_id)
        )

        mysql.connection.commit()

    except Exception as e:
        mysql.connection.rollback()
        return jsonify({"message": str(e)}), 500

    finally:
        cur.close()

    return jsonify({"message": "Event created successfully"}), 201

#delete event
@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):

    data = request.get_json()
    if not data or 'organizer_id' not in data:
        return jsonify({"message": "organizer_id required"}), 400

    organizer_id = data['organizer_id']

    cur = mysql.connection.cursor()

    cur.execute(
        "DELETE FROM events WHERE id=%s AND organizer_id=%s",
        (event_id, organizer_id)
    )
    mysql.connection.commit()

    if cur.rowcount == 0:
        cur.close()
        return jsonify({"message": "Unauthorized or event not found"}), 403

    cur.close()
    return jsonify({"message": "Event deleted successfully"})

#Organizer-Event-View
@app.route('/events/organizer/<int:organizer_id>', methods=['GET'])
def get_events_by_organizer(organizer_id):
    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM events WHERE organizer_id=%s", (organizer_id,))
    rows = cur.fetchall()
    columns = [col[0] for col in cur.description]

    data = [dict(zip(columns, row)) for row in rows]

    cur.close()
    return jsonify(data)


# BOOKING API
@app.route('/bookings/<int:organizer_id>', methods=['GET'])
def getBookings(organizer_id):
    cur = mysql.connection.cursor()

    cur.execute("""
        SELECT 
            b.id,
            u.name AS user_name,
            e.title AS event_name,
            b.ticket_id
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN events e ON b.event_id = e.id
        WHERE e.organizer_id = %s
    """, (organizer_id,))

    rows = cur.fetchall()
    columns = [col[0] for col in cur.description]

    data = [dict(zip(columns, row)) for row in rows]

    cur.close()
    return jsonify(data)

#admin  All booking

@app.route('/bookings', methods=['GET'])
def get_all_bookings():
    cur = mysql.connection.cursor()

    cur.execute("""
        SELECT 
            b.id,
            u.name AS user_name,
            e.title AS event_name,
            b.ticket_id
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN events e ON b.event_id = e.id
    """)

    rows = cur.fetchall()
    columns = [col[0] for col in cur.description]

    data = [dict(zip(columns, row)) for row in rows]

    cur.close()
    return jsonify(data)


#book
@app.route('/book', methods=['POST'])
def book():
    data = request.get_json()

    user_id = data['user_id']
    event_id = data['event_id']
    ticket_id = data['ticket_id']

    cur = mysql.connection.cursor()

    # Check user exists
    cur.execute("SELECT * FROM users WHERE id=%s", (user_id,))
    user = cur.fetchone()
    if not user:
        cur.close()
        return jsonify({"message": "User not found"}), 404

    # Check event exists
    cur.execute("SELECT * FROM events WHERE id=%s", (event_id,))
    event = cur.fetchone()
    if not event:
        cur.close()
        return jsonify({"message": "Event not found"}), 404

    # Check duplicate ticket
    cur.execute("SELECT * FROM bookings WHERE ticket_id=%s", (ticket_id,))
    existing = cur.fetchone()
    if existing:
        cur.close()
        return jsonify({"message": "Ticket already exists"}), 400

    # Insert booking
    cur.execute(
        "INSERT INTO bookings (user_id, event_id, ticket_id) VALUES (%s, %s, %s)",
        (user_id, event_id, ticket_id)
    )

    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Booking successful"})


# RUN SERVER
if __name__ == "__main__":
    app.run(debug=True)