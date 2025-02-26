// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;
// const apiRoutes = require('./routes/api');  // Import the API routes

// app.use(cors());  // Allow cross-origin requests

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });

// app.use('/api', apiRoutes);  // Use the routes for `/api`

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const apiRoutes = require('./routes/api');  // Import the API routes
const emailRoutes = require('./routes/email');  // Import the email routes

app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // To handle JSON request bodies

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use('/api', apiRoutes);  // Use the routes for `/api`
app.use('/api', emailRoutes);  // Use the email routes for `/api/send-email`

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
