/*
 * A class for formatting number to significant digits.
 * Copyright (C) 2001 Stephen Ostermiller
 * http://ostermiller.org/contact.pl?regarding?JavaScript+Significant+Figures
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

/**
 * An object tho both scans floating points to
 * determine the number of significant figures.
 * and can display a floating point using any number
 * of significant figures.
 *
 * @param s A string representation of a floating point.
 */
function SignificantFigures(s){
    this.order = parseOrder(s);
    this.mantissa = parseMantissa(s);
    this.positive = parseSign(s);

    /**
     * Get the number of significant figures this object uses.
     * Leading zeros are not significant.  Traling zeros up to
     * and after the decimal point are significant.
     * Significant figures is good to know when the number is
     * used in multiplication.
     *
     * @return the number of significant figures.
     */
    this.sigFigs = this.mantissa.length;

    /**
     * Get the least significant decimal this object uses.
     * This is useful to know if a number is being used
     * in addition.
     * 400 - 2 the hundreds place (10^2) is the least significant decimal.
     * 75 - 0 the ones place (10^0) is the least significant decimal.
     * .543 - -3 the 1/1000's place (10^-3) is the least significant decimal.
     *
     * @return an integer representing the least significant decimal place.
     */
    this.sigDecs = ((this.order) - this.mantissa.length);
}

/**
 * Format a floating point for display using the specified
 * number of significant figures and least significant decimal.
 * Scientific notation may used by this method if this
 * object is very small, very large, has many significant
 * figures, or the number of significant figures would be
 * ambiguous in the output if scientific notation were not
 * used.
 *
 * @param f A floating point number that should be displayed
 * @param sigFigs desired number of significant figures (integer).
 * @param sigDecs the least significant decimal place (integer).
 * @param scientific true iff scientific notation should always be used.
 * @return a string of this object formatted correctly.
 */
function displaySigFigs(f, sigFigs, sigDecs, scientific){
    var s = "" + f;
    var order = parseOrder(s);
    var mantissa = parseMantissa(s);
    var positive = parseSign(s);
    var add;
    var decAdd;
    var sigAdd;
    var zeroScientific=false;
    if (f == 0 || mantissa=="" || mantissa=="0"){
        mantissa = "";
        for (i=0; i<sigFigs; i++){
            mantissa += "0";
        }
        order = sigFigs + sigDecs;
        if (sigDecs < 0 && -sigDecs >= sigFigs){
            zeroScientific = true;
        }
    } else {
        decAdd = ((order - mantissa.length) - sigDecs);
        sigAdd = sigFigs - mantissa.length;
        add = Math.min(sigAdd, decAdd);
        if (add < 0){
            var rounded = round(mantissa, -add);
            if (rounded.length > mantissa.length + add){
                order++;
                if (decAdd > sigAdd){
                	rounded = round(rounded, 1);
                }
            }
            mantissa=rounded;
        } else if (add > 0){
            for (i=0; i<add; i++){
                mantissa += '0';
            }
        }
        if (mantissa=="" || mantissa=="0"){
            mantissa = "0";
            positive = true;
            order = 1 + sigDecs;
            if (order != 0){
                zeroScientific = true;
            }
        }
    }
    var useScientific = (scientific || mantissa.length > 20 || order > 4 || order < -2 ||
		    (order - mantissa.length > 0 && trailingZeros(mantissa) > 0) || zeroScientific);
    var returnVal = "";
    if (!positive){
        returnVal += "-";
    }
    if (useScientific) {
        returnVal += mantissa.charAt(0);
        if (mantissa.length > 1){
            returnVal += '.' + mantissa.substring(1, mantissa.length);
        }
        if (order-1!=0){
			returnVal += " x 10^" + (order-1);
        }
    } else {
        var wholePart = "";
        var fractPart = "";
        var needDot = true;
        if (order > 0){
            if (mantissa.length > order){
                wholePart = mantissa.substring(0, order);
                fractPart = mantissa.substring(order, mantissa.length);
            } else {
                wholePart = mantissa;
                needDot = (trailingZeros(mantissa) != 0);
                for(var i=0; i<order-mantissa.length; i++){
                    wholePart += "0";
                }
            }
		} else {
            for(i=0; i<-order; i++){
                fractPart += "0";
			}
            fractPart += mantissa
        }
        returnVal += (
            (wholePart==""?"0":wholePart) + (needDot?".":"") + fractPart

        );
    }
    return (returnVal);
}

/**
 * Count the significant trailing zeros on this object.
 *
 * @return the number of trailing zeros
 */
function trailingZeros(mantissa){
    var zeros = 0;
    for (var i=mantissa.length-1; i>=0; i--){
    	var c = mantissa.charAt(i);
        if (c=='0'){
            zeros++;
        } else {
            return zeros;
        }
    }
    return zeros;
}

/**
 * Parse a string representation of a floating point
 * and pull out the sign.
 *
 * @param s the string representation of a floating point.
 * @return true iff this is a positive number
 */
function parseSign(s){
    var beginning = true;
    var seenDot = false;
    var seenSomething = false;
    var zeros = "";
    var leadZeros = "";
    var all = "";
    var decPlaces = 0;
    var totalDecs = 0;
    var pos = true;
	for (var i=0; i<s.length; i++){
        var c = s.charAt(i);
        if (c>='1' && c<='9'){
            all += zeros + c;
            zeros = "";
            seenSomething = true;
            if (!seenDot){
                totalDecs++;
                decPlaces++;
            }
            beginning = false;
        } else if (c=='0'){
            if (seenDot){
                if (seenSomething){
                    all += zeros + c;
                    zeros = "";
                } else {
                    leadZeros += c;
                    decPlaces--;
				}
            } else {
                totalDecs++;
                if (seenSomething){
                    leadZeros += c;
                    decPlaces++;
                    zeros += c;
                } else {
                    leadZeros += c;
                }
            }
            beginning = false
		} else if (!seenDot && c=='.'){
            all += zeros;
            zeros = "";
            seenDot=true;
            beginning = false;
		} else if (c=='e' || c=='E' && i+1<s.length){
            var raised = parseInt(s.substring(i+1, s.length));
            decPlaces += raised;
            totalDecs += raised;
            i = s.length;
        } else if (beginning && (c=='+' || c=='-')){
            if (c=='-'){
                pos = !pos;
            }
		}
    }
    if (all == ""){
        return(true);
    } else {
        return(pos);
    }
}

/**
 * Parse a string representation of a floating point
 * and pull out the mantissa.
 *
 * @param s the string representation of a floating point.
 * @return the mantissa of this number.
 */
function parseMantissa(s){
    var beginning = true;
    var seenDot = false;
    var seenSomething = false;
    var zeros = "";
    var leadZeros = "";
    var all = "";
    var decPlaces = 0;
    var totalDecs = 0;
    var pos = true;
	for (var i=0; i<s.length; i++){
        var c = s.charAt(i);
        if (c>='1' && c<='9'){
            all += zeros + c;
            zeros = "";
            seenSomething = true;
            if (!seenDot){
                totalDecs++;
                decPlaces++;
            }
            beginning = false;
        } else if (c=='0'){
            if (seenDot){
                if (seenSomething){
                    all += zeros + c;
                    zeros = "";
                } else {
                    leadZeros += c;
                    decPlaces--;
				}
            } else {
                totalDecs++;
                if (seenSomething){
                    leadZeros += c;
                    decPlaces++;
                    zeros += c;
                } else {
                    leadZeros += c;
                }
            }
            beginning = false;
		} else if (!seenDot && c=='.'){
            all += zeros;
            zeros = "";
            seenDot=true;
            beginning = false;
		} else if (c=='e' || c=='E' && i+1<s.length){
            var raised = parseInt(s.substring(i+1, s.length));
            decPlaces += raised;
            totalDecs += raised;
            i = s.length;
        } else if (beginning && (c=='+' || c=='-')){
            if (c=='-'){
                pos = !pos;
            }
		}
    }
    if (all == ""){
        return leadZeros;
    } else {
        return all;
    }
}

/**
 * Parse a string representation of a floating point
 * and pull out the exponent.
 *
 * @param s the string representation of a floating point.
 * @return (integer) the number after the e.
 */
function parseOrder(s){
    var beginning = true;
    var seenDot = false;
    var seenSomething = false;
    var zeros = "";
    var leadZeros = "";
    var all = "";
    var decPlaces = 0;
    var totalDecs = 0;
    var pos = true;
	for (var i=0; i<s.length; i++){
        var c = s.charAt(i);
        if (c>='1' && c<='9'){
            all += zeros + c;
            zeros = "";
            seenSomething = true;
            if (!seenDot){
                totalDecs++;
                decPlaces++;
            }
            beginning = false;
        } else if (c=='0'){
            if (seenDot){
                if (seenSomething){
                    all += zeros + c;
                    zeros = "";
                } else {
                    leadZeros += c;
                    decPlaces--;
				}
            } else {
                totalDecs++;
                if (seenSomething){
                    leadZeros += c;
                    decPlaces++;
                    zeros += c;
                } else {
                    leadZeros += c;
                }
            }
            beginning = false
		} else if (!seenDot && c=='.'){
            all += zeros;
            zeros = "";
            seenDot=true;
            beginning = false;
		} else if (c=='e' || c=='E' && i+1<s.length){
            var raised = parseInt(s.substring(i+1, s.length));
            decPlaces += raised;
            totalDecs += raised;
            i = s.length;
        } else if (beginning && (c=='+' || c=='-')){
            if (c=='-'){
                pos = !pos;
            }
		}
    }
    if (all == ""){
        return totalDecs;
    } else {
    	return decPlaces;
    }
}

/**
 * Remove the specified number of digits from string by
 * rounding.  Proper rounding rules for scientific purposes
 * are followed.
 * This method may cause an extra significant figure
 * to be added to the number.  For example, if 999999
 * were rounded, A one would carry over and become
 * a significant figure.  Those who call this method
 * should check for this and call round again if needed.
 *
 * @param mantissa A string representing an whole number of arbitrary length.
 * @param digits A number of digits to remove
 * @return A string represted the rounded version of mantissa
 */
function round(mantissa, digits){
    var last = mantissa.length - digits - 1;
    if (last < 0){
        return("");
    } else if (last >= mantissa.length -1){
        return(mantissa);
	} else {
    	var nextToLast = mantissa.charAt(last+1);
        var lastChar = mantissa.charAt(last);
        var roundUp = false;
        if (nextToLast > '5') {
            roundUp = true;
        } else if (nextToLast == '5') {
            for (var j=last+2; j<mantissa.length; j++){
                if(mantissa.charAt(j) != '0'){
                    roundUp = true;
                }
            }
            if (lastChar % 2 == 1){
                roundUp = true;
            }
        }
        var result = "";
        for (var i=last; i>=0; i--){
            var c = mantissa.charAt(i);
            if (roundUp){
                var nextChar;
                if (c == '9'){
                    nextChar = '0';
                } else {
                    switch (c){
                        case '0': nextChar='1'; break;
                        case '1': nextChar='2'; break;
                        case '2': nextChar='3'; break;
                        case '3': nextChar='4'; break;
                        case '4': nextChar='5'; break;
                        case '5': nextChar='6'; break;
                        case '6': nextChar='7'; break;
                        case '7': nextChar='8'; break;
                        case '8': nextChar='9'; break;
                    }
                    roundUp = false;
                }
                result = nextChar + result;
            } else {
                result = c + result;
            }
        }
        if (roundUp){
            result = '1' + result;
        }
        return(result);
    }
}

module.exports = {
    SignificantFigures,
    displaySigFigs,
};
