import {
  ALL_AFFILIATIONS,
  ALL_CONFIGURATIONS,
  ALL_ESSENCES,
  ALL_EXTENSIONS,
  ALL_PERSPECTIVES,
  attemptGemination,
  caToIthkuil,
  geminatedCAToIthkuil,
} from "../generate/index.js"

console.log(`Note: Any geminates marked with an asterisk are Ca forms that did
not match any of Ithkuil's standard rules for geminating Ca forms and
have thus simply had their first letter duplicated. This is by no means
correct or defined. It is simply a way to mark these forms as geminates.

Ca slot              Form     Geminate    Full Ca slot
-----------------    ----     --------    -----------------`)

for (const affiliation of ALL_AFFILIATIONS) {
  for (const configuration of ALL_CONFIGURATIONS) {
    for (const essence of ALL_ESSENCES) {
      for (const extension of ALL_EXTENSIONS) {
        for (const perspective of ALL_PERSPECTIVES) {
          const result = caToIthkuil({
            affiliation,
            configuration,
            essence,
            extension,
            perspective,
          })

          const geminate = geminatedCAToIthkuil({
            affiliation,
            configuration,
            essence,
            extension,
            perspective,
          })

          console.log(
            (
              [
                affiliation == "CSL" ? "" : affiliation,
                configuration == "UPX" ? "" : configuration,
                extension == "DEL" ? "" : extension,
                perspective == "M" ? "" : perspective,
                essence == "NRM" ? "" : essence,
              ]
                .filter((x) => x)
                .join("-") || "[default Ca]"
            ).padEnd(20, " "),

            result.padEnd(8, " "),

            (attemptGemination(result) == result ?
              geminate + "*"
            : geminate
            ).padEnd(12, " "),

            [affiliation, configuration, extension, perspective, essence].join(
              "-",
            ),
          )
        }
      }
    }
  }
}
