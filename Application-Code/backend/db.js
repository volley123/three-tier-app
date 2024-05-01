const mysql = require('mysql');

module.exports = async () => {
    try {
        const connectionParams = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        };

        // Create a connection pool
        const pool = mysql.createPool(connectionParams);

        // Test the connection
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                return;
            }
            console.log('Connected to MySQL database.');
            connection.release(); // Release the connection
        });

        // Attach the connection pool to the global object for reuse
        global.mysqlPool = pool;
    } catch (error) {
        console.error('Could not connect to MySQL database.', error);
    }
};
