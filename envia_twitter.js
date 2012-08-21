#!/usr/bin/env node
var   twitter = require('ntwitter');
var program = require('commander');


program
  .version('0.0.1')
  .option('-f, --frase [type]', 'fase hashtag [#ejemplo]', 'ejemplo')
  .parse(process.argv);
  console.log('  - %s ', program.palabra);

  var twit = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  });

if(program.palabra){
    
    twit
      .verifyCredentials(function (err, data) {
      }).updateStatus(program.palabra,
        function (err, data) {
          //console.log(data);
          if(err){
           // console.log(err);
          }
      });
}
