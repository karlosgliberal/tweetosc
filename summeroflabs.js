var   twitter = require('ntwitter');
      osc = require('omgosc');
      http = require('http');
// Permitir envio tipo broadcast de los comandos osc
var broadcast = [];
    broadcast['broadcast'] = true;
//rango de ip deonde se envia los comando osc 'x.x.x.255' en caso de que sea broadcast
var ip_rang = 'x.x.x.x';
//palabra clave a trackear
var track = 'soleu'

//Configuraciónde las keys para trabajar con la api de twitter dev.twiiter.com
var twit = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

//variables para mover el cuervo txo
var x = 0;
var y = 0;
var pos = 0;

//inizializador del OSC con broadcast
var sender = new osc.UdpSender(ip_rang, 7777, broadcast);

//Escucha del streem de twitter en el track definido
twit.stream('statuses/filter', {track:track}, function(stream) {
  stream.on('data', function (data) {
  //captura del tweet en data esta todo el objeto twetter
  var text = data.text;
  var palabras = text.split(" ");
    //bucle para trabajar con las palabras
    for (var i = 0; i < palabras.length; i++) {
         var text = data.text;
         var palabras = text.split(" ")

         //envio del tamaño de caracteres del tweet 
         sender.send('/numero', 'i',  [text.length]);
         //Despiece del tweet en letras
         for (var i = 0; i < text.length; i++) {
           //envio de las letras
           sender.send('/osc_data', 's',  [text[i]]);
         };
         
         //control de posiciones para el cuervo
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
