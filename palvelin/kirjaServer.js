const express = require('express');
const app = express(); // Express API
app.use(express.json());

var helmet = require('helmet')
app.use(helmet()) // Helmet tietoturva

const cors = require('cors');
app.use(cors()); // Cross Origin tuki

const sqlite3 = require('sqlite3'); // SQlite 3 tietokanta
const db = new sqlite3.Database('kirjat.db');  // kirjat.db tietokanta tiedostona

app.listen(8080, () =>{
    console.log('Palvelin toimii osoitteessa localhost:8080');
})

app.get('/', (req, res, next) => { 
    return res.send({error:false, message: 'Toimii!'})
})

// Hae kaikki kirjat tietokannasta
app.get('/kirja/all', (req, res, next) => {
    db.all('SELECT * FROM kirja', (error, results) => { // db.all eli haetaan kaikki
        if (error) throw error; // Virheen testausta

        return res.status(200).json(results); // Listataan tietokannan sisältö
    })
})

// Hae yksi kirja ID:n mukaisesti
app.get('/kirja/:id', (req, res, next) => { 
    let id = req.params.id; // Ottaa :id parametrin muuttujaksi

    db.get('SELECT * FROM kirja WHERE id=?', [id], (error, result) => { // db.get eli haetaa tietty tai tiettyjä
        if (error) throw error; // Virheen testausta

        if (typeof(result) == 'undefined') {
            return res.status(200).send({}); // Tyhjä objekti palautetaan, jos tietokannasta ei löydy riviä
        }
        return res.status(200).json(result); // Listaan uniikin IDn sisältämä data
    })  
})

// Poista yksi kirja ID:n mukaisesti
app.get('/kirja/delete/:id', (req, res, next) => {
    let id = req.params.id; // Ottaa :id parametrin muuttujaksi

    db.run('DELETE FROM kirja WHERE id=?', [id], function (error, result) { //db.run eli ajetaan tietokantaan toiminto
        if (error) throw error; // Virheen testausta

        return res.status(200).json( {count: this.changes}); // Palautetaan muutuneiden rivien määrä
    })
})

// Tietokantaan kirjan lisäämminen
var multer  = require('multer') // Mahdollistaa useamman tietolähteen tallentamisen tietokantaan
var upload = multer()

app.post('/kirja/add', upload.none() ,(req, res, next) => {
	let kirja = req.body;

    db.run('insert into kirja (title,author,description) values (?, ?, ?)',
  		[kirja.title, kirja.author, kirja.description], (error, result) => {
		if (error) throw error;

		return res.status(200).json( {count: 1} );
	});
})

// Virheellisten pyyntöjen hallinta
app.get('*', (req, res, next) => {
    return res.status(404).json({ error: true, message: 'Virheellinen pyyntö'})
})