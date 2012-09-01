var   twitter = require('ntwitter');
      osc = require('omgosc');
      http = require('http');
    //dev.twiiter.com  
    var twit = new twitter({
      consumer_key: '',
      consumer_secret: '',
      access_token_key: '',
      access_token_secret: ''
    });
    
   var x = 0;
   var y = 0;
   var pos = 0;
   var broadcast = [];
   var ip_rang = 'x.x.x.x';
   var track = 'soleu'
   broadcast['broadcast'] = true;
   //define ip
   var sender = new osc.UdpSender(ip_rang, 7777, broadcast);

   twit.stream('statuses/filter', {track:track}, function(stream) {
      stream.on('data', function (data) {
      var text = data.text;
      var palabras = text.split(" ");
        //bucle para trabajar con las palabras
        for (var i = 0; i < palabras.length; i++) {
             var text = data.text;
             var palabras = text.split(" ")

             for (var i = 0; i < text.length; i++) {
               sender.send('/osc_data', 's',  [text[i]]);
             };
             sender.send('/numero', 'i',  [text.length]);

             if(x !== 320){
               x = x+10;
               console.log('x: '+ x);
                console.log('pos: '+ pos);
                sender.send('/md8key/ctrl_layer_position_x/0', 'f',  [x+10]);
             }else{
                x = 320; 
             }
             switch(pos) {
               case 0:
                sender.send('/md8key/ctrl_layer_movie_shuttle1/0', 'f',  [0.0]);
                sender.send('/md8key/ctrl_layer_movie_shuttle2/0', 'f',  [0.60]);
                pos++;
                 break
               case 1:
                sender.send('/md8key/ctrl_layer_movie_shuttle2/0', 'f',  [0.0]);
                sender.send('/md8key/ctrl_layer_movie_shuttle1/0', 'f',  [0.60]);
                pos = 0;
                break;
               default:
             }
             console.log(data.text);
             console.log('sender');
        };
      });
      stream.on('error', function (response) {
        console.log(response);
      });
    }); 
