/**
 * Parse single documentation comment like jsdoc or javadoc<br />
 * I used the resources from the website https://jsdoc.app/ and prepared the regex using the website https://regex101.com/<br />
 * This module made for parse documentation comments in DPAG template files dedicated DBPAGES web application server.<br />
 * 
 * @author Andrzej Kałuża
 * @created 2025-01-16
 * @version 1.1.5
 * @module cmtdoc-parser
 */

const reCurlyContent = "(\\s*{([^{]*)?})"; // g2 - 2
const reAngleContent = "(\\s*<([^<]*)>)"; // g2 - 2
const reSquareContent = "(\\s*\\[([^\\[]*)\\])"; // g2 - 2
const reParenthContent = "(\\s*\\(([^\\(]*)\\))"; // g2 - 2
const rePathName = "(\\s+([^\\s@]+))"; // g2 - 2
const reNameWithDefault = "(\\s*\\[(([^\\[\\=]+)\\s*(\\=\\s*([^\\[]*)?)?)?\\])"; // g3, g5 - 5
const reContent = "(\\s+([^@\\-<{\\(]+))"; // g2 - 2
const reDescription = "(\\s*([^@]*)?)"; // g2 - 2

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
 * @property {string} captures."group" regex group with property name
 * @property {json} split if object you can split value
 * @property {string} split."captures.value".name split to property name
 * @property {string} split."captures.value".delimiter delimiter for split
 * 
 * @isue not work inline {(at)link page} in descriptions
 */
exports.regexRules = [
    {
        figure : "This is root description",
        description : "Top of documentary comment content.",
        example : "JSDoc 3 is an API documentation generator for JavaScript,\nsimilar to Javadoc or phpDocumentor.\nYou add documentation comments directly to your source code,\nright alongside the code itself.\nThe JSDoc tool will scan your source code and generate an HTML documentation website for you.",
        match : /^([^@]+)/g,
        object : "array",
        type : "string",
        captures: {
            "1": "description"
        }
    },
    {
        figure : "@param|arg|argument [{type}] name|[name=value] [description]",
        description : "The @param tag provides the name, type, and description of a function parameter.",
        example : "@param {string|any[]|*} aid\n@param {string} [alabel_text=abc] if the LABEL is to appear\n@param {attributes} alabel_attrs extra attributes for LABEL\n@param {attributes} aselect_attrs extra attribues for INPUT\n@arg {string=} somebody - Somebody's name.\n@param <V> the value of the element",
        name : "param",
        match : new RegExp("@(param|arg|argument)" +reCurlyContent +"?(" +reNameWithDefault +"|" +rePathName +")" +reDescription +"?", "g"),
        object : "array",
        type : "object",
        captures: {
            "3" : "type",
            "7" : "name",
            "9" : "default",
            "11" : "name",
            "13" : "description"
        },
        split : {
            "type" : {
                "name" : "types",
                "delimiter" : "|"
            }
        }
    },
    {
        figure : "@property|prop [{type}] name|[name=value] [description]",
        description : "The @property tag is a way to easily document a list of static properties of a class, namespace or other object.",
        example : "@property {object|json} defaults The default values for parties.\n@property {number} defaults.players The default number of players.\n@property {number} defaults.treasure.gold How much gold the party starts with.",
        name : "property",
        match : new RegExp("@(property|prop)" +reCurlyContent +"?(" +reNameWithDefault +"|" +rePathName +")" +reDescription +"?", "g"),
        object : "array",
        type : "object",
        captures: {
            "3" : "type",
            "7" : "name",
            "9" : "default",
            "11" : "name",
            "13" : "description"
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
        match : /@(access)\s+(package|private|protected|public)\b/g,
        object : "property",
        type : "string",
        captures: {
            "2": "access"
        }
    },
    {
        figure : "@alias path [description]",
        description : "Treat a member as if it had a different name.",
        example : "@alias trackr.CookieManager",
        name : "alias",
        match : new RegExp("@(alias)" +rePathName +reDescription +"?", "g"),
        object : "property",
        type : "object",
        captures: {
            "3": "path",
            "5": "description"
        }
    },
    {
        figure : "@augments|extends path [description]",
        description : "Indicate that a symbol inherits from, and adds to, a parent symbol.",
        example : "@augments Animal",
        name : "augments",
        match : new RegExp("@(augments|extends)" +rePathName +reDescription +"?", "g"),
        object : "array",
        type : "object",
        captures: {
            "3": "path",
            "5": "description"
        }
    },
    {
        figure : "@author author [<email@address>] [(http-page)] [- description]",
        description : "Identify the author of an item.",
        example : "@author Andrzej Kałuża <aaa@server.pl> (http:\\page)\n@author Juliusz Cezar - I down't now way",
        name : "author",
        match : new RegExp("@(author)" +reContent +reAngleContent +"?" +reParenthContent +"?" +"(\\s*\\-" +reDescription +"?)?", "g"),
        object : "array",
        type : "object",
        captures: {
            "3": "author",
            "5": "email",
            "7": "page",
            "10": "description"
        }
    },
    {
        figure : "@borrows thas_namepath as this_namepath [description]",
        description : "This object uses something from another object.",
        example : "@borrows trim as myTrime",
        name : "borrows",
        match : new RegExp("@(borrows)" +rePathName +"\\s*as\\s*" +rePathName +reDescription +"?", "g"),
        object : "property",
        type : "object",
        captures: {
            "3": "that",
            "5": "this",
            "7": "description"
        }
    },
    {
        figure : "@class|constructor [{type}] name",
        description : "This function is intended to be called with the \"new\" keyword.",
        example : "@class {Person} Human",
        name : "class",
        match : new RegExp("@(constructor|class)" +reCurlyContent +"?" +rePathName, "g"),
        object : "property",
        type : "object",
        captures: {
            "3": "type",
            "5": "name"
        }
    },
    {
        figure : "@class|constructor",
        description : "This function is intended to be called with the \"new\" keyword.",
        example : "@class",
        match : /@(constructor|class)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "class"
        }
    },
    {
        figure : "@constatnt|const {type} [name]",
        description : "The @constant tag is used to mark the documentation as belonging to a symbol that is a constant.",
        example : "@constant {number}",
        name : "constant",
        match : new RegExp("@(constant|const)" +reCurlyContent +rePathName +"?", "g"),
        object : "property",
        type : "object",
        captures: {
            "3": "type",
            "5": "name"
        }
    },
    {
        figure : "@constructs name",
        description : "This function member will be the constructor for the previous class.",
        example : "@constructs Menu",
        match : new RegExp("@(constructs)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "constructs"
        }
    },
    {
        figure : "@constructs",
        description : "This function member will be the constructor for the previous class.",
        example : "@constructs",
        match : /@(constructs)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "constructs"
        }
    },
    {
        figure : "@copyright some copyright text",
        description : "Document some copyright information.",
        example : "@copyright Andrzej Kałuża 2025",
        match : new RegExp("@(copyright)" +reDescription, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "copyright"
        }
    },
    {
        figure : "@default value",
        description : "Document the default value.",
        example : "@default 'Ex25622'",
        match : new RegExp("@(default|defaultvalue)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "default"
        }
    },
    {
        figure : "@default",
        description : "Document the default.",
        example : "@default",
        match : /@(default|defaultvalue)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "default"
        }
    },
    {
        figure : "@deprecated some text",
        description : "Document that this is no longer the preferred way.",
        example : "@deprecated since version 2.0 use other function",
        match : new RegExp("@(deprecated)" +reDescription, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "deprecated"
        }
    },
    {
        figure : "@deprecated",
        description : "Document that this is no longer the preferred way.",
        example : "@deprecated",
        match : /@(deprecated)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "deprecated"
        }
    },
    {
        figure : "@description|desc|classdesc some description",
        description : "Describe a symbol.",
        example : "@description Add two numbers.",
        match : new RegExp("@(description|desc|classdesc)" +reDescription, "g"),
        object : "array",
        type : "string",
        captures: {
            "3": "description"
        }
    },
    {
        figure : "@enum {type} [name]",
        description : "Document a collection of related properties.",
        example : "@enum {number}",
        match : new RegExp("@(enum)" +reCurlyContent +rePathName +"?", "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "enum",
            "5": "name"
        }
    },
    {
        figure : "@enum",
        description : "Document a collection of related properties.",
        example : "@enum {number}",
        match : /@(enum)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "enum"
        }
    },
    {
        figure : "@event event_name",
        description : "Document an event.",
        example : "@event Hurl#snowball",
        name : "event",
        match : new RegExp("@(event)" +rePathName, "g"),
        object : "array",
        type : "string",
        captures: {
            "3": "event"
        }
    },
    {
        figure : "@example multiline example, code, comments, etc",
        description : "Provide an example of how to use a documented item.",
        example : " @example\n// returns 2\nglobalNS.method1(5, 10);\n@example\n// returns 3\nglobalNS.method(5, 15);",
        match : new RegExp("@(example)" +reDescription, "g"),
        object : "array",
        type : "string",
        captures: {
            "2": "example"
        }
    },
    {
        figure : "@exports name",
        description : "Identify the member that is exported module.",
        example : "@exports Privare",
        match : new RegExp("@(exports)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "exports"
        }
    },
    {
        figure : "@external|host name_of_external",
        description : "Identifies an external class, namespace, or module.",
        example : "@external \"jQuery.fn\"",
        match : new RegExp("@(external|host)" +rePathName, "g"),
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
        match : new RegExp("@(file|fileoverview|overview)" +reDescription, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "file"
        }
    },
    {
        figure : "@fires|emits event_name",
        description : "Describe the events this method may fire.",
        example : "@fires Milkshake#drain",
        name : "fire",
        match : new RegExp("@(fires|emits)" +rePathName, "g"),
        object : "array",
        type : "string",
        captures: {
            "3": "event"
        }
    },
    {
        figure : "@function|func|method name",
        description : "Describe a function or method.",
        example : "@function myFunction",
        match : new RegExp("@(function|func|method)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "function"
        }
    },
    {
        figure : "@function|func|method",
        description : "Set a function or method.",
        example : "@function",
        match : /@(function|func|method)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "function"
        }
    },
    {
        figure : "@implements {type}",
        description : "This symbol implements an interface.",
        example : "@implements {Color}",
        match : new RegExp("@(implements)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "implements"
        }
    },
    {
        figure : "@interface name",
        description : "This symbol is an interface that others can implement.",
        example : "@interface Color",
        match : new RegExp("@(interface)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "interface"
        }
    },
    {
        figure : "@interface",
        description : "Set as interface that others can implement.",
        example : "@interface",
        match : /@(interface)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "interface"
        }
    },
    {
        figure : "@created date",
        description : "Date creation",
        example : "@created 2025-01-17",
        match : new RegExp("@(created)" +rePathName, "g"),
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
        match : /@(kind)\s+(class|constant|event|external|file|function|member|mixin|module|namespace|typedef)\b/g,
        object : "property",
        type : "string",
        captures: {
            "2": "kind"
        }
    },
    {
        figure : "@lends path",
        description : "Document properties on an object literal as if they belonged to a symbol with a given name.",
        example : "@lends Person.prototype",
        match : new RegExp("@(lends)" +rePathName, "g"),
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
        match : new RegExp("@(license)" +reDescription, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "license"
        }
    },
    {
        figure : "@listens event_name",
        description : "List the events that a symbol listens for.",
        example : "@listens module:hurler~event:snowball",
        match : new RegExp("@(listens)" +rePathName, "g"),
        object : "array",
        type : "string",
        captures: {
            "3": "listens"
        }
    },
    {
        figure : "@member|var|variable {type} [name]",
        description : "Document a member.",
        example : "",
        name : "variable",
        match : new RegExp("@(var|variable|member)" +reCurlyContent +rePathName +"?", "g"),
        object : "property",
        type : "object",
        captures: {
            "3": "type",
            "5": "name"
        }
    },
    {
        figure : "@memberof[!] name",
        description : "This symbol belongs to a parent symbol.",
        example : "@memberof Tools",
        match : new RegExp("@(memberof|memberof\!)" +rePathName, "g"),
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
        match : new RegExp("@(mixes)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "mixes"
        }
    },
    {
        figure : "@mixin name",
        description : "Document a mixin object.",
        example : "@mixin",
        match : new RegExp("@(mixin)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "mixin"
        }
    },
    {
        figure : "@mixin",
        description : "Document a mixin object.",
        example : "@mixin",
        match : /@(mixin)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "mixin"
        }
    },
    {
        figure : "@module name",
        description : "Document a module.",
        example : "@module MyModule",
        match : new RegExp("@(module)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "module"
        }
    },
    {
        figure : "@module",
        description : "Document a module.",
        example : "@module",
        match : /@(module)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "module"
        }
    },
    {
        figure : "@namespace name",
        description : "Document a namespace object.",
        example : "@namespace MyNamespace",
        match : new RegExp("@(namespace)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "namespace"
        }
    },
    {
        figure : "@namespace",
        description : "Set a namespace object.",
        example : "@namespace",
        name : "namespace",
        match : /@(namespace)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "namespace"
        }
    },
    {
        figure : "@name name",
        description : "Document the name of an object.",
        example : "@name highlightSearchTerm",
        match : new RegExp("@(name)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "name"
        }
    },
    {
        figure : "@package {type}",
        description : "This symbol is meant to be package-private.",
        example : "@package",
        match : new RegExp("@(package)" +reCurlyContent, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "package"
        }
    },
    {
        figure : "@package",
        description : "This symbol is meant to be package-private.",
        example : "@package",
        match : /@(package)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "package"
        }
    },
    {
        figure : "@private {type}",
        description : "This symbol is meant to be private.",
        example : "@private {integer}",
        match : new RegExp("@(private)" +reCurlyContent, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "private"
        }
    },
    {
        figure : "@private",
        description : "This symbol is meant to be private.",
        example : "@private",
        match : /@(private)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "private"
        }
    },
    {
        figure : "@protected {type}",
        description : "This symbol is meant to be protected.",
        example : "@protected {Number}",
        match : new RegExp("@(protected)" +reCurlyContent, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "protected"
        }
    },
    {
        figure : "@protected",
        description : "This symbol is meant to be protected.",
        example : "@protected",
        match : /@(protected)\b/g,
        object : "property",
        type : "match",
        captures: {
            "1": "protected"
        }
    },
    {
        figure : "@requires module_name",
        description : "This file requires a module or other object, file.",
        example : "@requires module:xyzcorp/helper\n@requires xyzcorp/helper.ShinyWidget#polish",
        match : new RegExp("@(requires)" +rePathName, "g"),
        object : "array",
        type : "string",
        captures: {
            "3": "requires"
        }
    },
    {
        figure : "@return|returns {type} [description]",
        description : "Document the return value of a function.",
        example : "@returns {number} Sum of a and b",
        name : "returns",
        match : new RegExp("@(returns|return)" +reCurlyContent +reDescription +"?", "g"),
        object : "property",
        type : "object",
        captures: {
            "3": "type",
            "5": "description"
        },
        split : {
            "type" : {
                name : "types",
                delimiter : "|"
            }
        }
    },
    {
        figure : "@see {@link namepath}|namepath [description]",
        description : "Refer to some other documentation for more information.",
        example : "@see {@link bar}\n@see bar\n@see {@link foo} for further information.\n@see {@link http://github.com|GitHub}\n@see package.Class#method",
        name : "see",
        match : new RegExp("@(see)(" +reCurlyContent +"|" +rePathName +")" +reDescription +"?", "g"),
        object : "array",
        type : "object",
        captures: {
            "4": "path",
            "6": "path",
            "8": "description"
        }
    },
    {
        figure : "@since version",
        description : "When was this feature added?",
        example : "@since 1.0.1",
        match : new RegExp("@(since)" +reDescription, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "since"
        }
    },
    {
        figure : "@summary description",
        description : "A shorter version of the full description.",
        example : "@summary A concise summary.",
        match : new RegExp("@(summary)" +reDescription, "g"),
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
        match : new RegExp("@(this)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "this"
        }
    },
    {
        figure : "@throws|exception {type} [description]",
        description : "Describe what errors could be thrown.",
        example : "@throws {InvalidArgumentException}\n@throws Will throw an error if the argument is null.\n@throws {DivideByZero} Argument x must be non-zero.",
        name : "throws",
        match : new RegExp("@(throws|exception)" +reCurlyContent +reDescription +"?", "g"),
        object : "array",
        type : "object",
        captures: {
            "3": "type",
            "5": "description"
        }
    },
    {
        figure : "@todo text describing thing to do.",
        description : "Document tasks to be completed.",
        example : "@todo Write the documentation.\n@todo Implement this function.",
        match : new RegExp("@(todo)" +reDescription, "g"),
        object : "array",
        type : "string",
        captures: {
            "3": "todo"
        }
    },
    {
        figure : "@typedef [{type}] name",
        description : "Document a custom type.",
        example : "@typedef {(number|string)} NumberLike\n@typedef {Object} WishGranter~Triforce",
        name : "typedef",
        match : new RegExp("@(typedef)" +reCurlyContent +"?" +rePathName, "g"),
        object : "property",
        type : "object",
        captures: {
            "3": "type",
            "5": "name"
        }
    },
    {
        figure : "@tutorial {@link path}|name",
        description : "Insert a link to an included tutorial file.",
        example : "@tutorial tutorial-1\n@tutorial {@link index.js}",
        match : new RegExp("@(tutorial)(" +reCurlyContent +"|" +rePathName +")", "g"),
        object : "array",
        type : "string",
        captures: {
            "4": "tutorial",
            "6": "tutorial"
        }
    },
    {
        figure : "@type {type}",
        description : "Document the type of an object.",
        example : "@type {Array.<string>}\n@type {number}",
        match : new RegExp("@(type)" +reCurlyContent, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "type"
        }
    },
    {
        figure : "@variation number",
        description : "Distinguish different objects with the same name.",
        example : "@variation 2",
        match : new RegExp("@(variation)" +rePathName, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "variation"
        }
    },
    {
        figure : "@version version",
        description : "Documents the version number of an item.",
        example : "@version 1.0.45\n@version 0.0.1 Beta",
        match : new RegExp("@(version)" +reDescription, "g"),
        object : "property",
        type : "string",
        captures: {
            "3": "version"
        }
    },
    {
        figure : "@yield|yields|next [{type}] [description]",
        description : "Document the value yielded by a generator function.",
        example : "@yields {number}\n@yields {number} The next number in the Fibonacci sequence.]",
        name : "yield",
        match : new RegExp("@(yield|yields|next)" +reCurlyContent +"?" +reDescription +"?", "g"),
        object : "property",
        type : "object",
        captures: {
            "3": "type",
            "5": "description"
        }
    },
    {
        figure : "@change|changed|changelog|modified [date] [<author>] [description]",
        description : "Change log of object.",
        example : "@changed 2025-01-01 <Andrzej Kałuża> some description\n@changed <Andrzej Kałuża> some description\n@changed 2025-01-05 some description",
        name : "change",
        match : new RegExp("@(change|changed|changelog|modified)" +rePathName +"?" +reAngleContent +"?" +reDescription +"?", "g"),
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
        match : new RegExp("@(isue)" +reDescription, "g"),
        object : "array",
        type : "string",
        captures: {
            "3": "isue"
        }
    },
    {
        figure : "@figure|form name([parameters]) [description]",
        description : "Document function form.",
        example : "@figure getData() returns all data as array\n@figure getData(options) returns all data as array\n@figure getData(uniqueId | index | object related with row, options) returns row data as JSON",
        name : "figure",
        match : new RegExp("@(figure|form)(" +rePathName +reParenthContent +")" +reDescription +"?", "g"),
        object : "array",
        type : "object",
        captures: {
            "2": "figure",
            "7": "description"
        }
    },
    {
        figure : "@template [{type}] name[, name, ...] [- description]",
        description : "Document class templates and his type.",
        example : "@template {String} K - K must be a string or string literal\n@template K, V, Z",
        name : "template",
        match : new RegExp("@(template)" +reCurlyContent +"?" +reContent +"(\\s*\\-" +reDescription +"?)?", "g"),
        object : "array",
        type : "object",
        captures: {
            "3": "type",
            "5": "name",
            "8": "description"
        },
        split : {
            "type" : {
                name : "types",
                delimiter : "|"
            },
            "name" : {
                name : "names",
                delimiter : ","
            }
        }
    },
    {
        figure : "@callback name",
        description : "Document callback function.",
        example : "@callback Predicate",
        match : new RegExp("@(callback)" +rePathName, "g"),
        object : "array",
        type : "string",
        captures: {
            "3": "callback"
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
 * @param {function} callback found doc figures
 * @param {json} [options={}]
 * @see describe()
 * @see parse()
 * @figure callback(regex, figure, matches)
 */
exports.walk = function (str, callback, options = {}) {
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
                                if ((captures[key] ?? "").trim() !== "") {
                                    obj[name] = captures[key].trim();
                                }
                            }
                            if ("split" in regex) {
                                for (let [key, split] of Object.entries(regex.split)) {
                                    if (typeof obj[key] !== "undefined") {
                                        obj[split.name] = obj[key].split(split.delimiter).map(item => {
                                            return item.trim();
                                        });
                                    }
                                }
                            }
                            figure[regex.name].push(obj);
                            break;
                        }
                        case "string": {
                            for (let [key, name] of Object.entries(regex.captures)) {
                                if ((captures[key] ?? "").trim() !== "") {
                                    if (!(name in figure)) {
                                        figure[name] = [];
                                    }
                                    figure[name].push(captures[key].trim());
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
                                if ((captures[key] ?? "").trim() !== "") {
                                    obj[name] = captures[key].trim();
                                }
                            }
                            if ("split" in regex) {
                                for (let [key, split] of Object.entries(regex.split)) {
                                    if (typeof obj[key] !== "undefined") {
                                        obj[split.name] = obj[key].split(split.delimiter).map(item => {
                                            return item.trim();
                                        });
                                    }
                                }
                            }
                            figure[regex.name] = obj;
                            break;
                        }
                        case "string": {
                            for (let [key, name] of Object.entries(regex.captures)) {
                                if ((captures[key] ?? "").trim() !== "") {
                                    figure[name] = captures[key].trim();
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
 * @param {json} [options={}]
 * @returns {json} parsed structure
 * @property {boolean} options.matches include matches in documentation structure
 * @see describe()
 * @see walk()
 */
exports.parse = function (str, options = {}) {
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
 * @param {json} [options={}]
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
            "Match:" +regex.match.source +"\n" +
            "Kind: " +regex.object +" of " +regex.type +
            "\nExample:\n" +regex.example +
            "\nResult:\n" +JSON.stringify(figure, null, "\t");
    }, options);

    return result;
}
 