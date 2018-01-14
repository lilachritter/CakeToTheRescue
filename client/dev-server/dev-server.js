const express = require('express'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.listen(port);
console.log('dev server started on: ' + port);