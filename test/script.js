const cmtDocParer = require("../index.js");
//require("../extensions/parse-file.js");

console.log(cmtDocParer.describe());

// console.log(cmtDocParer.parse(`/**
//     * Parse single documentary comment
//     * 
//     * I used the resources from the website https://jsdoc.app/ and prepared the regex using the website https://regex101.com/
//     * 
//     * @author Andrzej Kałuża
//     * @created 2025-01-16
//     * @version 1.0.0 
//     * @module cmtdoc-parser
//     */`)
// );
//console.log(JSON.stringify(cmtDocParer.parseFile("c:/projekty/mPak/nodejs/cmtdoc-parser/index.js", {under : {name:true}}), null, "\t"));
//console.log(JSON.stringify(cmtDocParer.parseFile("c:/projekty/mPak/nodejs/dbpages/common/assets/libs/dyna-table-1.0.0/dyna-table.js", {under : {name:true}}), null, "\t"));
