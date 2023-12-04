const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express());

app.get("/", (req, res) => {
  res.send("Crown Art is running");
});

app.listen(port, () => {
  console.log(`Crown Art is running on port: ${port}`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opcngli.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // <--- crownArtDB collections --->

    const usersCollections = client.db("crownArtDB").collection("users");

    // <--- user Apis --->

    app.post("/users", async (req, res) => {
      const user = req.body;

      const query = { email: user?.email };

      const existingUser = await usersCollections.findOne(query);

      if (existingUser) {
        res.send({ message: "user already exists!!!" });
      } else {
        const result = await usersCollections.insertOne(user);
        res.send(result);
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);