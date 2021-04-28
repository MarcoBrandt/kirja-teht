const express = require('express');
const app = express();
app.use(express.json());
express.urlencoded({limit: '5mb', extended: true});

const cors = require('cors');
app.use(cors());

const helmet = require('helmet');
app.use(helmet());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('kirjat.db')

app.listen(8080, () =>{
    console.log('Palvelin toimii osoitteessa localhost:8080');
})

app.get('/', (req, res, next) => { 
    return res.send({error:false, message: 'Toimii!'})
})

// Hae kaikki kirjat tietokannasta
app.get('/kirja/all', (req, res, next) => {
    db.all('SELECT * FROM Kirja', (error, results) => { // db.all eli haetaan kaikki
        if (error) throw error; // Virheen testausta

        /*if (typeof(result) == 'undefined') {
            return res.status(200).send({}); // Tyhjä objekti palautetaan, jos tietokannasta ei löydy riviä
        }*/
        return res.status(200).json(results); // Listataan tietokannan sisältö
    })
})

// Hae yksi kirja ID:n mukaisesti
app.get('/kirja/unique/:id', (req, res, next) => { 
    let id = req.params.id; // Ottaa :id parametrin muuttujaksi

    db.get('SELECT * FROM Kirja WHERE id=?', [id], (error, result) => { // db.get eli haetaa tietty tai tiettyjä
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

    db.run('DELETE FROM Kirja WHERE id=?', [id], function (error, result) { //db.run eli ajetaan tietokantaan toiminto
        if (error) throw error; // Virheen testausta

        return res.status(200).json( {count: this.changes}); // Palautetaan muutuneiden rivien määrä
    })
})

// Tietokantaan kirjan lisäämminen
app.post('/kirja/add', function (req, res) {
    let tap = req.body;
    //console.log(req);
    console.log(tap);
    
    db.run('INSERT INTO Kirja (title, author, description) VALUES (?, ?, ?)', [tap.title, tap.author, tap.description], function (error, result) {
        if (error) throw error;

        return res.status(200).json({count: this.changes});
    })
})

app.get('*', (req, res, next) => {
    return res.status(404).json({ error: true, message: 'Virheellinen pyyntö'})
})