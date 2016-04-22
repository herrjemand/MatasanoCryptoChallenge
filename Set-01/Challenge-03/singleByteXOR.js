(function(){
    /**
     * Takes a charachter and returns integer.
     */
    var base16CharToInt = function ( hex ) {
        var base16LookupTable = {
            '0': 0,  '1': 1,  '2': 2,  '3': 3,
            '4': 4,  '5': 5,  '6': 6,  '7': 7,
            '8': 8,  '9': 9,  'A': 10, 'B': 11,
            'C': 12, 'D': 13, 'E': 14, 'F': 15
        };

        var inputBase16Char = hex
                        .toString()
                        .toUpperCase();

        if (base16LookupTable[inputBase16Char] === undefined)
            throw new TypeError('Charachter ' + inputB16Chars[i] + ' is not a base 16 digit!');

        return base16LookupTable[inputBase16Char];
    }

    // Takes array of hex chars and returns XORed cyphertexts
    var decrypt = function( C ){ // C for Ciphertext
        var cipherTextCharArray = C.split('').map(function(a){
            return base16CharToInt(a);
        });

        var messageSpace = [];
        for(var decChar = 65; decChar < (65 + 26); decChar++){
            var tempArray = cipherTextCharArray.slice();
            var message = '';

             while(tempArray.length){
                var byte = tempArray.slice(0,2);
                tempArray = tempArray.slice(2);

                var ASCIINumber = ((byte[0] << 4) + (byte[1] | 0)) ^ decChar;
                message += String.fromCharCode(ASCIINumber);
            }

            messageSpace.push(message);
        }

        return messageSpace;
    }

    exports.decrypt = decrypt;
})()