# Describe js doc figures

## Table of content

1. [This is root description](#Figure-This-is-root-description)
1. [\@param|arg|argument [{type}] name|[name=value] [description]](#Figure-paramargargument-type-namenamevalue-description)
1. [\@property|prop [{type}] name|[name=value] [description]](#Figure-propertyprop-type-namenamevalue-description)
1. [\@async](#Figure-async)
1. [\@generator](#Figure-generator)
1. [\@global](#Figure-global)
1. [\@hideconstructor](#Figure-hideconstructor)
1. [\@ignore](#Figure-ignore)
1. [\@inner](#Figure-inner)
1. [\@instance](#Figure-instance)
1. [\@override](#Figure-override)
1. [\@public](#Figure-public)
1. [\@readonly](#Figure-readonly)
1. [\@static](#Figure-static)
1. [\@abstract|virtual](#Figure-abstractvirtual)
1. [\@access package|private|protected|public](#Figure-access-packageprivateprotectedpublic)
1. [\@alias path [description]](#Figure-alias-path-description)
1. [\@augments|extends path [description]](#Figure-augmentsextends-path-description)
1. [\@author author [&lt;email\@address>] [(http-page)] [- description]](#Figure-author-author-emailaddress-http-page---description)
1. [\@borrows thas_namepath as this_namepath [description]](#Figure-borrows-thas_namepath-as-this_namepath-description)
1. [\@class|constructor [{type}] name](#Figure-classconstructor-type-name)
1. [\@class|constructor](#Figure-classconstructor)
1. [\@constatnt|const {type} [name]](#Figure-constatntconst-type-name)
1. [\@constructs name](#Figure-constructs-name)
1. [\@constructs](#Figure-constructs)
1. [\@copyright some copyright text](#Figure-copyright-some-copyright-text)
1. [\@default|defaultvalue value](#Figure-defaultdefaultvalue-value)
1. [\@default|defaultvalue](#Figure-defaultdefaultvalue)
1. [\@deprecated some text](#Figure-deprecated-some-text)
1. [\@deprecated](#Figure-deprecated)
1. [\@description|desc|classdesc some description](#Figure-descriptiondescclassdesc-some-description)
1. [\@enum {type} [name]](#Figure-enum-type-name)
1. [\@enum](#Figure-enum)
1. [\@event event_name](#Figure-event-event_name)
1. [\@example multiline example, code, comments, etc](#Figure-example-multiline-example,-code,-comments,-etc)
1. [\@exports name](#Figure-exports-name)
1. [\@external|host name_of_external](#Figure-externalhost-name_of_external)
1. [\@file some description](#Figure-file-some-description)
1. [\@fires|emits event_name](#Figure-firesemits-event_name)
1. [\@function|func|method name](#Figure-functionfuncmethod-name)
1. [\@function|func|method](#Figure-functionfuncmethod)
1. [\@implements {type}](#Figure-implements-type)
1. [\@interface name](#Figure-interface-name)
1. [\@interface](#Figure-interface)
1. [\@created date](#Figure-created-date)
1. [\@kind class|constant|event|external|file|function|member|mixin|module|namespace|typedef](#Figure-kind-classconstanteventexternalfilefunctionmembermixinmodulenamespacetypedef)
1. [\@lends path](#Figure-lends-path)
1. [\@license identifier|standalone multiline text](#Figure-license-identifierstandalone-multiline-text)
1. [\@listens event_name](#Figure-listens-event_name)
1. [\@member|var|variable {type} [name]](#Figure-membervarvariable-type-name)
1. [\@memberof[!] name](#Figure-memberof!-name)
1. [\@mixes other_object_path](#Figure-mixes-other_object_path)
1. [\@mixin name](#Figure-mixin-name)
1. [\@mixin](#Figure-mixin)
1. [\@module name](#Figure-module-name)
1. [\@module](#Figure-module)
1. [\@namespace name](#Figure-namespace-name)
1. [\@namespace](#Figure-namespace)
1. [\@name name](#Figure-name-name)
1. [\@package {type}](#Figure-package-type)
1. [\@package name](#Figure-package-name)
1. [\@package](#Figure-package)
1. [\@private {type}](#Figure-private-type)
1. [\@private](#Figure-private)
1. [\@protected {type}](#Figure-protected-type)
1. [\@protected](#Figure-protected)
1. [\@requires module_name](#Figure-requires-module_name)
1. [\@return|returns {type} [description]](#Figure-returnreturns-type-description)
1. [\@see {\@link namepath}|namepath [description]](#Figure-see-link-namepathnamepath-description)
1. [\@since version](#Figure-since-version)
1. [\@summary description](#Figure-summary-description)
1. [\@this namePath](#Figure-this-namePath)
1. [\@throws|exception {type} [description]](#Figure-throwsexception-type-description)
1. [\@todo text describing thing to do.](#Figure-todo-text-describing-thing-to-do.)
1. [\@typedef [{type}] name](#Figure-typedef-type-name)
1. [\@tutorial {\@link path}|name](#Figure-tutorial-link-pathname)
1. [\@type {type}](#Figure-type-type)
1. [\@variation number](#Figure-variation-number)
1. [\@version version](#Figure-version-version)
1. [\@yield|yields|next [{type}] [description]](#Figure-yieldyieldsnext-type-description)
1. [\@change|changed|changelog|modified [date] [&lt;author>] [description]](#Figure-changechangedchangelogmodified-date-author-description)
1. [\@isue some description](#Figure-isue-some-description)
1. [\@figure|form name([parameters]) [description]](#Figure-figureform-nameparameters-description)
1. [\@template [{type}] name[, name, ...] [- description]](#Figure-template-type-name,-name,-...---description)
1. [\@callback name](#Figure-callback-name)
1. [\@test](#Figure-test)
1. [\@column {type} name [description]](#Figure-column-type-name-description)
1. [\@table {type} name [description]](#Figure-table-type-name-description)
1. [\@view {type} name [description]](#Figure-view-type-name-description)
1. [\@sequence|generator name [description]](#Figure-sequencegenerator-name-description)

## Figure This is root description

Top of documentary comment content.

Used in ["js","sql"]

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

## Figure \@param|arg|argument [{type}] name|[name=value] [description]

The @param tag provides the name, type, and description of a function parameter.

Used in ["js","sql"]

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

## Figure \@property|prop [{type}] name|[name=value] [description]

The @property tag is a way to easily document a list of static properties of a class, namespace or other object.

Used in ["js","sql"]

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
			],
			"names": [
				"defaults"
			]
		},
		{
			"type": "number",
			"name": "defaults.players",
			"description": "The default number of players.",
			"types": [
				"number"
			],
			"names": [
				"defaults",
				"players"
			]
		},
		{
			"type": "number",
			"name": "defaults.treasure.gold",
			"description": "How much gold the party starts with.",
			"types": [
				"number"
			],
			"names": [
				"defaults",
				"treasure",
				"gold"
			]
		}
	]
}
```

## Figure \@async

The @async tag indicates that a function is asynchronous, meaning that it was declared using the syntax async function foo() {}. Do not use this tag for other types of asynchronous functions, such as functions that provide a callback.

Used in ["js"]

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

## Figure \@generator

The @generator tag indicates that a function is a generator function, meaning that it was declared using the syntax function* foo() {}.

Used in ["js"]

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

## Figure \@global

The @global tag specifies that a symbol should appear in the documentation as a global symbol. JSDoc ignores the symbol's actual scope within the source file. This tag is especially useful for symbols that are defined locally, then assigned to a global symbol.

Used in ["js"]

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

## Figure \@hideconstructor

The @hideconstructor tag tells JSDoc that the generated documentation should not display the constructor for a class.

Used in ["js"]

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

## Figure \@ignore

The @ignore tag indicates that a symbol in your code should never appear in the documentation. This tag takes precedence over all others.

Used in ["js","sql"]

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

## Figure \@inner

Using the @inner tag will mark a symbol as an inner member of its parent symbol. This means it can be referred to by "Parent~Child".

Used in ["js"]

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

## Figure \@instance

Using the @instance tag will mark a symbol as an instance member of its parent symbol. This means it can be referred to by "Parent#Child".

Used in ["js"]

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

## Figure \@override

The @override tag indicates that a symbol overrides a symbol with the same name in a parent class.

Used in ["js","sql"]

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

## Figure \@public

The @public tag indicates that a symbol should be documented as if it were public.

Used in ["js","sql"]

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

## Figure \@readonly

The @readonly tag indicates that a symbol is intended to be read-only. Note this is for the purpose of documentation only.

Used in ["js","sql"]

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

## Figure \@static

The @static tag indicates that a symbol is contained within a parent and can be accessed without instantiating the parent.

Used in ["js"]

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

## Figure \@abstract|virtual

This member must be implemented (or overridden) by the inheritor.

Used in ["js"]

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

## Figure \@access package|private|protected|public

Specify the access level of this member (private, package-private, public, or protected).

Used in ["js"]

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

## Figure \@alias path [description]

Treat a member as if it had a different name.

Used in ["js","sql"]

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

## Figure \@augments|extends path [description]

Indicate that a symbol inherits from, and adds to, a parent symbol.

Used in ["js"]

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

## Figure \@author author [&lt;email\@address>] [(http-page)] [- description]

Identify the author of an item.

Used in ["js","sql"]

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

## Figure \@borrows thas_namepath as this_namepath [description]

This object uses something from another object.

Used in ["js","sql"]

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

## Figure \@class|constructor [{type}] name

This function is intended to be called with the "new" keyword.

Used in ["js"]

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

## Figure \@class|constructor

This function is intended to be called with the "new" keyword.

Used in ["js"]

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

## Figure \@constatnt|const {type} [name]

The @constant tag is used to mark the documentation as belonging to a symbol that is a constant.

Used in ["js","sql"]

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

## Figure \@constructs name

This function member will be the constructor for the previous class.

Used in ["js"]

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

## Figure \@constructs

This function member will be the constructor for the previous class.

Used in ["js"]

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

## Figure \@copyright some copyright text

Document some copyright information.

Used in ["js","sql"]

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

## Figure \@default|defaultvalue value

Document the default value.

Used in ["js"]

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

## Figure \@default|defaultvalue

Document the default.

Used in ["js"]

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

## Figure \@deprecated some text

Document that this is no longer the preferred way.

Used in ["js","sql"]

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

## Figure \@deprecated

Document that this is no longer the preferred way.

Used in ["js","sql"]

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

## Figure \@description|desc|classdesc some description

Describe a symbol.

Used in ["js","sql"]

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

## Figure \@enum {type} [name]

Document a collection of related properties.

Used in ["js","sql"]

Example

```
@enum {number}
```

Result

```js
{
	"enum": {
		"type": "number"
	}
}
```

## Figure \@enum

Document a collection of related properties.

Used in ["js","sql"]

Example

```
@enum
```

Result

```js
{
	"enum": true
}
```

## Figure \@event event_name

Document an event.

Used in ["js"]

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

## Figure \@example multiline example, code, comments, etc

Provide an example of how to use a documented item.

Used in ["js"]

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

## Figure \@exports name

Identify the member that is exported module.

Used in ["js"]

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

## Figure \@external|host name_of_external

Identifies an external class, namespace, or module.

Used in ["js"]

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

## Figure \@file some description

Describe a file.

Used in ["js"]

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

## Figure \@fires|emits event_name

Describe the events this method may fire.

Used in ["js"]

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

## Figure \@function|func|method name

Describe a function or method.

Used in ["js","sql"]

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

## Figure \@function|func|method

Set a function or method.

Used in ["js","sql"]

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

## Figure \@implements {type}

This symbol implements an interface.

Used in ["js"]

Example

```
@implements {Color}
```

Result

```js
{
	"implements": "Color"
}
```

## Figure \@interface name

This symbol is an interface that others can implement.

Used in ["js"]

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

## Figure \@interface

Set as interface that others can implement.

Used in ["js"]

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

## Figure \@created date

Date creation

Used in ["js","sql"]

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

## Figure \@kind class|constant|event|external|file|function|member|mixin|module|namespace|typedef

What kind of symbol is this?

Used in ["js"]

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

## Figure \@lends path

Document properties on an object literal as if they belonged to a symbol with a given name.

Used in ["js"]

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

## Figure \@license identifier|standalone multiline text

Identify the license that applies to this code.

Used in ["js","sql"]

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

## Figure \@listens event_name

List the events that a symbol listens for.

Used in ["js"]

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

## Figure \@member|var|variable {type} [name]

Document a member.

Used in ["js","sql"]

Example

```
@var {string} regexRule
```

Result

```js
{
	"variable": {
		"type": "string",
		"name": "regexRule"
	}
}
```

## Figure \@memberof[!] name

This symbol belongs to a parent symbol.

Used in ["js"]

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

## Figure \@mixes other_object_path

This object mixes in all the members from another object.

Used in ["js"]

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

## Figure \@mixin name

Document a mixin object.

Used in ["js"]

Example

```
@mixin Future
```

Result

```js
{
	"mixin": "Future"
}
```

## Figure \@mixin

Document a mixin object.

Used in ["js"]

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

## Figure \@module name

Document a module.

Used in ["js"]

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

## Figure \@module

Document a module.

Used in ["js","sql"]

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

## Figure \@namespace name

Document a namespace object.

Used in ["js"]

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

## Figure \@namespace

Set a namespace object.

Used in ["js"]

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

## Figure \@name name

Document the name of an object.

Used in ["js"]

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

## Figure \@package {type}

This symbol is meant to be package-private or named.

Used in ["js"]

Example

```
@package {MyPackage}
```

Result

```js
{
	"package": "MyPackage"
}
```

## Figure \@package name

This symbol is meant to be package-private or named.

Used in ["js","sql"]

Example

```
@package MyPackage
```

Result

```js
{
	"package": "MyPackage"
}
```

## Figure \@package

This symbol is meant to be package-private.

Used in ["js"]

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

## Figure \@private {type}

This symbol is meant to be private.

Used in ["js"]

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

## Figure \@private

This symbol is meant to be private.

Used in ["js","sql"]

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

## Figure \@protected {type}

This symbol is meant to be protected.

Used in ["js"]

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

## Figure \@protected

This symbol is meant to be protected.

Used in ["js"]

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

## Figure \@requires module_name

This file requires a module or other object, file.

Used in ["js","sql"]

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

## Figure \@return|returns {type} [description]

Document the return value of a function.

Used in ["js","sql"]

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

## Figure \@see {\@link namepath}|namepath [description]

Refer to some other documentation for more information.

Used in ["js","sql"]

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

## Figure \@since version

When was this feature added?

Used in ["js","sql"]

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

## Figure \@summary description

A shorter version of the full description.

Used in ["js","sql"]

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

## Figure \@this namePath

What does the 'this' keyword refer to here?

Used in ["js"]

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

## Figure \@throws|exception {type} [description]

Describe what errors could be thrown.

Used in ["js","sql"]

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

## Figure \@todo text describing thing to do.

Document tasks to be completed.

Used in ["js","sql"]

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

## Figure \@typedef [{type}] name

Document a custom type.

Used in ["js"]

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

## Figure \@tutorial {\@link path}|name

Insert a link to an included tutorial file.

Used in ["js","sql"]

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

## Figure \@type {type}

Document the type of an object.

Used in ["js"]

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

## Figure \@variation number

Distinguish different objects with the same name.

Used in ["js","sql"]

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

## Figure \@version version

Documents the version number of an item.

Used in ["js","sql"]

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

## Figure \@yield|yields|next [{type}] [description]

Document the value yielded by a generator function.

Used in ["js","sql"]

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

## Figure \@change|changed|changelog|modified [date] [&lt;author>] [description]

Change log of object.

Used in ["js","sql"]

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

## Figure \@isue some description

Describes the know problem in the code.

Used in ["js","sql"]

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

## Figure \@figure|form name([parameters]) [description]

Document function form.

Used in ["js"]

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

## Figure \@template [{type}] name[, name, ...] [- description]

Document class templates and his type.

Used in ["js"]

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

## Figure \@callback name

Document callback function.

Used in ["js"]

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

## Figure \@test

This symbol indicates that the function is test or testing.

Used in ["js","sql"]

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

## Figure \@column {type} name [description]

Document using or define column.

Used in ["sql"]

Example

```
@column {varchar} uniqueid unique id
@column users.name
```

Result

```js
{
	"column": [
		{
			"type": "varchar",
			"name": "uniqueid",
			"description": "unique id"
		},
		{
			"name": "users.name"
		}
	]
}
```

## Figure \@table {type} name [description]

Document using or define table.

Used in ["sql"]

Example

```
@table {ordinary} users user list with unique id, name and password
@table customers
```

Result

```js
{
	"table": [
		{
			"type": "ordinary",
			"name": "users",
			"description": "user list with unique id, name and password"
		},
		{
			"name": "customers"
		}
	]
}
```

## Figure \@view {type} name [description]

Document using or define view.

Used in ["sql"]

Example

```
@view {materialized} users user list with unique id, name and password
@view customers
```

Result

```js
{
	"view": [
		{
			"type": "materialized",
			"name": "users",
			"description": "user list with unique id, name and password"
		},
		{
			"name": "customers"
		}
	]
}
```

## Figure \@sequence|generator name [description]

Document using or define unique sequence.

Used in ["sql"]

Example

```
@sequence users_id_seq user unique id generator
```

Result

```js
{
	"sequence": [
		{
			"name": "users_id_seq",
			"description": "user unique id generator"
		}
	]
}
```