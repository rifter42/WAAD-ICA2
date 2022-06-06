// Import express and other components
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

// Import routes
const questionRoutes = require("./routes/questionRoutes.js");
const optionRoutes = require("./routes/optionRoutes.js");

// Init express
const app = express();

// Serve frontend with express with the use of connect-history-api-fallback
// to correctly handle routes
const staticFileMiddleware = express.static('public');

// use Body Parses for JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// use CORS
app.use(cors());

// History API
app.use(staticFileMiddleware);
app.use(history({
  index: '/index.html'
}));

// Use routers for api
app.use("/api/qa", questionRoutes);
app.use("/api/qa/:question_id/options", optionRoutes);

// For redirected requests
app.use(staticFileMiddleware);

// Start the server
const port = app.listen(process.env.PORT || 5000);
app.listen(port, () => console.log('Server running'));
