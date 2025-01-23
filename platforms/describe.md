# Describe js doc figures

### Figure `This is root description`
Top of documentary comment content.

Example
```
JSDoc 3 is an API documentation generator for JavaScript,
similar to Javadoc or phpDocumentor.
You add documentation comments directly to your source code,
right alongside the code itself.
The JSDoc tool will scan your source code and generate an HTML documentation website for you.
```
Result
```js
{
	"root": "JSDoc 3 is an API documentation generator for JavaScript,\nsimilar to Javadoc or phpDocumentor.\nYou add documentation comments directly to your source code,\nright alongside the code itself.\nThe JSDoc tool will scan your source code and generate an HTML documentation website for you."
}
```

### Figure `@param|arg|argument [{type}] name|[name=value] [description]`
The @param tag provides the name, type, and description of a function parameter.

Example
```
@param {string|any[]|*} aid
@param {string} [alabel_text=abc] if the LABEL is to appear
@param {attributes} alabel_attrs extra attributes for LABEL
@param {attributes} aselect_attrs extra attribues for INPUT
@arg {string=} somebody - Somebody's name.
@param <V> the value of the element
```
Result
```js
{
	"param": [
		{
			"type": "string|any[]|*",
			"name": "aid",
			"types": [
				"string",
				"any[]",
				"*"
			]
		},
		{
			"type": "string",
			"name": "alabel_text",
			"default": "abc",
			"description": "if the LABEL is to appear",
			"types": [
				"string"
			]
		},
		{
			"type": "attributes",
			"name": "alabel_attrs",
			"description": "extra attributes for LABEL",
			"types": [
				"attributes"
			]
		},
		{
			"type": "attributes",
			"name": "aselect_attrs",
			"description": "extra attribues for INPUT",
			"types": [
				"attributes"
			]
		},
		{
			"type": "string=",
			"name": "somebody",
			"description": "- Somebody's name.",
			"types": [
				"string="
			]
		}
	]
}
```

### Figure `@property|prop [{type}] name|[name=value] [description]`
The @property tag is a way to easily document a list of static properties of a class, namespace or other object.

Example
```
@property {object|json} defaults The default values for parties.
@prop {number} defaults.players The default number of players.
@property {number} defaults.treasure.gold How much gold the party starts with.
```
Result
```js
{
	"property": [
		{
			"type": "object|json",
			"name": "defaults",
			"description": "The default values for parties.",
			"types": [
				"object",
				"json"
			]
		},
		{
			"type": "number",
			"name": "defaults.players",
			"description": "The default number of players.",
			"types": [
				"number"
			]
		},
		{
			"type": "number",
			"name": "defaults.treasure.gold",
			"description": "How much gold the party starts with.",
			"types": [
				"number"
			]
		}
	]
}
```

### Figure `@async`
The @async tag indicates that a function is asynchronous, meaning that it was declared using the syntax async function foo() {}. Do not use this tag for other types of asynchronous functions, such as functions that provide a callback.

Example
```
@async
```
Result
```js
{
	"async": true
}
```

### Figure `@generator`
The @generator tag indicates that a function is a generator function, meaning that it was declared using the syntax function* foo() {}.

Example
```
@generator
```
Result
```js
{
	"generator": true
}
```

### Figure `@global`
The @global tag specifies that a symbol should appear in the documentation as a global symbol. JSDoc ignores the symbol's actual scope within the source file. This tag is especially useful for symbols that are defined locally, then assigned to a global symbol.

Example
```
@global
```
Result
```js
{
	"global": true
}
```

### Figure `@hideconstructor`
The @hideconstructor tag tells JSDoc that the generated documentation should not display the constructor for a class.

Example
```
@hideconstructor
```
Result
```js
{
	"hideconstructor": true
}
```

### Figure `@ignore`
The @ignore tag indicates that a symbol in your code should never appear in the documentation. This tag takes precedence over all others.

Example
```
@ignore
```
Result
```js
{
	"ignore": true
}
```

### Figure `@inner`
Using the @inner tag will mark a symbol as an inner member of its parent symbol. This means it can be referred to by "Parent~Child".

Example
```
@inner
```
Result
```js
{
	"inner": true
}
```

### Figure `@instance`
Using the @instance tag will mark a symbol as an instance member of its parent symbol. This means it can be referred to by "Parent#Child".

Example
```
@instance
```
Result
```js
{
	"instance": true
}
```

### Figure `@override`
The @override tag indicates that a symbol overrides a symbol with the same name in a parent class.

Example
```
@override
```
Result
```js
{
	"override": true
}
```

### Figure `@public`
The @public tag indicates that a symbol should be documented as if it were public.

Example
```
@public
```
Result
```js
{
	"public": true
}
```

### Figure `@readonly`
The @readonly tag indicates that a symbol is intended to be read-only. Note this is for the purpose of documentation only.

Example
```
@readonly
```
Result
```js
{
	"readonly": true
}
```

### Figure `@static`
The @static tag indicates that a symbol is contained within a parent and can be accessed without instantiating the parent.

Example
```
@static
```
Result
```js
{
	"static": true
}
```

### Figure `@abstract|virtual`
This member must be implemented (or overridden) by the inheritor.

Example
```
@abstract
```
Result
```js
{
	"abstract": true
}
```

### Figure `@access package|private|protected|public`
Specify the access level of this member (private, package-private, public, or protected).

Example
```
@access package
```
Result
```js
{
	"access": "package"
}
```

### Figure `@alias path [description]`
Treat a member as if it had a different name.

Example
```
@alias trackr.CookieManager
```
Result
```js
{
	"alias": {
		"path": "trackr.CookieManager"
	}
}
```

### Figure `@augments|extends path [description]`
Indicate that a symbol inherits from, and adds to, a parent symbol.

Example
```
@augments Animal
```
Result
```js
{
	"augments": [
		{
			"path": "Animal"
		}
	]
}
```

### Figure `@author author [<email@address>] [(http-page)] [- description]`
Identify the author of an item.

Example
```
@author Andrzej Kałuża <aaa@server.pl> (http:\page)
@author Juliusz Cezar - I down't now way
```
Result
```js
{
	"author": [
		{
			"author": "Andrzej Kałuża",
			"email": "aaa@server.pl",
			"page": "http:\\page"
		},
		{
			"author": "Juliusz Cezar",
			"description": "I down't now way"
		}
	]
}
```

### Figure `@borrows thas_namepath as this_namepath [description]`
This object uses something from another object.

Example
```
@borrows trim as myTrime
```
Result
```js
{
	"borrows": {
		"that": "trim",
		"this": "myTrime"
	}
}
```

### Figure `@class|constructor [{type}] name`
This function is intended to be called with the "new" keyword.

Example
```
@class {Person} Human
```
Result
```js
{
	"class": {
		"type": "Person",
		"name": "Human"
	}
}
```

### Figure `@class|constructor`
This function is intended to be called with the "new" keyword.

Example
```
@class
```
Result
```js
{
	"class": true
}
```

### Figure `@constatnt|const {type} [name]`
The @constant tag is used to mark the documentation as belonging to a symbol that is a constant.

Example
```
@constant {number}
```
Result
```js
{
	"constant": {
		"type": "number"
	}
}
```

### Figure `@constructs name`
This function member will be the constructor for the previous class.

Example
```
@constructs Menu
```
Result
```js
{
	"constructs": "Menu"
}
```

### Figure `@constructs`
This function member will be the constructor for the previous class.

Example
```
@constructs
```
Result
```js
{
	"constructs": true
}
```

### Figure `@copyright some copyright text`
Document some copyright information.

Example
```
@copyright Andrzej Kałuża 2025
```
Result
```js
{
	"copyright": "Andrzej Kałuża 2025"
}
```

### Figure `@default value`
Document the default value.

Example
```
@default 'Ex25622'
```
Result
```js
{
	"default": "'Ex25622'"
}
```

### Figure `@default`
Document the default.

Example
```
@default
```
Result
```js
{
	"default": true
}
```

### Figure `@deprecated some text`
Document that this is no longer the preferred way.

Example
```
@deprecated since version 2.0 use other function
```
Result
```js
{
	"deprecated": "since version 2.0 use other function"
}
```

### Figure `@deprecated`
Document that this is no longer the preferred way.

Example
```
@deprecated
```
Result
```js
{
	"deprecated": true
}
```

### Figure `@description|desc|classdesc some description`
Describe a symbol.

Example
```
@description Add two numbers.
```
Result
```js
{
	"description": [
		"Add two numbers."
	]
}
```

### Figure `@enum {type} [name]`
Document a collection of related properties.

Example
```
@enum {number}
```
Result
```js
{
	"enum": "number"
}
```

### Figure `@enum`
Document a collection of related properties.

Example
```
@enum {number}
```
Result
```js
{
	"enum": true
}
```

### Figure `@event event_name`
Document an event.

Example
```
@event Hurl#snowball
```
Result
```js
{
	"event": [
		"Hurl#snowball"
	]
}
```

### Figure `@example multiline example, code, comments, etc`
Provide an example of how to use a documented item.

Example
```
 @example
// returns 2
globalNS.method1(5, 10);
@example
// returns 3
globalNS.method(5, 15);
```
Result
```js
{
	"example": [
		"// returns 2\nglobalNS.method1(5, 10);",
		"// returns 3\nglobalNS.method(5, 15);"
	]
}
```

### Figure `@exports name`
Identify the member that is exported module.

Example
```
@exports Privare
```
Result
```js
{
	"exports": "Privare"
}
```

### Figure `@external|host name_of_external`
Identifies an external class, namespace, or module.

Example
```
@external "jQuery.fn"
```
Result
```js
{
	"external": "\"jQuery.fn\""
}
```

### Figure `@file some description`
Describe a file.

Example
```
@file Manages the configuration settings for the widget.
```
Result
```js
{
	"file": "Manages the configuration settings for the widget."
}
```

### Figure `@fires|emits event_name`
Describe the events this method may fire.

Example
```
@fires Milkshake#drain
```
Result
```js
{
	"event": [
		"Milkshake#drain"
	]
}
```

### Figure `@function|func|method name`
Describe a function or method.

Example
```
@function myFunction
```
Result
```js
{
	"function": "myFunction"
}
```

### Figure `@function|func|method`
Set a function or method.

Example
```
@function
```
Result
```js
{
	"function": true
}
```

### Figure `@interface name`
This symbol is an interface that others can implement.

Example
```
@interface Color
```
Result
```js
{
	"interface": "Color"
}
```

### Figure `@interface`
Set as interface that others can implement.

Example
```
@interface
```
Result
```js
{
	"interface": true
}
```

### Figure `@created date`
Date creation

Example
```
@created 2025-01-17
```
Result
```js
{
	"created": "2025-01-17"
}
```

### Figure `@kind class|constant|event|external|file|function|member|mixin|module|namespace|typedef`
What kind of symbol is this?

Example
```
@kind class
```
Result
```js
{
	"kind": "class"
}
```

### Figure `@lends path`
Document properties on an object literal as if they belonged to a symbol with a given name.

Example
```
@lends Person.prototype
```
Result
```js
{
	"lends": "Person.prototype"
}
```

### Figure `@license identifier|standalone multiline text`
Identify the license that applies to this code.

Example
```
@license
The MIT License is a permissive software license originating at the Massachusetts Institute of Technology (MIT)[6] in the late 1980s.[7] As a permissive license, it puts very few restrictions on reuse and therefore has high license compatibility.[8][9]
Unlike copyleft software licenses, the MIT License also permits reuse within proprietary software, provided that all copies of the software or its substantial portions include a copy of the terms of the MIT License and also a copyright notice.[9][10] In 2015, the MIT License was the most popular software license on GitHub,[11] and was still the most popular in 2024.[12]
Notable projects that use the MIT License include the X Window System, Ruby on Rails, Node.js, Lua, jQuery, .NET, Angular, and React. 
```
Result
```js
{
	"license": "The MIT License is a permissive software license originating at the Massachusetts Institute of Technology (MIT)[6] in the late 1980s.[7] As a permissive license, it puts very few restrictions on reuse and therefore has high license compatibility.[8][9]\nUnlike copyleft software licenses, the MIT License also permits reuse within proprietary software, provided that all copies of the software or its substantial portions include a copy of the terms of the MIT License and also a copyright notice.[9][10] In 2015, the MIT License was the most popular software license on GitHub,[11] and was still the most popular in 2024.[12]\nNotable projects that use the MIT License include the X Window System, Ruby on Rails, Node.js, Lua, jQuery, .NET, Angular, and React."
}
```

### Figure `@listens event_name`
List the events that a symbol listens for.

Example
```
@listens module:hurler~event:snowball
```
Result
```js
{
	"listens": [
		"module:hurler~event:snowball"
	]
}
```

### Figure `@memberof[!] name`
This symbol belongs to a parent symbol.

Example
```
@memberof Tools
```
Result
```js
{
	"memberof": "Tools"
}
```

### Figure `@mixes other_object_path`
This object mixes in all the members from another object.

Example
```
@mixes Eventful
```
Result
```js
{
	"mixes": "Eventful"
}
```

### Figure `@mixin`
Document a mixin object.

Example
```
@mixin
```
Result
```js
{
	"mixin": true
}
```

### Figure `@module name`
Document a module.

Example
```
@module MyModule
```
Result
```js
{
	"module": "MyModule"
}
```

### Figure `@module`
Document a module.

Example
```
@module
```
Result
```js
{
	"module": true
}
```

### Figure `@namespace name`
Document a namespace object.

Example
```
@namespace MyNamespace
```
Result
```js
{
	"namespace": "MyNamespace"
}
```

### Figure `@namespace`
Set a namespace object.

Example
```
@namespace
```
Result
```js
{
	"namespace": true
}
```

### Figure `@name name`
Document the name of an object.

Example
```
@name highlightSearchTerm
```
Result
```js
{
	"name": "highlightSearchTerm"
}
```

### Figure `@package`
This symbol is meant to be package-private.

Example
```
@package
```
Result
```js
{
	"package": true
}
```

### Figure `@private {type}`
This symbol is meant to be private.

Example
```
@private {integer}
```
Result
```js
{
	"private": "integer"
}
```

### Figure `@private`
This symbol is meant to be private.

Example
```
@private
```
Result
```js
{
	"private": true
}
```

### Figure `@protected {type}`
This symbol is meant to be protected.

Example
```
@protected {Number}
```
Result
```js
{
	"protected": "Number"
}
```

### Figure `@protected`
This symbol is meant to be protected.

Example
```
@protected
```
Result
```js
{
	"protected": true
}
```

### Figure `@requires module_name`
This file requires a module or other object, file.

Example
```
@requires module:xyzcorp/helper
@requires xyzcorp/helper.ShinyWidget#polish
```
Result
```js
{
	"requires": [
		"module:xyzcorp/helper",
		"xyzcorp/helper.ShinyWidget#polish"
	]
}
```

### Figure `@return|returns {type} [description]`
Document the return value of a function.

Example
```
@returns {number} Sum of a and b
```
Result
```js
{
	"returns": {
		"type": "number",
		"description": "Sum of a and b",
		"types": [
			"number"
		]
	}
}
```

### Figure `@see {@link namepath}|namepath [description]`
Refer to some other documentation for more information.

Example
```
@see {@link bar}
@see bar
@see {@link foo} for further information.
@see {@link http://github.com|GitHub}
@see package.Class#method
```
Result
```js
{
	"see": [
		{
			"path": "@link bar"
		},
		{
			"path": "bar"
		},
		{
			"path": "@link foo",
			"description": "for further information."
		},
		{
			"path": "@link http://github.com|GitHub"
		},
		{
			"path": "package.Class#method"
		}
	]
}
```

### Figure `@since version`
When was this feature added?

Example
```
@since 1.0.1
```
Result
```js
{
	"since": "1.0.1"
}
```

### Figure `@summary description`
A shorter version of the full description.

Example
```
@summary A concise summary.
```
Result
```js
{
	"summary": "A concise summary."
}
```

### Figure `@this namePath`
What does the 'this' keyword refer to here?

Example
```
@this Greeter
```
Result
```js
{
	"this": "Greeter"
}
```

### Figure `@throws|exception {type} [description]`
Describe what errors could be thrown.

Example
```
@throws {InvalidArgumentException}
@throws Will throw an error if the argument is null.
@throws {DivideByZero} Argument x must be non-zero.
```
Result
```js
{
	"throws": [
		{
			"type": "InvalidArgumentException"
		},
		{
			"description": "Will throw an error if the argument is null."
		},
		{
			"type": "DivideByZero",
			"description": "Argument x must be non-zero."
		}
	]
}
```

### Figure `@todo text describing thing to do.`
Document tasks to be completed.

Example
```
@todo Write the documentation.
@todo Implement this function.
```
Result
```js
{
	"todo": [
		"Write the documentation.",
		"Implement this function."
	]
}
```

### Figure `@typedef [{type}] name`
Document a custom type.

Example
```
@typedef {(number|string)} NumberLike
@typedef {Object} WishGranter~Triforce
```
Result
```js
{
	"typedef": {
		"type": "Object",
		"name": "WishGranter~Triforce"
	}
}
```

### Figure `@tutorial {@link path}|name`
Insert a link to an included tutorial file.

Example
```
@tutorial tutorial-1
@tutorial {@link index.js}
```
Result
```js
{
	"tutorial": [
		"tutorial-1",
		"@link index.js"
	]
}
```

### Figure `@type {type}`
Document the type of an object.

Example
```
@type {Array.<string>}
@type {number}
```
Result
```js
{
	"type": "number"
}
```

### Figure `@variation number`
Distinguish different objects with the same name.

Example
```
@variation 2
```
Result
```js
{
	"variation": "2"
}
```

### Figure `@version version`
Documents the version number of an item.

Example
```
@version 1.0.45
@version 0.0.1 Beta
```
Result
```js
{
	"version": "0.0.1 Beta"
}
```

### Figure `@yield|yields|next [{type}] [description]`
Document the value yielded by a generator function.

Example
```
@yields {number}
@yields {number} The next number in the Fibonacci sequence.]
```
Result
```js
{
	"yield": {
		"type": "number",
		"description": "The next number in the Fibonacci sequence.]"
	}
}
```

### Figure `@change|changed|changelog|modified [date] [<author>] [description]`
Change log of object.

Example
```
@changed 2025-01-01 <Andrzej Kałuża> some description
@changed <Andrzej Kałuża> some description
@changed 2025-01-05 some description
```
Result
```js
{
	"change": [
		{
			"date": "2025-01-01",
			"author": "Andrzej Kałuża",
			"description": "some description"
		},
		{
			"author": "Andrzej Kałuża",
			"description": "some description"
		},
		{
			"date": "2025-01-05",
			"description": "some description"
		}
	]
}
```

### Figure `@isue some description`
Describes the know problem in the code.

Example
```
@isue sometimes returns null
@isue link not work
```
Result
```js
{
	"isue": [
		"sometimes returns null",
		"link not work"
	]
}
```

### Figure `@figure|form name([parameters]) [description]`
Document function form.

Example
```
@figure getData() returns all data as array
@figure getData(options) returns all data as array
@figure getData(uniqueId | index | object related with row, options) returns row data as JSON
```
Result
```js
{
	"figure": [
		{
			"figure": "getData()",
			"description": "returns all data as array"
		},
		{
			"figure": "getData(options)",
			"description": "returns all data as array"
		},
		{
			"figure": "getData(uniqueId | index | object related with row, options)",
			"description": "returns row data as JSON"
		}
	]
}
```

### Figure `@template [{type}] name[, name, ...] [- description]`
Document class templates and his type.

Example
```
@template {String} K - K must be a string or string literal
@template K, V, Z
```
Result
```js
{
	"template": [
		{
			"type": "String",
			"name": "K",
			"description": "K must be a string or string literal",
			"types": [
				"String"
			],
			"names": [
				"K"
			]
		},
		{
			"name": "K, V, Z",
			"names": [
				"K",
				"V",
				"Z"
			]
		}
	]
}
```

### Figure `@callback name`
Document callback function.

Example
```
@callback Predicate
```
Result
```js
{
	"callback": [
		"Predicate"
	]
}
```

### Figure `@test`
This symbol indicates that the function is test or testing.

Example
```
@test
```
Result
```js
{
	"test": true
}
```