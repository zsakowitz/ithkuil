import * as data from "../data/index.js"
import * as generate from "../generate/index.js"
import * as gloss from "../gloss/index.js"
import * as parse from "../parse/index.js"
import * as script from "../script/index.js"
import * as ungloss from "../ungloss/index.js"
import * as zod from "../zod.js"

Object.assign(globalThis, {
  Z: {
    ...data,
    ...generate,
    ...gloss,
    ...parse,
    ...script,
    ...ungloss,
    ...zod,

    data,
    generate,
    gloss,
    parse,
    script,
    ungloss,
    zod,
  },
})
