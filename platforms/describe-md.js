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

cmtDocParer.walk(undefined, (regex, figure, matches) => {
    if (code.length !== 0) {
        code += "\n\n";
    }
    code += 
        "### Figure `" +regex.figure +"`\n" +
        regex.description +"\n\n" +
        "Example\n```\n" +regex.example +"\n```\n" +
        "Result\n```js\n" +JSON.stringify(figure, null, "\t") +"\n```";
});

code = "# Describe js doc figures\n\n" +code;

fs.writeFileSync("platforms/describe.md", code);
console.log(`File platforms/describe.md was created`);