var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var cryptolib = require('crypto');

var app = express();
app.use(morgan('combined'));

var config = {
    user: 'aillanan',
    password: process.env.DB_PASSWORD,
    database: 'aillanan',
    host: 'db.imad.hasura-app.io',
    port: '5432'
};


//create pool configuration
var pool = new Pool(config);

// var articles = 
// {
//     'article-one': {
//         title: "article-one",
//         heading: "Article-One",
//         date:   "20th August 2017",
//         content: "This is article one content."
//     },
//     'article-two': {
//         title: "article-two",
//         heading: "Article-two",
//         date:   "21st August 2017",
//         content: "This is article two content."
//     },
//     'article-three': {
//         title: "article-three",
//         heading: "Article-Three",
//         date:   "22nd August 2017",
//         content: "This is article three content."
//     }
// };

function createtemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var date    = data.date;
    var htmltemplate =
        `<html>
            <head>
                <title>
                    ${title}
                </title>
                <meta name="viewport" content="width=device-width, intial-scale=1"/>
                <link href="ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a>
                    </div>
                    <hr/>
                    <h1>
                        ${heading}
                    </h1>
                    <div>
                        ${date.toDateString()}
                    </div>
                    <div>
                        <p>
                            ${content}
                        </p>
                    </div>
                </div>
            </body>
        </html>`;
    return htmltemplate;
}

function hash(input, salt) {
    var hashvar = cryptolib.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return (hashvar.toString('hex'));
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM test', function(err, result) {
      if (err) {
          res.status(500).send(err.toString());
      }
      else {
          res.send(JSON.stringify(result.rows));
      }
  });
});

var count=0;
app.get('/counter', function(req,res){
    count += 1;
    res.send(count.toString());
});

var namesli = [];
app.get('/:submit-name', function (req, res) {
 var param = req.query.name;
 namesli.push(param);
 res.send(JSON.stringify(namesli));
});

app.get('/article/:articleName', function (req, res) {
 //res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
 //var articleName = req.params.articleName;
 //res.send(createtemplate(articles[articleName]));
 pool.query("SELECT * from article WHERE title= $1", [req.params.articleName], function (err,result) {
     if (err) {
         res.status(500).send(err.toString());
     }
     else {
         var articledata = result.rows[0];
         res.send(createtemplate(articledata))
     }
 });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function(req, res) {
   res.sendfile(path.join(__dirname, 'ui', 'main.js'));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

app.get('/hash/:input', function(req,res){
    var hashedstring = hash(input, "this is random string");
    res.send(hashestring);
});
var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
