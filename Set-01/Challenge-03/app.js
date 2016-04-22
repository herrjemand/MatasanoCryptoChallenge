var singleByteXOR = require('./singleByteXOR');

var messages = singleByteXOR.decrypt('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');

for(var i = 0; i < messages.length; i++)
    console.log(String.fromCharCode(65 + i), '->', messages[i]);