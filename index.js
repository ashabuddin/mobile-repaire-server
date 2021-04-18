const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kxbrw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const  mobileCollection = client.db("repair-service").collection("services");
  const reviewCollection = client.db("repair-service").collection("reviews");
  const addBookCollection = client.db("repair-service").collection("addBook");

  app.post('/addMobile', (req,res) => {
    const service = req.body
    console.log(service);
    mobileCollection.insertOne(service)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/mobile',(req,res) => {
    mobileCollection.find()
    .toArray((err, mobile) => {
      res.send(mobile)
    })
  })

  app.post('/addReview', (req,res) => {
    const review = req.body
    console.log(review);
    reviewCollection.insertOne(review)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })

  

  app.get('/reviews',(req,res) => {
    reviewCollection.find()
    .toArray((err, reviews) => {
      res.send(reviews)
    })
  })

  app.post('/addBook', (req,res) => {
    const addBook = req.body
    console.log(addBook);
    addBookCollection.insertOne(addBook)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })

  

  app.get('/books',(req,res) => {
    addBookCollection.find()
    .toArray((err, books) => {
      res.send(books)
    })
  })
  
  
});




app.listen(port)