var http = require('http'),
    fs = require('fs'),
    static = require('node-static'),
    file = new static.Server('./public', { cache: false }),
    app, io;

app = http.createServer(function (request, response) {
  if(request.url.split('?')[0] === '/'){
    fs.readFile('./index.html', function(err, content){
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    });
  }else{
    request.addListener('end', function () {
      file.serve(request, response);
    });
  }
});
app.listen(3000);
