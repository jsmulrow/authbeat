// converts to binary after forcing to unsigned int
function dec2bin(dec) {
	return (dec >>> 0).toString(2);
}

// crc32 checksum include
var CRC32 = require('crc-32');

// obtains 32 bit representation of crc32 checksum of a string
function getTumbler(str) {
	// converts crc32 checksum into binary
	var bin = dec2bin(CRC32.str(str));
	// pads binary string wtih 0's into full 32 bit representation
	return Array(33 - bin.length).join('0') + bin;
};

// tumbles (reorders) intervals according to crc32 checksum of password
// crc32 checksum should add randomness to order of interval that can be replicated
function tumbleIntervals(intervals, pass) {
	// grabs crc32 checksum
	var tumbler = getTumbler(pass);

	// finish contains the final tumbled string
	var finish = '';
	// leftover contains intermediate strings
	var leftover = '';
	// i contains the index of the tumbler
	var i = 0;

	// stop when we reach the end of the checksum, or when we have finished reordering
	while (i < 32 && intervals != '') {
		var c = tumbler.charAt(i);
		// keeps value if tumbler says so
		if (c == '1') {
			finish += intervals.substring(0,4);
		} else {
			leftover += intervals.substring(0,4);
		}
		intervals = intervals.substring(4);
		if (intervals == '' && leftover != '') {
			intervals = leftover;
			leftover = '';
		}
		i++;
	}
	finish += leftover;
	return finish;
};

tumbleIntervals('0111011201130114','oijweoifjoiwj');
