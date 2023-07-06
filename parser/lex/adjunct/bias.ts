import { C } from "../forms.js"

/**
 * A regular expression matching bias adjuncts. Due to the simple structure of
 * bias adjuncts, these do not have any capture groups. Instead, use the entire
 * result (`match[0]`) to get the relevant information.
 */
export const biasAdjunct = /* @__PURE__ */ C.matchEntireText().compile()
