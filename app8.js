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

app.get("/db_likes", (req, res) => {
    db.serialize( () => {
        db.all("select id, name, artist , comment ,ninkido from likes;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('likes', {data:data});
        })
    })
});

app.post("/touroku", (req, res) => {
  const sql = `INSERT INTO likes (name, artist, comment, ninkido) VALUES ('${req.body.a}', '${req.body.b}', '${req.body.c}', '0')`;

  console.log(sql);

  db.serialize(() => {
  db.all("select id, name, artist , comment ,ninkido from likes;", (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
           }
        })
    db.run(sql, (error,row) => {
      console.log(error);
      if (error) {
        res.render('hentou', { mes: "エラーです" });
      } 
        res.render('hentou', { mes: "成功です" });
      
    });
  });
});
  

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
