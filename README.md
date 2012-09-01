TweetOsc
========

Este es el resultado del experimento que realizamos en el Summeroflabs de Bilbo en Zwap. 
La idea sencilla mediante node.js hacíamos un track del hashtag #soleu para luego manipular los datos de twett y enviarlos por osc.

Nodejs permite se un gran intermediario, en este caso una oreja que escucha en internet y actúa según lo que le llega, mezclando dominios diferentes web en la escucha multimedia (osc) en el envió


Ficheros
--------

* summeroflabs.js: Esta es la oreja, con las acciones que creamos en summeroflabs. 
   * El primer ejemplo despiezamos el texto del tweet en letras que luego [txa](https://twitter.com/txa) mediante pure-data convertia en sonido. Para realizar esto usamos dos Key de osc /osc_data de tipo string donde se mandaba las letras, y /numero un entero, con la cantidad de caracteres del tweet.
   * El segundo ejemplo lo realice con el gran [txo](http://www.elurmaluta.net/) en este caso queríamos que dependiendo de la palabra (no este implementado en el código) una animación de un cuervo controlado por Txo, se moviera en un mapping que relizamos. Las keys tipo /md8key/ctrl_layer_position_x/0', 'f',  [x+10] son las que pide el modul8. 
* envia_twitter.js: Es una utilidad de linea de comandos que nos permitía enviar los twetters desde la consola acelerando las pruebas.


En resumen, la potencia de node.js para trabajar en ámbitos diferentes es brutal.
