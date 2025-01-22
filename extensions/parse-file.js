const cmtDocParer = require("../index.js");
const fs = require("node:fs");

/**
 * Parse single file and create parsed structure
 * 
 * @author Andrzej Kałuża
 * @created 2025-01-22
 * @version 1.0.5
 * @module parse-file
 */

/**
 * regex to find documentary comments
 */
const regexDocumentationComment = /\/\*[^*]*\*+([^\/][^*]*\*+)*\//g;

/**
 * regex for find name from code under comment
 */
const regexUnderName = /(((module|package|namespace|async|var|const|let|def|class|interface|function|func|defun|define|fn|macro|type|int|float|String|string|double|Boolean|bool|char|protected|private|public|exports\.)\b)\s*([\w\.]+)\b)|(([\w\.]*)\b)/;

/**
 * A simple function that finds and processes comments documenting in file
 * 
 * This function add property under for each found comment for future parse
 * 
 * @function parseFile
 * @property {boolean} options.under.code returns code founded under comment
 * @property {boolean} options.under.name returns code founded/parsed name under comment
 * @property {boolean} options.matches include matches in documentation structure
 * 
 * @param {string} path path with filename 
 * @param {json} [options={}]
 * @returns {json[]} array of documentation structures
 */
cmtDocParer.parseFile = exports.parseFile = function (path, options = {}) {
    const dc = [];
    const source = fs.readFileSync(path, "utf-8").toString();

    while ((captures = regexDocumentationComment.exec(source)) !== null) {
        let underCode = source.slice(captures.index +captures[0].length);
        const comment = cmtDocParer.parse(captures[0], options);
        if (options.under) {
            let index = 2;
            while (index <= underCode.length) {
                if (underCode[index -1] === "/" && underCode[index] === "*") {
                    break;
                }
                index++;
            }
            underCode = underCode.slice(1, index -1)
            const foundName = regexUnderName.exec(underCode);
            if (foundName) {
                comment.under = {};
                if (options.under.code) {
                    comment.under.code = underCode;
                }
                if (options.under.name) {
                    comment.under.name = foundName ? (foundName[4] ? foundName[4] : foundName[6]) : undefined
                }
            }
        }
        dc.push(comment);
    }

    return dc;
}
