var XORHexs = require('./XORHexs').XORHexs;

var hex1 = '1c0111001f010100061a024b53535009181c';
var hex2 = '686974207468652062756c6c277320657965';
var expected = '746865206b696420646f6e277420706c6179'.toUpperCase();
console.log('Expected: ', expected);
console.log('Got: ', XORHexs(hex1, hex2))
console.log('Matched: ', XORHexs(hex1, hex2) === expected)
