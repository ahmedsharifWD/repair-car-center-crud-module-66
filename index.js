const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// var jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

// middleware from express.js
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdan8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("repairCar").collection("service");
        const orderCollection = client.db("repairCar").collection("order");


        // app.post('/login', async (req, res) => {
        //     const user = req.body;
        //     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        //         expiresIn: '1d'
        //     })
        //     res.send(accessToken);
        // })



        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // show the post with id
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        // POST 
        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        })

        // DELETE
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        })

        // Order collection API
        app.post('/order', async (req, res) => {
            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder);
            res.send(result);
        })

        // Order Collection show
        app.get('/order', async (req, res) => {
            const newEmail = req.query.email;
            console.log(newEmail);
            const query = { email: newEmail };
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray();
            console.log(result);
            res.send(result);
        })



    }
    finally {

    }
};

run().catch(console.dir);


/**
        This is repair car center:
        git hub link: 
        https://github.com/ahmedsharifWD/repair-car-center
 */



app.get('/', (req, res) => {
    res.send('Running the side server');
});

app.get('/hero', (req, res) => {
    res.sendStatus('Hero meets hero ku')
})

app.listen(port, () => {
    console.log('Repair server is started');
})