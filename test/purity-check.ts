// This file is meant to be minified as much as possible using esbuild. If its
// output containing a nonzero amount of bytes, it means we haven't properly
// added @__PURE__ markings, as unused code should always be removed.
//
// This is especially important for Zod validators, as the Zod library itself is
// about twice as large as the `formativeToIthkuil`, `referentialToIthkuil`, and
// `adjunctToIthkuil` functions combined, so we really want to avoid bundling
// Zod when possible.

import "../index.js"
// import "../zod.js"
