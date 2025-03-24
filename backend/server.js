const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = 'users.json';

// Helper: Read Users
const readUsers = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Helper: Write Users
const writeUsers = (users) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

// API Key Generator
const generateApiKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const prefix = 'unityai-';
  let apiKey = prefix;
  for (let i = 0; i < 24; i++) {
    apiKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return apiKey;
};

// POST route to register and create API keys
app.post('/register', (req, res) => {
  const { name, email, affiliation, purpose } = req.body;

  console.log("Received POST /register request");
  console.log("Request body:", req.body);

  if (!name || !email || !affiliation || !purpose) {
    console.log("Missing required fields");
    return res.status(400).json({ message: 'All fields are required.' });
  }

  let users = readUsers();

  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    console.log(`API key already exists for ${email}`);
    return res.status(400).json({ 
      message: 'API key has already been generated with this email ID. Please check your email.' 
    });
  }

  const apiKey = generateApiKey();

  const newUser = { name, email, affiliation, purpose, apiKey };
  users.push(newUser);
  writeUsers(users);

  console.log(`New API key generated for ${email}: ${apiKey}`);

  res.status(200).json({ 
    message: 'API key generated successfully. Please save it securely!',
    apiKey
  });
});

// ✅ LISTEN ON PORT 5000! (Don't miss this!)
app.listen(5002, () => {
  console.log('✅ Server is running on http://localhost:5002');
});
