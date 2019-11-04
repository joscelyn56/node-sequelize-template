const http = require('./src/server/http');

http.listen(process.env.PORT || 5001, function() {
    console.log("Server running");
});