const mongoose = require('mongoose');
let userDbConnection;

if (!userDbConnection || userDbConnection.readyState === 0) {
    userDbConnection = mongoose.createConnection(process.env.DB_NAME);

    userDbConnection.on('open', () => {
        console.log("=> Database is connected!");
    });

    userDbConnection.on('error', (err) => {
        console.error("Database connection error:", err);
    });
} else {
    console.log("=> Database is already connected!");
}

module.exports = userDbConnection;