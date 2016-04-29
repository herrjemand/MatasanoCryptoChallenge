(function(){
    /**
     * Returns score object of message
     * @param  {String} message - decrypted message
     * @param  {String} key     - message key
     * @param  {Number} id      - array id
     * @return {Object}         - returns Score object
     */
    var scorer = function(message, key, id){
        var lookupTable = {'A': true, 'B': true, 'C': true, 'D': true, 'E': true, 'F': true, 'G': true, 'H': true, 'I': true, 'J': true, 'K': true, 'L': true, 'M': true, 'N': true, 'O': true, 'P': true, 'Q': true, 'R': true, 'S': true, 'T': true, 'U': true, 'V': true, 'W': true, 'X': true, 'Y': true, 'Z': true }; // English alphabet


        var score = {
            'message':       message, // message to score
            'key':           key,     // one char key
            'id':            id,      // array id
            'messageLength': 0,       // length of the message(chars)
            'ascii':         0,       // number of ascii chars
            'spaces':        0        // number of space chars
        };

        var arrMessage = message
                            .toUpperCase()
                            .split('');

        score.messageLength = arrMessage.length;

        for(var i = 0; i < arrMessage.length; i++){
            if(lookupTable[arrMessage[i]])
                score.ascii++; // if letter[a-zA-Z] char

            if(arrMessage[i] === ' ')
                score.spaces++;// if Space char
        }

        return score;
    }


    /**
     * Takes array of single char permutated message(decrypted with single char), and returns one with the highest human readability score.
     * @param  {Array} messages - Array of messages, each is decryption of cipher text with a single char.
     * @return {Object}         - highest Score object
     */
    var findSingleByteXORKey = function(messages){


        var winner = {
            'ascii': 0,
            'spaces': 0
        };

        for(var i = 0; i < messages.length; i++){
            var currentScore = scorer(messages[i], String.fromCharCode(65 + i), i);

            // More spaces, and string must have ASCII chars
            if(currentScore.spaces > winner.spaces && currentScore.ascii > 0)
                // Spaces must not make more than 1/3 of message
                if(currentScore.spaces <= currentScore.messageLength / 3)
                    winner = currentScore;
        }

        return winner;
    }

    exports.find = findSingleByteXORKey
})()