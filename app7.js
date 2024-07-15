const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/db_artist", (req, res) => {
    db.serialize( () => {
        db.all("select id, name from artist;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log( "row=>" + row );
            res.render('artist', {data:row});
        })
    })
})

app.get("/db_works", (req, res) => {
    db.serialize( () => {
        db.all("select id, name, artist_id , cultual_assets from works;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('works', {data:data});
        })
    })
});

app.get("/top", (req, res) => {
    console.log(req.query.pop);
    console.log(req.query.situation);
    let sql = "insert into works ("") + ";";
    console.log(sql);
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);
            res.render('select', {data:data});
        })
    })
})
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
