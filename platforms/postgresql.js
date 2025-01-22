const cmtDocParer = require("../index.js");

regex_postgresql_replace = {
    "\\b" : "[[:>:]]"
}

function getArguments(name) {
    let regexp = new RegExp("^" +name +"\=(.*)");
    for (const arg of process.argv) {
        const captures = regexp.exec(arg);
        if (captures) {
            return captures[0];
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

let fileName = getArguments("out");
let functionName = getArguments("function");
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

function arrayOfString(regexp) {

}

function propertyOfObject(regexp, strName, rowName) {
    let columnsCode = genColumns(regexp, "r");
    let code = 
        `    select '${regexp.name}' as figure, row_to_json(${rowName})::jsonb as object\n` +
        `      from (select ${columnsCode}\n` +
        `              from regexp_matches(${strName}, '${regexp.match_postgres}') ${rowName}) ${rowName}`
    return code;
}

function propertyOfString(regexp) {

}

function propertyOfMatch(regexp) {

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
                    code += arrayOfString(regexp) ?? "";
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
                    code += propertyOfString(regexp) ?? "";
                    break;
                }
                case "match": {
                    code += propertyOfMatch(regexp) ?? "";
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
    `as $function$\n` +
    `begin\n` +
    `  return jsonb_object_agg(${rowName}.figure, ${rowName}.object)\n` +
    `    from (${selects.join("\n    union all\n")}) ${rowName};\n` +
    `end;\n` +
    `$function$;`;
console.log(code);