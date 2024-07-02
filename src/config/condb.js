const mongoose = require('mongoose');
const userDbConnection = mongoose.createConnection(process.env.DB_NAME);
try{
    userDbConnection.on('open', async (err) => {
        if (err) { await console.log(err) }
        await console.log("=> database is connected!")
    });
}catch(err){
    console.log(err);
}

module.exports = userDbConnection;