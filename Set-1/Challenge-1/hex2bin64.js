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
    for(var i = 0; i < inputB16Chars.length; i++)
        words4Bit.push(base16LookupTable[inputB16Chars[i]]);

    return words4Bit;
}

var words4BitToBase64String = function ( words ) {
    var base64LookupTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
    var base64String = '';

    for(var i = 0; i < words.length; i++)
        base64String += base64LookupTable[words[i]];

    return base64String;

}
    
var words4bitTo6Bit = function ( twoLSB, arrayOf4BitBlocks ) {
    var base64CharArray = [];

    if(twoLSB === undefined){

        // Empty array, nothing to convert
        if(arrayOf4BitBlocks.length === 0)
            return base64CharArray;

        //Getting two 4bit words
        var words = arrayOf4BitBlocks.slice(0,2); 

        // Merging two 4bit words
        var word6bit = (words[0] << 4) + words[1]; 

        // Extracting two LSB
        var firstTwoLSB = (word6bit & 1<<1) + (word6bit & 1<<0);

        // Shifting right by 2
        word6bit = word6bit >> 2;

        // Pushing word to an array
        base64CharArray.push(word6bit)

        // Recursive call
        base64CharArray.concat(
            words4bitTo6Bit(firstTwoLSB, arrayOf4BitBlocks.slice(2)));

    }else if(twoLSB && arrayOf4BitBlocks){

        // Merging two LSB and fist item in the array
        var word6bit = (twoLSB << 4) + arrayOf4BitBlocks[0];
        base64CharArray.push(word6bit);
        base64CharArray.concat(
            words4bitTo6Bit(undefined, arrayOf4BitBlocks.slice(1)))
    }

    return base64CharArray;
}

console.log(hexToInt('7e0'))