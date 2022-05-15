# eslint-plugin-mangling-friendly

**ESLint plugin for more mangling friendly code, for less bundle size**

## Feature ✨

- ESLint plugin for more mangling friendly code
- some mangling process with safe needs coding rule
- This plugin provides a restrict to accomplish the above coding rule

## Setup

```bash
npm install eslint-plugin-mangling-friendly -D # TBD
```

write your eslint config file

```javascript
// .eslintrc.js
module.exports = {
    ...,
    parser: '@typescript-eslint/parser',
    plugins: [..., 'mangling-friendly'],
    rules: [
        ...,
        'mangling-friendly/ban-underscore-prefix-on-public-field': 'warn',
        'mangling-friendly/enforce-underscore-prefix-on-private-field': 'warn',
    ]
}

```

## Rules

### ban-underscore-prefix-on-public-field

This rule bans underscore prefix on public field.
Mangling object field is effective for reducing bundle size, but this is unsafe process. Mangling only private field is the way to reduce bundle size safely. However, current mangling tool(such as terser) cannot use the type information, so it cannot know whether private or not a property is, and Hard privating with (# sharp) will provide increased bundle size because this should be transpiled for more browser support, so we should add prefix `_` on private field and should not do that on the other field.

#### examples

```javascript
class Hoge {
    private _hoge: string; // not throw warning
    public hoge: string; // not throw warning
    public _bar: string; // throw warning
    public fuga() {} // not throw warning
    public _hello() {} // throw warning
}

const obj = {
    fuga: "hoge" // not throw warning
    _bar: "hoge" // throw warning
}
```

for more examples, plz see the test.

### enforce-underscore-prefix-on-private-field

This rule enforces underscore prefix on private field.
Mangling object field is effective for reducing bundle size, but this is unsafe process. Mangling only private field is the way to reduce bundle size safely. However, current mangling tool(such as terser) cannot use the type information, so it cannot know whether private or not a property is, and Hard privating with (# sharp) will provide increased bundle size because this should be transpiled for more browser support, so we should add prefix `_` on private field and should not do that on the other field.

#### examples

```javascript
class Hoge {
    private _hoge: string; // not throw warning
    public hoge: string; // not throw warning
    private bar: string; // throw warning
    private fuga() {} // throw warning
}
```

for more examples, plz see the test.

I strongly recommend that `ban-underscore-prefix-on-public-field` and `enforce-underscore-prefix-on-private-field` are used together, and mangled with the above mangling rule. 

```
mangle: {
    properties: {
        regex: /^_/,
    }
},
```

Further optimization is possible by using the ban-computed-property-access rule (described below) to prohibit computed property access, and by making all object properties subject to minify.

### ban-computed-property-access

This rule bans computed property access. A computed property access can break minified property.

```javascript

// mangler can not minify such a fuga property as a default behavior

hoge.fuga = "fuga";
console.log(hoge.fuga);

// into

a.fuga = "fuga";
console.log(a.fuga);

// because such a output code will break with property minifying.

const hogeProp = getRandomlyHogeProperty() // return fuga or bar;
hoge.fuga = "fuga";
hoge.bar = "bar";
console.log(hoge[hogeProp]);
```

#### examples

```javascript
hoge[fuga] // throw warnings
hoge.fuga // not throw warnings
```

