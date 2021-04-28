const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('kirjat.db');

db.serialize( () => {

	let sql = "CREATE TABLE kirja (" +
			  "id integer PRIMARY KEY NOT NULL, " +
			  "title text NOT NULL, " +
			  "author text NOT NULL, " +
			  "description text )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Esimerkki taulu luotu");
	});

	sql = "INSERT INTO `kirja` (`id`, `title`, `author`, `description`) "+
	" VALUES (1, 'The Lord of the Rings', 'J. R. R. Tolkien', 'Pls Return Ring')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `kirja` (`id`, `title`, `author`, `description`) "+
	" VALUES (2, 'Lord of the Flies', 'William Golding', 'Flies obey!')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `kirja` (`id`, `title`, `author`, `description`) "+
	" VALUES (3, 'Lord of the Dance', 'Michael Flatley', 'Dance Dance Revolution')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, title FROM kirja", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.title);
	});

	db.close();
});
