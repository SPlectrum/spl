//  name        Help
//  URI         spl/app/help
//  type        API Method
//  description The help function of the app API
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_help (input) { 

    // there is the app API which is accessed with single word - first command API
    // there are the module actions: currently spl with three part action URI
    // there are the app actions: currently none


    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
