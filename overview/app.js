// const express = require('express');

// // Create the Express app
// const app = express();

// const logTime = (req, res, next) => {
//     console.log("Current time: ", new Date().toISOString());
//     next();
// };

// app.use(logTime);

// const passOnMessage = (req, res, next) => {
//     console.log("Passing on a message!");
//     req.passedMessage = "Hello from passOnMessage!";
//     next();
// };

// // Assign routes
// app.get('/', passOnMessage, (req, res) => {
//     // Send a response back to the client
//     console.log("Passed Message: ", req.passedMessage)
//     res.send('Hello');
// });

// app.get('/bye', (req, res) => {
//     res.send("Bye World.")
// });

// app.post('/users', (req, res) => {
//     // Do something...
//     // Send a response back to the client
// });

// // Tell the server to listen for incoming traffic on a specific port
// const port = 3000;

// app.listen(port, () => console.log(`Listening on port ${port}...`));



// error handling example

const express = require('express');
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/throw-error', (req, res) => {
  throw new Error('An error occurred!');
});

// Custom error handler

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        console.log(err);
    } else {
        console.error(err);
    }
    next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send('An error occurred! Please check the url, or wait a few minutes and try again. Or not...');
});

// Define a port and start listening for connections
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));