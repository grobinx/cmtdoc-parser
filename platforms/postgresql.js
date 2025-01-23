const cmtDocParer = require("../index.js");
const fs = require("node:fs");

/**
 * This is a script that creates a PostgreSQL function that allows you to analyze documentation comments contained eg. in functions
 * 
 * @example
 * npm run postgresql -- out=postgresql.sql function=jsdoc_parse
 * 
 * @author Andrzej Kałuża
 * @created 2025-01-23
 * @version 1.0.0
 * @module postgresql
 */

/**
 * This is posix alternative for PostgreSQL
 * @const {json}
 */
const regex_postgresql_replace = {
    "\\b" : "[[:>:]]"
}

function getArgument(name) {
    let regexp = new RegExp("^" +name +"\=(.*)");
    for (const arg of process.argv) {
        const captures = regexp.exec(arg);
        if (captures) {
            return captures[1];
        }
    }
}

function help() {
    console.log(
        "Script arguments\n" +
        "----------------\n" +
        "npm run postgresql -- arguments\n" +
        "  out=filename - output file containing the code to be executed in the PostgreSQL database\n" +
        "  function=jsdoc_parse - PostgreSQL function name\n"
    )
}

let fileName = getArgument("out");
let functionName = getArgument("function");
let strVarName = "str";
let rowName = "r";
if (!fileName) {
    console.error("No output file name!");
    help();
    process.exit(-1);
}
if (!functionName) {
    console.warn("No function name. I will take the name \"jsdoc_parse\"");
    functionName = "jsdoc_parse";
}

function captureColumns(regexp) {
    let columns = {};
    for (const [key, field] of Object.entries(regexp.captures)) {
        columns[field] ??= [];
        columns[field].push(key);
    }
    return columns;
}

function splitColumns(regexp, objectColumns) {
    let columns = {};
    if (regexp.split) {
        for (const [field, split] of Object.entries(regexp.split)) {
            columns[split.name] = {
                captures : objectColumns[field],
                delimiter : split.delimiter
            };
        }
    }
    return columns;
}

function genColumns(regexp, rowName) {
    let captures = captureColumns(regexp);
    let splits = splitColumns(regexp, captures);

    let codeColumns = [];
    for (const [key, value] of Object.entries(captures)) {
        if (value.length > 1) {
            let code = [];
            for (const r of value) {
                code.push(`${rowName}[${r}]`);
            }
            codeColumns.push(`coalesce(${code.join(", ")}) as "${key}"`);
        }
        else {
            codeColumns.push(`${rowName}[${value[0]}] as "${key}"`);
        }
    }
    for (const [key, split] of Object.entries(splits)) {
        let stringToArray;
        if (split.captures.length > 1) {
            let code = [];
            for (const r of split.captures) {
                code.push(`${rowName}[${r}]`);
            }
            stringToArray = `coalesce(${code.join(", ")})`;
        }
        else {
            stringToArray = `${rowName}[${split.captures[0]}]`;
        }
        codeColumns.push(`string_to_array(trim(${stringToArray}), '${split.delimiter}') as "${key}"`);
    }
    return codeColumns.join(", ");
}

function arrayOfObject(regexp, strName, rowName) {
    let columnsCode = genColumns(regexp, "r");
    let code = 
        `    select '${regexp.name}' as figure, jsonb_agg(row_to_json(${rowName})::jsonb) as object\n` +
        `      from (select ${columnsCode}\n` +
        `              from regexp_matches(${strName}, '${regexp.match_postgres}', 'g') ${rowName}) ${rowName}\n` +
        `    having jsonb_agg(row_to_json(${rowName})::jsonb) is not null`;
    return code;
}

function arrayOfString(regexp, strName, rowName) {
    let captures = captureColumns(regexp);
    let codeFigure;
    let codeObject;
    let codeHaving;
    for (const [key, value] of Object.entries(captures)) {
        codeFigure = `'${key}' as figure`;
        codeObject = `to_jsonb(array_agg(${rowName}[${value[0]}])) as object`;
        codeHaving = `${rowName}[${value[0]}]`;
        break;
    }
    let code = 
        `    select ${codeFigure}, ${codeObject}\n` +
        `      from regexp_matches(${strName}, '${regexp.match_postgres}', 'g') ${rowName}\n` +
        `    having array_agg(${codeHaving}) is not null`;
    return code;
}

function propertyOfObject(regexp, strName, rowName) {
    let columnsCode = genColumns(regexp, "r");
    let code = 
        `    select '${regexp.name}' as figure, row_to_json(${rowName})::jsonb as object\n` +
        `      from (select ${columnsCode}\n` +
        `              from regexp_matches(${strName}, '${regexp.match_postgres}') ${rowName}) ${rowName}`
    return code;
}

function propertyOfString(regexp, strName, rowName) {
    let captures = captureColumns(regexp);
    let codeFigure;
    let codeObject;
    let codeHaving;
    for (const [key, value] of Object.entries(captures)) {
        codeFigure = `'${key}' as figure`;
        codeObject = `to_jsonb(${rowName}[${value[0]}]) as object`;
        break;
    }
    let code = 
        `    select ${codeFigure}, ${codeObject}\n` +
        `      from regexp_matches(${strName}, '${regexp.match_postgres}') ${rowName}`
    return code;
}

function propertyOfMatch(regexp, strName, rowName) {
    let captures = captureColumns(regexp);
    let codeFigure;
    let codeObject;
    let codeHaving;
    for (const [key, value] of Object.entries(captures)) {
        codeFigure = `'${key}' as figure`;
        codeObject = `to_jsonb(true) as object`;
        break;
    }
    let code = 
        `    select ${codeFigure}, ${codeObject}\n` +
        `      from regexp_matches(${strName}, '${regexp.match_postgres}') ${rowName}`
    return code;
}

let code = "";
let selects = [];
for (const regexp of cmtDocParer.regexRules) {
    code += (code.length ? "\n" : "");

    let reSource = regexp.match.source;
    for (const [key, value] of Object.entries(regex_postgresql_replace)) {
        reSource = reSource.replaceAll(key, value);
    }
    regexp.match_postgres = reSource;
    switch (regexp.object) {
        case "array": {
            switch (regexp.type) {
                case "object": {
                    selects.push(arrayOfObject(regexp, strVarName, rowName));
                    break;
                }
                case "string": {
                    selects.push(arrayOfString(regexp, strVarName, rowName));
                    break;
                }
            }
            break;
        }
        case "property": {
            switch (regexp.type) {
                case "object": {
                    selects.push(propertyOfObject(regexp, strVarName, rowName));
                    break;
                }
                case "string": {
                    selects.push(propertyOfString(regexp, strVarName, rowName));
                    break;
                }
                case "match": {
                    selects.push(propertyOfMatch(regexp, strVarName, rowName));
                    break;
                }
            }
            break;
        }
    }
}
code = 
    `create or replace function ${functionName}(${strVarName} varchar)\n` +
    `  returns jsonb\n` +
    `  language plpgsql\n` +
    `  stable\n` +
    `as $fn$\n` +
    `/**\n` +
    ` * Function parse jsdoc and returns jsonb structure<br />\n` +
    ` * Function remove comment characters from string.\n` +
    ` * \n` +
    ` * @author cmtdoc parser (https://github.com/grobinx/cmtdoc-parser)\n` +
    ` * @created ${new Date().toString()}\n` +
    ` * \n` +
    ` * @param {varchar|text} ${strVarName} string to parse\n` +
    ` * @returns {jsonb}\n` +
    ` * @example\n` +
    ` * select p.proname, ${functionName}(p.doc) as doc, p.arguments, p.description\n` +
    ` *   from (select p.proname, substring(pg_get_functiondef(p.oid) from '\\/\\*\\*.*\\*\\/') as doc, \n` +
    ` *                coalesce(pg_get_function_arguments(p.oid), '') arguments,\n` +
    ` *                d.description\n` +
    ` *           from pg_proc p\n` +
    ` *                join pg_namespace n on n.oid = p.pronamespace\n` +
    ` *                left join pg_description d on d.classoid = 'pg_proc'::regclass and d.objoid = p.oid and d.objsubid = 0\n` +
    ` *          where n.nspname = :scema_name\n` +
    ` *            and p.proisagg is false) p\n` +
    ` *  where p.doc is not null\n` +
    ` */\n` +
    `begin\n` +
    `  ${strVarName} := string_agg(substring(line from '^\\s*\\*\\s*(.*)'), e'\\n')\n` +
    `    from (select unnest(string_to_array(${strVarName}, e'\\n')) line) d\n` +
    `   where trim(line) not in ('/**', '*/');\n` +
    `  --\n` +
    `  return jsonb_object_agg(${rowName}.figure, ${rowName}.object)\n` +
    `    from (${selects.join("\n    union all\n")}) ${rowName};\n` +
    `end;\n` +
    `$fn$;`;

fs.writeFileSync(fileName, code);
console.log(`File ${fileName} was created`);