(function(){
    var findSingleByteXORKey = require('./findSingleByteXORKey').find;
    var singleByteXOR = require('./singleByteXOR');

    var detectSingleCharXOR = function(ciphertexts){
        return ciphertexts.map(function(ciphertext){
            var messages = singleByteXOR.decrypt(ciphertext);
            return findSingleByteXORKey(messages).message
        })
    }

    exports.detect = detectSingleCharXOR;
})()
