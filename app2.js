const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
//これを入れないとpublicが使えない。expressがあるのでだいぶ楽ができているらしい
app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});
//今回の課題の肝。queryじゃないと動かないらしい。わからん。
app.get("/app/janken", (req, res) => {
let hand = req.query.hand;
let cpu_hand = Math.floor( Math.random() * 3 + 1 );
//じゃんけんを数字に置き換えて大小関係を比べようとした。
//9パターン書くよりも引き分けが２つ消え1パターンへ、隣合う大小関係と2つ離れた大小//関係を比べれる4パターンと５パターン分ですんだ。
if(hand == 'rock') hand = 1;
else if(hand == 'paper') hand = 2;
else if (hand == 'scissors') hand = 3;
hantei = '???';
//hantei を???にしておくと分負勝以外のステータスが初期値になるのでいろいろと便利だった。
if(hand == cpu_hand)hantei = 'draw';
else if(hand+1 == cpu_hand || hand-2 == cpu_hand) hantei='lose';
else if(hand-1 == cpu_hand || hand+2 == cpu_hand) hantei='win';
let irekae =0;
if(hand == 1 ) irekae = 'rock';
else if(hand == 2 ) irekae = 'paper';
else if(hand == 3 ) irekae = 'scissors';
//irekaeを宣言し代入しなおしている。この手間がある分if9パターンと比べて労力は大差ないかもしれない
let irekae2=0;
if(cpu_hand == 1 ) irekae2 = 'rock';
else if(cpu_hand == 2 ) irekae2 = 'paper';
else if(cpu_hand == 3 ) irekae2 = 'scissors';
res.render( 'janken', {
your_hand: 'あなたの手は' + irekae + 'です',
my_hand: 'わたしの手は' + irekae2 + 'です',
hantei: hantei } );
});
app.listen(8080, () => console.log("Example app listening on port 8080!"));

