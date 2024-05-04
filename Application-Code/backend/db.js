const mysql = require('mysql2');

// Function to create a connection pool
module.exports = (connectionParams) => {
  try {
    // Create a connection pool
    const pool = mysql.createPool(connectionParams);

    // Test the connection (optional)
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
      }
      console.log('Connected to MySQL database.');
      connection.release(); // Release the connection
    });

    return pool; // Return the connection pool
  } catch (error) {
    console.error('Could not connect to MySQL database.', error);
    return null; // Indicate failure (optional)
  }
};
