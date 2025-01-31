const cmtDocParer = require("../index.js");
const fs = require("node:fs");

/**
 * Generate file describe.md with all parse js doc figures.
 * 
 * @author Andrzej Kałuża
 * @created 2025-01-23
 * @version 1.0.0
 * @module describe-md
 */

let code = "";
let tocCode = "";

cmtDocParer.walk(undefined, (regex, figure, matches) => {
    if (code.length !== 0) {
        code += "\n\n";
    }
    if (tocCode.length !== 0) {
        tocCode += "\n";
    }
    tocCode += 
      "# [[#" +("Figure " +regex.figure).replaceAll(/([\@\|\[\]\{\}\#\\\/\=\<\>\(\)])/g, "").replaceAll(/([\ ])/g, "-") +"|" +
        regex.figure.replaceAll("|", "&#124;").replaceAll("<", "&lt;").replaceAll(">", "&gt;") +"]]";
    code += 
        "h2. Figure " +regex.figure.replaceAll("|", "&#124;").replaceAll("<", "&lt;").replaceAll(">", "&gt;") +"\n\n" +
        regex.description.replace("<", "&lt;").replaceAll(">", "&gt;") +"\n\n" +
        "Used in " +JSON.stringify(regex.used) +"\n\n" +
        "Example\n<pre>\n" +regex.example +"\n</pre>\n\n" +
        "Result\n<pre>\n" +JSON.stringify(figure, null, "\t") +"\n</pre>";
});

code = 
  "h1. Describe js doc figures\n\n" +
  "h2. Table of content\n\n" +tocCode +"\n\n\n----\n\n\n" +
  code;

fs.writeFileSync("platforms/describe.textile", code);
console.log(`File platforms/describe.textile was created`);