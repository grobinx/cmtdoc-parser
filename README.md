# Comment Doc Parser

A Node.js library to parse documentation comments.<br>
This is a simple library that allows you to parse documentation from one comment.

## Install via npm

```
Currently, I don't know how to upload it to npm
```

## Library Usage

### Describe supported figures

```js
const cmtDocParser = require('cmtdoc-parser');

console.log(cmtDocParser.describe());
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

### Parse single file

This is a simple function that finds and processes comments documenting in file.<br>
This function add property "under" for each found comment for future parse.


```js
const cmtDocParser = require('cmtdoc-parser');

console.log(JSON.stringify(cmtDocParser.parseFile("../cmtdoc-parser/index.js", { under : { name : true } }), null, "\t"));
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