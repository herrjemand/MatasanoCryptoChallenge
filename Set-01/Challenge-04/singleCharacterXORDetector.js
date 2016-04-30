(function(){
    var findSingleByteXORKey = require('./findSingleByteXORKey').find;
    var singleByteXOR = require('./singleByteXOR');

    
    var detectSingleCharXOR = function(ciphertexts){
        var winner = {
            'ascii': 0,
            'spaces': 0
        };


        for(var i = 0; i < ciphertexts.length; i++){
            var bestOfSet = findSingleByteXORKey(singleByteXOR.decrypt(ciphertexts[i]));
            if(winner.ascii < bestOfSet.ascii && bestOfSet.spaces)
                winner = bestOfSet;
        }

        return winner;
    }

    exports.detect = detectSingleCharXOR;
})()
