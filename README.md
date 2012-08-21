TweetOsc
========

Ejemplo realizado en el summeroflabs, donde un envento de eschucha en un hashtag concreto permite el envio de información por osc.


El paquete omgosc tiene un bug que no permite enviar por broadcast, para arreglaro hace falta editar en el node_modules/omgosc/omgosc.js la linea 30 y añadir esto:

udp.bind();



