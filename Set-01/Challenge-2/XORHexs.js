(function(){
    /**
     * Takes a string
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

    var intToBase16 = function( integer ) {
        var base16LookupTable = '0123456789ABCDEF'.split('');
        
        return base16LookupTable[integer];
    }

    var XORHexs = function( hex1, hex2 ){
        var hex1Digits = hex1.split('').map(function(a){
            return base16CharToInt(a);
        });
        var hex2Digits = hex2.split('').map(function(a){
            return base16CharToInt(a);
        });

        if (hex1Digits.length !== hex2Digits.length)
            throw new RangeError('Input 1 and Input 2 length missmatch!');

        var XORedHexes = '';
        for(var i = 0; i < hex1Digits.length; i++){
            XORedHexes += intToBase16(hex1Digits[i] ^ hex2Digits[i])
        }

        return XORedHexes;
    }

    exports.XORHexs = XORHexs;
})()