const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }

  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }

    req.decoded = decoded;
    next();
  });
};

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
    client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // <--- crownArtDB collections --->

    const usersCollection = client.db("crownArtDB").collection("users");
    const coursesCollection = client.db("crownArtDB").collection("courses");

    // <--- json web token apis --->

    app.post("/jwt", (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;

      const query = { email: email };

      const user = await usersCollection.findOne(query);

      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      next();
    };

    // <--- users Apis --->

    app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }

      const query = { email: email };

      const user = await usersCollection.findOne(query);

      const result = { admin: user?.role === "admin" };
      res.send(result);
    });

    app.get("/users/instructor/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ instructor: false });
      }

      const query = { email: email };

      const user = await usersCollection.findOne(query);

      const result = { instructor: user?.role === "instructor" };
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;

      const updatedUser = { ...user, role: "student" };

      const query = { email: user?.email };

      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        res.send({ message: "user already exists!!!" });
      } else {
        const result = await usersCollection.insertOne(updatedUser);
        res.send(result);
      }
    });

    app.patch(
      "/users/student/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const query = { _id: new ObjectId(req.params.id) };

        const updateDoc = {
          $set: {
            role: "student",
          },
        };

        const result = await usersCollection.updateOne(query, updateDoc);
        res.send(result);
      }
    );

    app.patch(
      "/users/instructor/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const query = { _id: new ObjectId(req.params.id) };

        const updateDoc = {
          $set: {
            role: "instructor",
          },
        };

        const result = await usersCollection.updateOne(query, updateDoc);
        res.send(result);
      }
    );

    app.patch("/users/admin/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };

      const updateDoc = {
        $set: {
          role: "admin",
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // <--- courses collections apis --->

    app.get("/courses", async (req, res) => {
      const result = await coursesCollection.find().toArray();
      res.send(result);
    });

    app.get("/courses/admin", verifyJWT, verifyAdmin, async (req, res) => {
      const result = await coursesCollection.find().toArray();
      res.send(result);
    });

    app.get("/courses/instructor/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      const query = { email: email };

      const result = await coursesCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/courses/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await coursesCollection.findOne(query);
      res.send(result);
    });

    app.post("/courses", verifyJWT, async (req, res) => {
      const result = await coursesCollection.insertOne(req.body);
      res.send(result);
    });

    app.put("/courses/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const info = req.body;

      const filter = { _id: new ObjectId(id) };

      const updateDoc = {
        $set: {
          name: info.name,
          image: info.image,
          description: info.description,
          seats: info.seats,
          price: info.price,
          status: info.status,
        },
      };

      const result = await coursesCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.patch(
      "/courses/admin/approve/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;

        const filter = { _id: new ObjectId(id) };

        const updateDoc = {
          $set: {
            status: "approved",
          },
        };

        const result = await coursesCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
