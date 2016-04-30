var fs                  = require('fs');
var detectSingleCharXOR = require('./singleCharacterXORDetector').detect;

var result = function(data){
    var foundResult = detectSingleCharXOR(data.toString().split('\n'))
    console.log('The message was: ', foundResult.message)
}
fs.readFile( __dirname + '/4.txt', function (err, data) {
    if (err)
        throw err;
    result(data);
});


