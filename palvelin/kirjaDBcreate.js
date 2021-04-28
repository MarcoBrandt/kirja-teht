const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('kirjat.db');

db.serialize ( () => {
    let sql = 'CREATE TABLE Kirja (' + 
    'id integer PRIMARY KEY NOT NULL, ' + 
    'title text, ' +
    'author text, ' +
    'description text ) ';

    db.run(sql, (err) => { if (err) { return console.log(err.message) }})
}) 