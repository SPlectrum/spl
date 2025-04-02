// spl/lib.js
// A library of useful functions

exports.setProperty = function setProperty (reference, key, value) { 

    const keys = key.split(".");
    for(i=0; i<keys.length; i++) {
        if(reference[keys[i]]==undefined) {
                reference[keys[i]] = (i==keys.length-1) ? value : {};
            }
            reference = reference[keys[i]];
        } 
    }