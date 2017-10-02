var express = require('express');
var router = express.Router();
var db = require('../db');

/* Get a list of book to listing */
router.get('/list', function(req, res, next) {
	console.log("wews")
	var json = {};
	var sqlQuery = 'SELECT id, title, author, publisher, published_date, price FROM books';

	db.getConn().query(sqlQuery, function(err, rows, fields) {
		if(err) {
			console.log('Error = ' + JSON.stringify(err));
			return err;
		}

		json.books = rows;
		res.send(json);
		res.end();
	});
});

/* Add a book to listing. */
router.post('/add', function(req, res, next) {
	var title = req.body.title;
	var author = req.body.author;
	var publisher = req.body.publisher;
	var publishedDate = req.body.published_date;
	var price = req.body.price;
	var json = {};

	var sqlQuery = 'INSERT INTO books (title, author, publisher, published_date, price) VALUES (?,?,?,?,?)';
	var sqlData = [title, author, publisher, publishedDate, price];

	db.getConn().query(sqlQuery, sqlData, function(err, rows, fields) {
		if(err){
			console.log('Error = ' + JSON.stringify(err));
			return err;
		}
		
		json.status = 'success';
		json.id = rows.insertId;

		res.send(json);
		res.end();
    });
});

/* edit a book to listing */
router.put('/update', function(req, res, next) {
	var id = req.body.id;
	var title = req.body.title;
	var author = req.body.author;
	var publisher = req.body.publisher;
	var publishedDate = req.body.published_date;
	var price = req.body.price;	
	var json = {};

	var sqlQuery = 'UPDATE books SET title=?, author=?, publisher=?, published_date=?, price=? WHERE id=?';
	var sqlData = [title, author, publisher, publishedDate, price, id];

	db.getConn().query(sqlQuery, sqlData, function(err, rows, fields) {
		if(err) {
			console.log('Error = ' + JSON.stringify(err));
			return err;
		}

		json.status = 'success';

		res.send(json);
		res.end();
	});
});

/* delete a book to listing */
router.delete('/delete', function(req, res, next) {
	var id = req.body.id;
	var json = {};

	var sqlQuery = 'DELETE FROM books WHERE id=?';
	var sqlData = [id];

	db.getConn().query(sqlQuery, sqlData, function(err, rows, fields) {
		if(err) {
			console.log('Error = ' + JSON.stringify(err));
			return err;
		}

		json.status = 'success';

		res.send(json);
		res.end();
	});
});

module.exports = router;