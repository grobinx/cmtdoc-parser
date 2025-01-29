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
      "1. [" +regex.figure.replaceAll("@", "\\@").replace("<", "&lt;") +"]" +
      "(#" +("Figure " +regex.figure).replaceAll(/([\@\|\[\]\{\}\#\\\/\=\<\>\(\)])/g, "").replaceAll(/([\ ])/g, "-") +")";
    code += 
        "## Figure " +regex.figure.replaceAll("@", "\\@").replace("<", "&lt;") +"\n\n" +
        regex.description.replace("<", "&lt;") +"\n\n" +
        "Used in " +JSON.stringify(regex.used) +"\n\n" +
        "Example\n\n```\n" +regex.example +"\n```\n\n" +
        "Result\n\n```js\n" +JSON.stringify(figure, null, "\t") +"\n```";
});

code = 
  "# Describe js doc figures\n\n" +
  "## Table of content\n\n" +tocCode +"\n\n" +
  code;

fs.writeFileSync("platforms/describe.md", code);
console.log(`File platforms/describe.md was created`);