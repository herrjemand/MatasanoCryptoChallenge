(function(){
    /**
     * Takes a string
     */
    var base16To4bitWords = function ( hex ) {
        var base16LookupTable = {
            '0': 0,  '1': 1,  '2': 2,  '3': 3,
            '4': 4,  '5': 5,  '6': 6,  '7': 7,
            '8': 8,  '9': 9,  'A': 10, 'B': 11,
            'C': 12, 'D': 13, 'E': 14, 'F': 15
        }

        var inputB16Chars = hex
                        .toString()
                        .toUpperCase()
                        .split('');

        var words4Bit = [];
        for(var i = 0; i < inputB16Chars.length; i++){
            if(base16LookupTable[inputB16Chars[i]] === undefined)
                throw new TypeError('Charachter ' + inputB16Chars[i] + ' at position ' + i + ' is not a base 16 digit!');

            words4Bit.push(base16LookupTable[inputB16Chars[i]]);
        }

        return words4Bit;
    }

    /**
     * Takes array of six, four bit words, 
     * and converts them to an array of four six bit words
     */
    var processBase64Octet = function( fourBitWordArray ){

        if(fourBitWordArray.length != 6)
            throw new RangeError('You must give 6 four bit words!');

        var octetTriple = 0;
        for(var i = 0; i < fourBitWordArray.length; i++){
            if(15 < fourBitWordArray[i])
                throw new RangeError('The value ' + fourBitWordArray[i] + ' is bigger than 4bits');

            octetTriple = (octetTriple << 4) + fourBitWordArray[i];
        }

        var sixBitMask = 63; // 111111
        var sixBitWordArray = [];

        while(octetTriple > 0){
            sixBitWordArray.push(octetTriple & sixBitMask);
            octetTriple = octetTriple >> 6;
        }

        return sixBitWordArray.reverse();

    }


    /**
     * Takes array of 6bit words and returns base64 string.
     */
    var sixBitWordsToBase64Chars = function ( words ) {
        var base64LookupTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
        var base64String = '';

        for(var i = 0; i < words.length; i++)
            base64String += base64LookupTable[words[i]];

        return base64String;
    }

    /** 
     * Converts HEX to BASE64
     */
    var HexToBase64 = function( hex ) {
        var hexArray = base16To4bitWords(hex);
        var base64Array = [];

        var missingOctetBytes = 0;

        while (hexArray.length > 0) {
            if(hexArray.length < 6){
                if(hexArray.length < 3)
                    missingOctetBytes = 2;
                else if(hexArray.length < 5)
                    missingOctetBytes = 1;

                while(hexArray.length < 6)
                    hexArray.push(0);
            }

            base64Array = base64Array.concat(
                processBase64Octet(
                    hexArray.slice(0,6)
            ));

            hexArray = hexArray.slice(6);
        }

        // Removing `BAD` 6bit words
        var base64Array = base64Array.slice(0, base64Array.length - missingOctetBytes);

        var base64String = sixBitWordsToBase64Chars(base64Array);

        while(missingOctetBytes > 0){
            base64String += '=';
            missingOctetBytes--;
        }

        return base64String;
    }

    exports.convertHexToBase64 = HexToBase64;
})()