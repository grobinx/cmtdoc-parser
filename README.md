# Comment Doc Parser

A Node.js library to parse documentation comments.<br />
This is a simple library that allows you to parse documentation from one comment.<br />
This module made for parse documentation comments in DPAG template files dedicated DBPAGES web application server.

## Install via npm

```
npm install cmtdoc-parser
```

## Library usage

### Describe supported figures

```js
const cmtDocParser = require('cmtdoc-parser');

console.log(cmtDocParser.describe());
```
or
```
npm run describe
```

The result will be something like this
```
...

Figure: @version version description
Documents the version number of an item.
Kind: property of string
Example:
@version 1.0.45
@version 0.0.1 Beta
Result:
{
        "version": "0.0.1 Beta"
}

Figure: @todo text describing thing to do.
Document tasks to be completed.
Kind: array of string
Example:
@todo Write the documentation.
@todo Implement this function.
Result:
{
        "todos": [
                "Write the documentation.",
                "Implement this function."
        ]
}

Figure: @see [{@link namepath}|namepath] [description]
Refer to some other documentation for more information.
Kind: array of object
Example:
@see {@link bar}
@see bar
@see {@link foo} for further information.
@see {@link http://github.com|GitHub}
@see <a href="http://www.link_to_jira/HERO-402">HERO-402</a>
@see package.Class#method(Type argname, Type argname,...)
Result:
{
        "see": [
                {
                        "path": "{@link bar}"
                },
                {
                        "path": "bar"
                },
                {
                        "path": "{@link foo}",
                        "description": "for further information."
                },
                {
                        "path": "{@link http://github.com|GitHub}"
                },
                {
                        "description": "<a href=\"http://www.link_to_jira/HERO-402\">HERO-402</a>"
                },
                {
                        "path": "package.Class#method(Type argname, Type argname,...)"
                }
        ]
}

...
```

Refer to the [DESCRIBE.md](platforms/describe.md) file for information about figures.

### Parse single documentation comment

```js
const cmtDocParser = require('cmtdoc-parser');

console.log(cmtDocParser.parse(`/**
    * Parse single documentary comment
    * 
    * I used the resources from the website https://jsdoc.app/ and prepared the regex using the website https://regex101.com/
    * 
    * @author Andrzej Kałuża
    * @created 2025-01-16
    * @version 1.0.0 
    * @module cmtdoc-parser
    */`)
);
```

The result will be something like this
```
{
  description: 'Parse single documentary comment\n' +
    '\n' +
    'I used the resources from the website https://jsdoc.app/ and prepared the regex using the website https://regex101.com/',
  author: { author: 'Andrzej Kałuża' },
  created: '2025-01-16',
  module: { name: 'cmtdoc-parser' },
  version: '1.0.0'
}
```

## Extensions usage

### Parse single file

This is a simple function that finds and processes comments documenting in file.<br>
This function add property "under" for each found comment for future parse.


```js
const cmtDocParser = require('cmtdoc-parser');
require('cmtdoc-parser/extensions/parse-file');

console.log(JSON.stringify(cmtDocParser.parseFile("cmtdoc-parser/index.js", { under : { name : true } }), null, "\t"));
```

The result will be something like this
```
[
    {
        "description": "A simple function that finds and processes comments documenting in file\n\nThis function add property under for each found comment for future parse",
        "parameters": [
            {
                "type": "string",
                "name": "path",
                "description": "path with filename",
                "types": [
                    "string"
                ]
            },
            {
                "type": "json",
                "name": "options",
                "types": [
                    "json"
                ]
            }
        ],
        "properties": [
            {
                "type": "boolean",
                "name": "options.under.code",
                "description": "returns code founded under comment",
                "types": [
                    "boolean"
                ]
            },
            {
                "type": "boolean",
                "name": "options.under.name",
                "description": "returns code founded/parsed name under comment",
                "types": [
                    "boolean"
                ]
            },
            {
                "type": "boolean",
                "name": "options.matches",
                "description": "include matches in documentation structure",
                "types": [
                    "boolean"
                ]
            }
        ],
        "returns": {
            "type": "json[]",
            "description": "array of documentation structures",
            "types": [
                "json[]"
            ]
        },
        "under": {
            "name": "parseFile"
        }
    }
]
```

## Platforms usage

### PostgreSQL

Run script platforms/postgresql.js to generate PostgreSQL function parsing jsdoc

```
npm run postgresql -- out=platforms/postgresql.sql function=jsdoc_parse
```
or
```
node postgresql out=platforms/postgresql.sql function=jsdoc_parse
```

As a result you will get jsdoc_parse function in postgresql.sql file to be store in database. Like below...

```sql
create or replace function jsdoc_parse(str varchar) returns jsonb language plpgsql stable
as $fn$
begin
  str := string_agg(substring(line from '^\s*\*\s*(.*)'), e'\n')
    from (select unnest(string_to_array(str, e'\n')) line) d
   where trim(line) not in ('/**', '*/');
  --
  return jsonb_object_agg(r.figure, r.object)
    from (    -- This is root description
    select 'root' as figure, to_jsonb(r[1]) as object
      from regexp_matches(str, '^([^@]+)') r
    union all
    ...
    -- @callback name
    select 'callback' as figure, to_jsonb(array_agg(r[3])) as object
      from regexp_matches(str, '@(callback)(\s+([^\s@]+))', 'g') r
    having array_agg(r[3]) is not null) r;
end;
$fn$;
```

You can use it by executing the query below. I assume that the functions have the js comment contained in the function body, not in the function comment.

```sql
select p.proname, jsdoc_parse(p.doc) as doc, p.arguments, p.description
  from (select p.proname, substring(pg_get_functiondef(p.oid) from '\/\*\*.*\*\/') as doc, 
               coalesce(pg_get_function_arguments(p.oid), '') arguments,
               d.description
          from pg_proc p
               join pg_namespace n on n.oid = p.pronamespace
               left join pg_description d on d.classoid = 'pg_proc'::regclass and d.objoid = p.oid and d.objsubid = 0
         where n.nspname = :scema_name
           and p.prokind in ('p', 'f')) p
 where p.doc is not null
```