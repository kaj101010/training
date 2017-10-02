var express = require('express');
var router = express.Router();
var db = require('../db');

/* check login. */
router.post('/login', function(req, res, next) {
	console.log("login here");
	var json = {};
	var username = req.body.username;
	var password = req.body.password;

	var sqlQuery = 'SELECT id FROM users WHERE username=? AND password=?';
	var sqlData = [username, password];

	db.getConn().query(sqlQuery, sqlData, function(err, rows, fields) {
		if(err){
			console.log('Error = ' + JSON.stringify(err));
			return err;
		}
		else {
			if(rows.length > 0) {
				json.status = 'success';
				json.id = rows[0].id;
			}
			else {
				json.status = 'failed';
				json.id = 0;
			}
			
		}

		res.send(json);
		res.end();
    });
});

module.exports = router;