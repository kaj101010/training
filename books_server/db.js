/* put controller actions here */
var mysql = require('mysql');
var _dbConnection = null;

/* Code to set up MySql and handle disconnect errors. */
exports.initializeDb = function (config, callback) {
	//log.info('Initializing msqyl database');

	function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
			console.log('connection error', error)
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeDb(connection.config, callback);
                } else if (error.fatal) {
                    throw error;
                }

                var json = {isConnected: false};
				callback(json);
            }
        });
    }
	
	var connection = mysql.createConnection(config);

	// Add handlers.
    addDisconnectHandler(connection);
	
	connection.connect(function(err) {
		var json = {};
		if(err) {
			console.log("Error connecting to database! = " +err);
			console.log("Error connecting to database!");
			json.isConnected = false;
			json.err = err;
			callback(json);
			return;
		}
		
		_dbConnection = connection;
		json.isConnected = true;
		callback(json);	
	});
};

exports.getConn = function() {
	return _dbConnection;
}