const fs = require("node:fs");

/**
 * Parse single documentation comment like jsdoc or javadoc
 * 
 * I used the resources from the website https://jsdoc.app/ and prepared the regex using the website https://regex101.com/
 * 
 * @author Andrzej Kałuża
 * @created 2025-01-16
 * @version 1.0.1
 * @module cmtdoc-parser
 */

/**
 * Regex rules.
 * You can add your rules to the list
 * 
 * @member {json[]} regexRules
 * @property {string} figure general form
 * @property {string} description Short description of jsdoc tag
 * @property {string} example example(s) of using figure
 * @property {string} match regex rule for matching figure
 * @property {string} name property name if array or property of object
 * @property {string} object property or array - is root kind of fiure
 * @property {string} type type of object, string, match (boolean true) or object, match set boolean true if figure found
 * @property {json[]} captures is regex group capture number and property name
 * @property {string|json} captures."group_number" regex group witch property if type is string or match
 * @property {string} captures."group_number".name property name
 * @property {any} captures."group_number".default default value if found but is empty
 * @property {json} split if object you can split value
 * @property {string} split."name".name split to property name
 * @property {string} split."name".delimiter delimiter for split
 * 
 * @isue not work inline {(at)link page} in descriptions
 */
exports.regexRules = [
    {
        figure : "This is root description",
        description : "Top of documentary comment content.",
        example : "JSDoc 3 is an API documentation generator for JavaScript,\nsimilar to Javadoc or phpDocumentor.\nYou add documentation comments directly to your source code,\nright alongside the code itself.\nThe JSDoc tool will scan your source code and generate an HTML documentation website for you.",
        match : /^([^@]+)/g,
        object : "property",
        type : "string",
        captures: {
            "1": "description"
        }
    },
    {
        figure : "@param|arg|argument [{type}] [name|[name=value]] [description]",
        description : "The @param tag provides the name, type, and description of a function parameter.",
        example : "@param {string|any[]|*} aid\n@param {string} [alabel_text=abc] if the LABEL is to appear\n@param {attributes} alabel_attrs extra attributes for LABEL\n@param {attributes} aselect_attrs extra attribues for INPUT\n@arg {string=} somebody - Somebody's name.\n@param <V> the value of the element",
        name : "parameters",
        match : /@(param|arg|argument)\b([^\S\r\n]+\{([^{]*)\})?([^\S\r\n]+(([$#_a-zA-Z0-9\.\<\>]+)|\[(([$#_a-zA-Z0-9\.]+)[^\S\r\n]*\=[^\S\r\n]*([$#_a-zA-Z0-9\.]*))\]))?([^\S\r\n]+([^@]*)?)?/g,
        object : "array",
        type : "object",
        captures: {
            "3" : "type",
            "6" : "name",
            "8" : "name",
            "9" : "default",
            "11" : "description"
        },
        split : {
            "type" : {
                "name" : "types",
                "delimiter" : "|"
            }
        }
    },
    {
        figure : "@property|prop [{type}] [name|[name=value]] [description]",
        description : "The @property tag is a way to easily document a list of static properties of a class, namespace or other object.",
        example : "@property {object|json} defaults The default values for parties.\n@property {number} defaults.players The default number of players.\n@property {number} defaults.treasure.gold How much gold the party starts with.",
        name : "properties",
        match : /@(property|prop)\b([^\S\r\n]+\{([^{]*)\})?([^\S\r\n]+(([$#_a-zA-Z0-9\.]+)|\[(([$#_a-zA-Z0-9\.]+)[^\S\r\n]*\=[^\S\r\n]*([$#_a-zA-Z0-9\.]*))\]))?([^\S\r\n]+([^@]*)?)?/g,
        object : "array",
        type : "object",
        captures: {
            "3" : "type",
            "6" : "name",
            "8" : "name",
            "9" : "default",
            "11" : "description"
        },
        split : {
            "type" : {
                "name" : "types",
                "delimiter" : "|"
            }
        }
    },
    {
        figure : "@async",
        description : "The @async tag indicates that a function is asynchronous, meaning that it was declared using the syntax async function foo() {}. Do not use this tag for other types of asynchronous functions, such as functions that provide a callback.",
        example : "@async",
        match : /@(async)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "async"
        }
    },
    {
        figure : "@generator",
        description : "The @generator tag indicates that a function is a generator function, meaning that it was declared using the syntax function* foo() {}.",
        example : "@generator",
        match : /@(generator)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "generator"
        }
    },
    {
        figure : "@global",
        description : "The @global tag specifies that a symbol should appear in the documentation as a global symbol. JSDoc ignores the symbol's actual scope within the source file. This tag is especially useful for symbols that are defined locally, then assigned to a global symbol.",
        example : "@global",
        match : /@(global)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "global"
        }
    },
    {
        figure : "@hideconstructor",
        description : "The @hideconstructor tag tells JSDoc that the generated documentation should not display the constructor for a class.",
        example : "@hideconstructor",
        match : /@(hideconstructor)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "hideconstructor"
        }
    },
    {
        figure : "@ignore",
        description : "The @ignore tag indicates that a symbol in your code should never appear in the documentation. This tag takes precedence over all others.",
        example : "@ignore",
        match : /@(ignore)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "ignore"
        }
    },
    {
        figure : "@inner",
        description : "Using the @inner tag will mark a symbol as an inner member of its parent symbol. This means it can be referred to by \"Parent~Child\".",
        example : "@inner",
        match : /@(inner)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "inner"
        }
    },
    {
        figure : "@instance",
        description : "Using the @instance tag will mark a symbol as an instance member of its parent symbol. This means it can be referred to by \"Parent#Child\".",
        example : "@instance",
        match : /@(instance)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "instance"
        }
    },
    {
        figure : "@override",
        description : "The @override tag indicates that a symbol overrides a symbol with the same name in a parent class.",
        example : "@override",
        match : /@(override)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "override"
        }
    },
    {
        figure : "@public",
        description : "The @public tag indicates that a symbol should be documented as if it were public.",
        example : "@public",
        match : /@(public)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "public"
        }
    },
    {
        figure : "@readonly",
        description : "The @readonly tag indicates that a symbol is intended to be read-only. Note this is for the purpose of documentation only.",
        example : "@readonly",
        match : /@(readonly)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "readonly"
        }
    },
    {
        figure : "@static",
        description : "The @static tag indicates that a symbol is contained within a parent and can be accessed without instantiating the parent.",
        example : "@static",
        match : /@(static)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "static"
        }
    },
    {
        figure : "@abstract|virtual",
        description : "This member must be implemented (or overridden) by the inheritor.",
        example : "@abstract",
        match : /@(abstract|virtual)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "abstract"
        }
    },
    {
        figure : "@access package|private|protected|public",
        description : "Specify the access level of this member (private, package-private, public, or protected).",
        example : "@access package",
        match : /@access[^\S\r\n]+(package|private|protected|public)\b/g,
        object : "property",
        type : "string",
        captures: {
            "1": "access"
        }
    },
    {
        figure : "@alias aliasNamepath",
        description : "Treat a member as if it had a different name.",
        example : "@alias trackr.CookieManager",
        match : /@alias[^\S\r\n]+(.*)/g,
        object : "property",
        type : "string",
        captures: {
            "1": "alias"
        }
    },
    {
        figure : "@augments|extends namepath",
        description : "Indicate that a symbol inherits from, and adds to, a parent symbol.",
        example : "@augments Animal",
        match : /@(augments|extends)[^\S\r\n]+(.*)/g,
        object : "property",
        type : "string",
        captures: {
            "2": "augments"
        }
    },
    {
        figure : "@author author [<email@address>] [(http-page)]",
        description : "Identify the author of an item.",
        example : "@author Andrzej Kałuża <aaa@server.pl> (http:\\page)",
        name : "author",
        match : /@author([^\S\r\n]+([^\<\(\n]+))([^\S\r\n]*\<(.*)\>)?([^\S\r\n]*\((.*)\))?/g,
        object : "property",
        type : "object",
        captures: {
            "2": "author",
            "4": "email",
            "6": "page"
        }
    },
    {
        figure : "@borrows thas_namepath as this_namepath",
        description : "This object uses something from another object.",
        example : "@borrows trstr as trim",
        name : "borrows",
        match : /@borrows[^\S\r\n]+([$#_a-zA-Z0-9\.]+)[^\S\r\n]*as[^\S\r\n]*([$#_a-zA-Z0-9\.]+)/g,
        object : "property",
        type : "object",
        captures: {
            "1": "that",
            "2": "this"
        }
    },
    {
        figure : "@class|constructor {type} [name]",
        description : "This function is intended to be called with the \"new\" keyword.",
        example : "@class {Person} Human",
        name : "class",
        match : /@(constructor|class)\b([^\S\r\n]+(\{([^{]*)\})?([^\S\r\n]*(.*))?)/g,
        object : "property",
        type : "object",
        captures: {
            "4": "type",
            "6": "name"
        }
    },
    {
        figure : "@constatnt|const {type} [name]",
        description : "The @constant tag is used to mark the documentation as belonging to a symbol that is a constant.",
        example : "@constant {number}",
        name : "constant",
        match : /@(constant|const)\b([^\S\r\n]+(\{([^{]*)\})([^\S\r\n]*(.*))?)/g,
        object : "property",
        type : "object",
        captures: {
            "4": "type",
            "6": "name"
        }
    },
    {
        figure : "@constructs [name]",
        description : "This function member will be the constructor for the previous class.",
        example : "@constructs Menu",
        match : /@(constructs)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/]+))?/g,
        object : "property",
        type : "string",
        captures: {
            "3": {
                name : "constructs",
                default : true
            }
        }
    },
    {
        figure : "@copyright some copyright text",
        description : "Document some copyright information.",
        example : "@copyright Andrzej Kałuża 2025",
        match : /@copyright[^\S\r\n]([^@]*)/g,
        object : "property",
        type : "string",
        captures: {
            "1": "copyright"
        }
    },
    {
        figure : "@default [some value]",
        description : "Document the default value.",
        example : "@default",
        match : /@(default|defaultvalue)\b([^\S\r\n]+(.*))?/g,
        object : "property",
        type : "string",
        captures: {
            "3": {
                name : "default",
                default : true
            }
        }
    },
    {
        figure : "@deprecated [some text]",
        description : "Document that this is no longer the preferred way.",
        example : "@deprecated since version 2.0\nuse other function",
        match : /@deprecated[^\S\r\n]([^@]*)/g,
        object : "property",
        type : "string",
        captures: {
            "1": {
                name : "deprecated",
                default : true
            }
        }
    },
    {
        figure : "@description some description",
        description : "Describe a symbol.",
        example : "@description Add two numbers.",
        match : /@(description|desc|classdesc)[^\S\r\n]([^@]*)/g,
        object : "array",
        type : "string",
        captures: {
            "2": "descriptions"
        }
    },
    {
        figure : "@enum [{type}]",
        description : "Document a collection of related properties.",
        example : "@enum {number}",
        match : /@(enum)\b([^\S\r\n]+(\{([^{]*)\}))?/g,
        object : "property",
        type : "string",
        captures: {
            "4": {
                name : "enum",
                default : true
            }
        }
    },
    {
        figure : "@event class_name#[event:]event_name",
        description : "Document an event.",
        example : "@event Hurl#snowball",
        name : "events",
        match : /@(event)\b[^\S\r\n]+([$#_a-zA-Z0-9\.\/]+)\#(([$#_a-zA-Z0-9\.]+)\:)?([$#_a-zA-Z0-9\.\/]+)/g,
        object : "array",
        type : "object",
        captures: {
            "2": "className",
            "4": "event",
            "5": "eventName"
        }
    },
    {
        figure : "@example multiline example, code, comments, etc",
        description : "Provide an example of how to use a documented item.",
        example : " @example\n// returns 2\nglobalNS.method1(5, 10);\n@example\n// returns 3\nglobalNS.method(5, 15);",
        match : /@(example)([^@]*)/g,
        object : "array",
        type : "string",
        captures: {
            "2": "examples"
        }
    },
    {
        figure : "@exports [module_name]",
        description : "Identify the member that is exported module.",
        example : "",
        match : /@(exports)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/\:\-]+))?/g,
        object : "property",
        type : "string",
        captures: {
            "3": {
                name : "exports",
                default : true
            }
        }
    },
    {
        figure : "@external|host name of external>",
        description : "Identifies an external class, namespace, or module.",
        example : "@external \"jQuery.fn\"",
        match : /@(external|host)\b([^\S\r\n]+(.*))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "external"
        }
    },
    {
        figure : "@file some description",
        description : "Describe a file.",
        example : "@file Manages the configuration settings for the widget.",
        match : /@(file|fileoverview|overview)\b([^\S\r\n]+([^@]*))?/g,
        object : "property",
        type : "string",
        captures: {
            "3": "file"
        }
    },
    {
        figure : "@fires|emits class_name#[event:]event_name",
        description : "Describe the events this method may fire.",
        example : "@fires Milkshake#drain",
        name : "fires",
        match : /@(fires|emits)\b[^\S\r\n]+([$#_a-zA-Z0-9\.\/]+)\#(([$#_a-zA-Z0-9\.]+)\:)?([$#_a-zA-Z0-9\.\/]+)/g,
        object : "array",
        type : "object",
        captures: {
            "2": "className",
            "4": "event",
            "5": "eventName"
        }
    },
    {
        figure : "@function|func|method [function_name]",
        description : "Describe a function or method.",
        example : "@function myFunction",
        match : /@(function|func|method)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/]+))?/g,
        object : "property",
        type : "string",
        captures: {
            "3": {
                name : "function",
                default : true
            }
        }
    },
    {
        figure : "@implements {type}",
        description : "This symbol implements an interface.",
        example : "@implements {Color}",
        match : /@(implements)\b([^\S\r\n]+(\{([^{]*)\}))/g,
        object : "property",
        type : "string",
        captures: {
            "4": "implements"
        }
    },
    {
        figure : "@interface [name]",
        description : "This symbol is an interface that others can implement.",
        example : "@interface Color",
        match : /@(interface)\b([^\S\r\n]+(.*))?/g,
        object : "property",
        type : "string",
        captures: {
            "3": {
                name : "interface",
                default : true
            }
        }
    },
    {
        figure : "@created date of some description",
        description : "Date creation or some description",
        example : "@created 2025-01-17",
        match : /@(created)\b([^\S\r\n]+([^@]*))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "created"
        }
    },
    {
        figure : "@kind class|constant|event|external|file|function|member|mixin|module|namespace|typedef",
        description : "What kind of symbol is this?",
        example : "@kind class",
        match : /@kind[^\S\r\n]+(class|constant|event|external|file|function|member|mixin|module|namespace|typedef)\b/g,
        object : "property",
        type : "string",
        captures: {
            "1": "kind"
        }
    },
    {
        figure : "@lends name_path",
        description : "Document properties on an object literal as if they belonged to a symbol with a given name.",
        example : "@lends Person.prototype",
        match : /@(lends)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/\:]+))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "lends"
        }
    },
    {
        figure : "@license identifier|standalone multiline text",
        description : "Identify the license that applies to this code.",
        example : "@license\nThe MIT License is a permissive software license originating at the Massachusetts Institute of Technology (MIT)[6] in the late 1980s.[7] As a permissive license, it puts very few restrictions on reuse and therefore has high license compatibility.[8][9]\nUnlike copyleft software licenses, the MIT License also permits reuse within proprietary software, provided that all copies of the software or its substantial portions include a copy of the terms of the MIT License and also a copyright notice.[9][10] In 2015, the MIT License was the most popular software license on GitHub,[11] and was still the most popular in 2024.[12]\nNotable projects that use the MIT License include the X Window System, Ruby on Rails, Node.js, Lua, jQuery, .NET, Angular, and React. ",
        match : /@(license)([^@]*)/g,
        object : "property",
        type : "string",
        captures: {
            "2": "license"
        }
    },
    {
        figure : "@listens event_name",
        description : "List the events that a symbol listens for.",
        example : "@listens module:hurler~event:snowball",
        match : /@(listens)\b([^\S\r\n]+(.*))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "listens"
        }
    },
    {
        figure : "@member|var|variable [{type}] [name]",
        description : "Document a member.",
        example : "",
        name : "variable",
        match : /@(var|variable|member)\b([^\S\r\n]+(\{([^{]*)\})?([^\S\r\n]*([$#_a-zA-Z0-9\.\/]+))?)?/g,
        object : "property",
        type : "object",
        captures: {
            "4": "type",
            "6": "name"
        }
    },
    {
        figure : "@memberof[!] parent_name_path",
        description : "This symbol belongs to a parent symbol.",
        example : "@memberof Tools",
        match : /@(memberof|memberof\!)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/\:]+))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "memberof"
        }
    },
    {
        figure : "@mixes other_object_path",
        description : "This object mixes in all the members from another object.",
        example : "@mixes Eventful",
        match : /@(mixes)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/]+))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "mixes"
        }
    },
    {
        figure : "@mixin [mixin_name]",
        description : "Document a mixin object.",
        example : "@mixin",
        match : /@(mixin)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/]+))?/g,
        object : "property",
        type : "string",
        captures: {
            "3": {
                name : "mixin",
                default : true
            }
        }
    },
    {
        figure : "@module [{type}] [moduleName]",
        description : "Document a module.",
        example : "@module {Query} MyModule",
        name : "module",
        match : /@(module)\b([^\S\r\n]+(\{([^{]*)\})?([^\S\r\n]*([$#_a-zA-Z0-9\.\/\-\"\:\.]+))?)/g,
        object : "property",
        type : "object",
        captures: {
            "4": "type",
            "6": "name"
        }
    },
    {
        figure : "@namespace [{type}] [moduleName]",
        description : "Document a namespace object.",
        example : "@namespace MyNamespace",
        name : "namespace",
        match : /@(namespace)\b([^\S\r\n]+(\{([^{]*)\})?([^\S\r\n]*([$#_a-zA-Z0-9\.\/]+))?)?/g,
        object : "property",
        type : "object",
        captures: {
            "4": "type",
            "6": "name"
        }
    },
    {
        figure : "@name name_path",
        description : "Document the name of an object.",
        example : "@name highlightSearchTerm",
        match : /@(name)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/\:]+))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "name"
        }
    },
    {
        figure : "@package [{type_expression}]",
        description : "This symbol is meant to be package-private.",
        example : "@package",
        match : /@(package)\b([^\S\r\n]+(\{([^{]*)\}))?/g,
        object : "property",
        type : "string",
        captures: {
            "4": {
                name : "package",
                default : true
            }
        }
    },
    {
        figure : "@private [{type_expression}]",
        description : "This symbol is meant to be private.",
        example : "@private",
        match : /@(private)\b([^\S\r\n]+(\{([^{]*)\}))?/g,
        object : "property",
        type : "string",
        captures: {
            "4": {
                name : "private",
                default : true
            }
        }
    },
    {
        figure : "@protected [{type_expression}]",
        description : "This symbol is meant to be protected.",
        example : "@protected",
        match : /@(protected)\b([^\S\r\n]+(\{([^{]*)\}))?/g,
        object : "property",
        type : "string",
        captures: {
            "4": "protected"
        }
    },
    {
        figure : "@requires some_module_name>",
        description : "This file requires a JavaScript module.",
        example : "@requires module:xyzcorp/helper\n@requires xyzcorp/helper.ShinyWidget#polish",
        match : /@(requires)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/\:\|\@]+))/g,
        object : "array",
        type : "string",
        captures: {
            "3": "requires"
        }
    },
    {
        figure : "@returns [{type}] [description]",
        description : "Document the return value of a function.",
        example : "@returns {number} Sum of a and b",
        name : "returns",
        match : /@(returns|return)\b([^\S\r\n]+(\{([^{]*)\})?([^\S\r\n]*([^@]*))?)?/g,
        object : "property",
        type : "object",
        captures: {
            "4": "type",
            "6": "description"
        },
        split : {
            "type" : {
                name : "types",
                delimiter : "|"
            }
        }
    },
    {
        figure : "@see [{@link namepath}|namepath] [description]",
        description : "Refer to some other documentation for more information.",
        example : "@see {@link bar}\n@see bar\n@see {@link foo} for further information.\n@see {@link http://github.com|GitHub}\n@see <a href=\"http://www.link_to_jira/HERO-402\">HERO-402</a>\n@see package.Class#method(Type argname, Type argname,...)",
        name : "see",
        match : /@(see)\s*((\{[^{]+\})|([!#&$_\-\.\\\/\:\w]+)(\s*\([^(]*\))?)?\s*([^@]*)?/g,
        object : "array",
        type : "object",
        captures: {
            "2": "path",
            "6": "description"
        }
    },
    {
        figure : "@since version description",
        description : "When was this feature added?",
        example : "@since 1.0.1",
        match : /@(since)\b([^\S\r\n]+([^@]*))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "since"
        }
    },
    {
        figure : "@summary some description",
        description : "A shorter version of the full description.",
        example : "@summary A concise summary.",
        match : /@(summary)\b([^\S\r\n]+([^@]*))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "summary"
        }
    },
    {
        figure : "@this namePath",
        description : "What does the 'this' keyword refer to here?",
        example : "@this Greeter",
        match : /@(this)\b([^\S\r\n]+((.*)))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "this"
        }
    },
    {
        figure : "@throws|exception [{type}] [free-form description]",
        description : "Describe what errors could be thrown.",
        example : "@throws {InvalidArgumentException}\n@throws Will throw an error if the argument is null.\n@throws {DivideByZero} Argument x must be non-zero.",
        name : "throws",
        match : /@(throws|exception)\b([^\S\r\n]+(\{([^{]*)\})?([^\S\r\n]*([^@]*))?)?/g,
        object : "array",
        type : "object",
        captures: {
            "4": "type",
            "6": "description"
        }
    },
    {
        figure : "@todo text describing thing to do.",
        description : "Document tasks to be completed.",
        example : "@todo Write the documentation.\n@todo Implement this function.",
        match : /@(todo)\b([^\S\r\n]+([^@]*))?/g,
        object : "array",
        type : "string",
        captures: {
            "3": "todos"
        }
    },
    {
        figure : "@typedef [{type}] [namepath]",
        description : "Document a custom type.",
        example : "@typedef {(number|string)} NumberLike\n@typedef {Object} WishGranter~Triforce",
        name : "typedef",
        match : /@(typedef)\b([^\S\r\n]+(\{([^{]*)\})?([^\S\r\n]*(.*))?)?/g,
        object : "property",
        type : "object",
        captures: {
            "4": "type",
            "6": "name"
        }
    },
    {
        figure : "@tutorial tutorial-name or link",
        description : "Insert a link to an included tutorial file.",
        example : "@tutorial tutorial-1",
        match : /@(tutorial)\b([^\S\r\n]+(.*))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "tutorial"
        }
    },
    {
        figure : "@type {type}",
        description : "Document the type of an object.",
        example : "@type {(string|Array.<string>)}\n@type {number}",
        match : /@(type)\b([^\S\r\n]+(\{([^{]*)\}))/g,
        object : "property",
        type : "string",
        captures: {
            "4": "type"
        }
    },
    {
        figure : "@variation number",
        description : "Distinguish different objects with the same name.",
        example : "@variation 2",
        match : /@(variation)\b([^\S\r\n]+([$#_a-zA-Z0-9\.\/\:]+))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "variation"
        }
    },
    {
        figure : "@version version description",
        description : "Documents the version number of an item.",
        example : "@version 1.0.45\n@version 0.0.1 Beta",
        match : /@(version)\b([^\S\r\n]+([^@]*))/g,
        object : "property",
        type : "string",
        captures: {
            "3": "version"
        }
    },
    {
        figure : "@yield|yields|next [{type}] [description]",
        description : "Document the value yielded by a generator function.",
        example : "@yields {number}\n@yields {number} The next number in the Fibonacci sequence.]\n@yield record of tabel \"customers\"",
        name : "yield",
        match : /@(yield|yields|next)\b([^\S\r\n]+(\{([^{]*)\})?([^\S\r\n]*([^@]*))?)?/g,
        object : "property",
        type : "object",
        captures: {
            "4": "type",
            "6": "description"
        }
    },
    {
        figure : "@change|changed|changelog|modified [YYYY-MM-DD] [<author>] [description]",
        description : "Change log of object.",
        example : "@changed 2025-01-01 <Andrzej Kałuża> some description\n@changed <Andrzej Kałuża> some description\n@changed 2025-01-05 some description",
        name : "changes",
        match : /@(change|changed|changelog|modified)\b([^\S\r\n]*([^\ \<]*))?([^\S\r\n]*(\<(.*)\>))?([^\S\r\n]*([^@]*))?/g,
        object : "array",
        type : "object",
        captures: {
            "3": "date",
            "6": "author",
            "8": "description"
        }
    },
    {
        figure : "@isue some description",
        description : "Describes the problem in the code.",
        example : "@isue sometimes returns null\n@isue link not work",
        match : /@(isue)\b([^\S\r\n]+([^@]*))/g,
        object : "array",
        type : "string",
        captures: {
            "3": "isues"
        }
    },
    {
        figure : "@figure|form name([parameters]) [description]",
        description : "Document function form.",
        example : "@figure getData() returns all data as array\n@figure getData(options) returns all data as array\n@figure getData(uniqueId | index | object related with row, options) returns row data as JSON",
        name : "figures",
        match : /@(figure|form)\b([^\S\r\n]+((\w*)[^\S\r\n]*\([^(]*\)))([^\S\r\n]+([^@]*)?)?/g,
        object : "array",
        type : "object",
        captures: {
            "3": "figure",
            "6": "description"
        }
    }
]

function prepareComment(str) {
    str = str.trim();
    if (str.startsWith("/**")) {
        str = str.slice(3);
    }
    if (str.endsWith("*/")) {
        str = str.slice(1, str.length -2);
    }
    str = str.trim();
    const nlCount = str.split(/\r\n|\r|\n/).length;
    if (nlCount >= 1) {
        let starStarts = 0;
        for (const line of str.split(/\r\n|\r|\n/)) {
            if (line.trim().startsWith("*")) {
                starStarts++;
            }
        }
        if (nlCount === starStarts) {
            const lines = [];
            for (const line of str.split(/\r\n|\r|\n/)) {
                lines.push(line.trim().slice(2).trim());
            }
            str = lines.join("\n");
        }
    }

    return str;
}

/**
 * Walk thrue comment and callback parsed figures
 * 
 * @function walk
 * @param {string} str document with or without comment chars around and inline 
 * @param {function} callback (regex, figure, matches) found doc figures
 * @see describe()
 * @see parse()
 */
exports.walk = function (str, callback, options) {
    options ??= {};

    if (typeof str === "string") {
        str = prepareComment(str);
    }

    for (let regex of exports.regexRules) {
        let content = typeof str === "string" ? str : regex.example;
        const figure = {};
        const matches = [];
        while ((captures = regex.match.exec(content)) !== null) {
            if (options.patches) {
                matches.push(captures[0].trim());
            }
            switch (regex.object) {
                case "array": {
                    switch (regex.type) {
                        case "object": {
                            if (!(regex.name in figure)) {
                                figure[regex.name] = [];
                            }
                            let obj = {};
                            for (let [key, name] of Object.entries(regex.captures)) {
                                if (typeof name === "string") {
                                    if ((captures[key] ?? "").trim() !== "") {
                                        obj[name] = captures[key].trim();
                                    }
                                }
                                else {
                                    obj[name.name] = (captures[key] ?? "").trim() !== "" ? captures[key].trim() : name.default;
                                }
                            }
                            if ("split" in regex) {
                                for (let [key, split] of Object.entries(regex.split)) {
                                    if (typeof obj[key] !== "undefined") {
                                        obj[split.name] = obj[key].split(split.delimiter);
                                    }
                                }
                            }
                            figure[regex.name].push(obj);
                            break;
                        }
                        case "string": {
                            for (let [key, name] of Object.entries(regex.captures)) {
                                if (typeof name === "string") {
                                    if ((captures[key] ?? "").trim() !== "") {
                                        if (!(name in figure)) {
                                            figure[name] = [];
                                        }
                                        figure[name].push(captures[key].trim());
                                    }
                                }
                                else if (typeof name === "object") {
                                    if (!(name.name in figure)) {
                                        figure[name.name] = [];
                                    }
                                    figure[name.name].push((captures[key] ?? "").trim() !== "" ? captures[key].trim() : name.default);
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
                case "property": {
                    switch (regex.type) {
                        case "object": {
                            let obj = {};
                            for (let [key, name] of Object.entries(regex.captures)) {
                                if (typeof name === "string") {
                                    if ((captures[key] ?? "").trim() !== "") {
                                        obj[name] = captures[key].trim();
                                    }
                                }
                                else if (typeof name === "object") {
                                    obj[name.name] = (captures[key] ?? "").trim() !== "" ? captures[key].trim() : name.default;
                                }
                            }
                            if ("split" in regex) {
                                for (let [key, split] of Object.entries(regex.split)) {
                                    if (typeof obj[key] !== "undefined") {
                                        obj[split.name] = obj[key].split(split.delimiter);
                                    }
                                }
                            }
                            figure[regex.name] = obj;
                            break;
                        }
                        case "string": {
                            for (let [key, name] of Object.entries(regex.captures)) {
                                if (typeof name === "string") {
                                    if ((captures[key] ?? "").trim() !== "") {
                                        figure[name] = captures[key].trim();
                                    }
                                }
                                else if (typeof name === "object") {
                                    figure[name.name] = (captures[key] ?? "").trim() !== "" ? captures[key].trim() : name.default;
                                }
                            }
                            break;
                        }
                        case "match": {
                            for (let [key, name] of Object.entries(regex.captures)) {
                                figure[captures[key]] = true;
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
        if (Object.keys(figure).length) {
            callback(regex, figure, matches);
        }
    }
}

/**
 * Parse documentary comment and create json structure
 * 
 * @function parse
 * @param {string} str document with or without comment chars around and inline, if undefined then parse figure.example
 * @returns {json} parsed structure
 * @property {boolean} options.matches include matches in documentation structure
 * @see describe()
 * @see walk()
 */
exports.parse = function (str, options) {
    options ??= {};
    const document = {};

    const allMatches = [];
    exports.walk(str, (regex, figure, matches) => {
        Object.assign(document, figure);
        if (options.matches) {
            allMatches.push(...matches);
        }
    }, options);
    if (options.matches) {
        document.matches = allMatches;
    }
    
    return document;
}

/**
 * Describe rules, figures with examples and structure look like.
 * This is also self test.
 * 
 * @function describe
 * @returns {string} with explanation of parsed structure
 */
exports.describe = function (options) {
    options ??= {};
    let result = "";
    
    exports.walk(undefined, (regex, figure, matches) => {
        if (result.length !== 0) {
            result += "\n\n";
        }
        result += 
            "Figure: " +regex.figure +"\n" +
            regex.description +"\n" +
            "Kind: " +regex.object +" of " +regex.type +
            "\nExample:\n" +regex.example +
            "\nResult:\n" +JSON.stringify(figure, null, "\t");
    }, options);

    return result;
}

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
 * @property {boolean} options.under.code returns code founded under comment
 * @property {boolean} options.under.name returns code founded/parsed name under comment
 * @property {boolean} options.matches include matches in documentation structure
 * 
 * @param {string} path path with filename 
 * @param {json} options
 * @returns {json[]} array of documentation structures
 */
exports.parseFile = function (path, options) {
    options ??= {};
    const dc = [];
    const source = fs.readFileSync(path, "utf-8").toString();

    while ((captures = regexDocumentationComment.exec(source)) !== null) {
        let underCode = source.slice(captures.index +captures[0].length);
        const comment = exports.parse(captures[0], options);
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

//console.log(exports.describe());
// console.log(exports.parse(`/**
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
//console.log(JSON.stringify(exports.parseFile("c:/projekty/mPak/nodejs/cmtdoc-parser/index.js", {under : {name:true}}), null, "\t"));
//console.log(JSON.stringify(exports.parseFile("c:/projekty/mPak/nodejs/dbpages/common/assets/libs/dyna-table-1.0.0/dyna-table.js", {under : {name:true}}), null, "\t"));
 