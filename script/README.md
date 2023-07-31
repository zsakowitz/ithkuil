# Script Generator

Because Ithkuil script is divided into so many characters, each character is
given a single folder to contain all of its information. That folder will have
files for each part of the character, as well as an `index.ts(x)` file which
puts the entire character together.

## JSX

To make working with SVGs easier, a custom JSX runtime has been created in
`script/jsx-runtime.ts`. It doesn't provide fancy JSX features, such as hooks,
signals, or event listeners. It's just a shortcut for HTML tags, attributes, and
children.

In essence, a JSX tag such as this...

```tsx
<g>
  <path d="..." />

  <path
    d="..."
    fill="red"
  />
</g>
```

...is just a shortcut for the equivalent code created using
`document.createElementNS`, `el.setAttribute`, and `el.appendChild`.

The TypeScript configuration will automatically import used JSX functionality
into any files that use JSX tags and are marked with a `.tsx` file extension.
