import os
from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configure MySQL from environment variables (keep as is)
app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST', 'localhost')
app.config['MYSQL_USER'] = os.environ.get('MYSQL_USER', 'default_user')
app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD', 'default_password')
app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB', 'default_db')

# Initialize MySQL (keep as is)
mysql = MySQL(app)

# Create a new table 'todo' if it doesn't exist (add this)
def create_todo_table():
    try:
        with connection.cursor() as cursor:
            cursor.execute('''CREATE TABLE IF NOT EXISTS todo (
                id INT AUTO_INCREMENT PRIMARY KEY,
                text VARCHAR(255) NOT NULL
            )''')
        connection.commit()
    except:
        pass  # Handle any errors during table creation

create_todo_table()

# Function to get all todos from database (add this)
def get_all_todos():
    try:
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM todo')
            return cursor.fetchall()
    except:
        return None

# Function to add a new todo to the database (add this)
def add_todo(todo):
    try:
        with connection.cursor() as cursor:
            cursor.execute('INSERT INTO todo (text) VALUES (%s)', (todo,))
        connection.commit()
        return True
    except:
        return False

# Function to delete a todo from the database (add this)
def delete_todo(id):
    try:
        with connection.cursor() as cursor:
            cursor.execute('DELETE FROM todo WHERE id = %s', (id,))
        connection.commit()
        return True
    except:
        return False

@app.route('/')
def index():
    todos = get_all_todos()
    return render_template('index.html', todos=todos)

@app.route('/add', methods=['POST'])
def add():
    todo = request.form.get('todo')
    if add_todo(todo):
        return redirect(url_for('index'))
    else:
        return "Error adding todo"

@app.route('/delete/<int:id>')
def delete(id):
    if delete_todo(id):
        return redirect(url_for('index'))
    else:
        return "Error deleting todo"

if __name__ == '__main__':
    app.run(debug=True)