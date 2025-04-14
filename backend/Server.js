const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("myData");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
}

connectToMongoDB();

// API Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

// Authentication routes
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const usersCollection = db.collection('users');
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    await usersCollection.insertOne({ username, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user: { username: user.username } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Transaction routes
app.get('/api/transactions', async (req, res) => {
  try {
    const transactionsCollection = db.collection('transactions');
    const transactions = await transactionsCollection.find({}).toArray();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/transactions', async (req, res) => {
  const { name, amount, type } = req.body;
  try {
    const transactionsCollection = db.collection('transactions');
    const result = await transactionsCollection.insertOne({
      name,
      amount: parseFloat(amount),
      type,
      date: new Date()
    });
    res.status(201).json({ message: "Transaction added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
