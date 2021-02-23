const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/*
*** Import routes
*/
const postingRoute = require('./routes/posts');
const imageRoute = require('./routes/image');
const userRoute  = require('./routes/users');

app.use('/uploads/images', express.static('images'));
app.use('/postings', postingRoute);
app.use('/user', userRoute);
app.use('/uploads', imageRoute);

/*
*** Start server
*/
module.exports = app.listen(port, () => console.log(`Server running in port ${port}`));