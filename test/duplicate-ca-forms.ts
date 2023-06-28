import {
  ALL_AFFILIATIONS,
  ALL_CONFIGURATIONS,
  ALL_ESSENCES,
  ALL_EXTENSIONS,
  ALL_PERSPECTIVES,
  caToIthkuil,
  geminatedCAToIthkuil,
} from "../generator/index.js"

export function checkForDuplicateCAForms() {
  const caSlots: string[] = []

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

            if (caSlots.includes(result)) {
              console.error("Found duplicate Ca form '" + result + "'.")

              console.error("Tracing to find all instances of this Ca form...")

              for (const affiliation of ALL_AFFILIATIONS) {
                for (const configuration of ALL_CONFIGURATIONS) {
                  for (const essence of ALL_ESSENCES) {
                    for (const extension of ALL_EXTENSIONS) {
                      for (const perspective of ALL_PERSPECTIVES) {
                        const result2 = caToIthkuil({
                          affiliation,
                          configuration,
                          essence,
                          extension,
                          perspective,
                        })

                        if (result == result2) {
                          console.log(
                            {
                              affiliation,
                              configuration,
                              extension,
                              perspective,
                              essence,
                            },
                            "results in Ca form '" + result2 + "'.",
                          )
                        }
                      }
                    }
                  }
                }
              }
            } else {
              caSlots.push(result)
            }
          }
        }
      }
    }
  }

  console.log("Test passed. No duplicate Ca forms found.")
}

export function geminateAllCAs() {
  let failures = 0

  for (const affiliation of ALL_AFFILIATIONS) {
    for (const configuration of ALL_CONFIGURATIONS) {
      for (const essence of ALL_ESSENCES) {
        for (const extension of ALL_EXTENSIONS) {
          for (const perspective of ALL_PERSPECTIVES) {
            const ca = caToIthkuil({
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

            if (ca == geminate) {
              failures++

              console.log(
                "Failed to geminate",
                (
                  [
                    affiliation == "CSL" ? "" : affiliation,
                    configuration == "UPX" ? "" : configuration,
                    extension == "DEL" ? "" : extension,
                    perspective == "M" ? "" : perspective,
                    essence == "NRM" ? "" : essence,
                  ]
                    .filter(Boolean)
                    .join("-") || "[default]"
                ).padEnd(20, " "),
                [
                  affiliation,
                  configuration,
                  extension,
                  perspective,
                  essence,
                ].join("-"),
                "   (" + ca + ")",
              )
            }
          }
        }
      }
    }
  }

  if (failures == 0) {
    console.log("Passed test: all Ca forms were geminated successfully.")
  } else {
    console.log(
      "Failed test: " +
        failures +
        " Ca forms had the same form when geminated as when not geminated.",
    )
  }
}

export function checkForDuplicateGeminatedCAForms() {
  const caSlots: string[] = []

  for (const affiliation of ALL_AFFILIATIONS) {
    for (const configuration of ALL_CONFIGURATIONS) {
      for (const essence of ALL_ESSENCES) {
        for (const extension of ALL_EXTENSIONS) {
          for (const perspective of ALL_PERSPECTIVES) {
            const result = geminatedCAToIthkuil({
              affiliation,
              configuration,
              essence,
              extension,
              perspective,
            })

            if (caSlots.includes(result)) {
              console.error(
                "Found duplicate geminated Ca form '" + result + "'.",
              )

              console.error("Tracing to find all instances of this Ca form...")

              for (const affiliation of ALL_AFFILIATIONS) {
                for (const configuration of ALL_CONFIGURATIONS) {
                  for (const essence of ALL_ESSENCES) {
                    for (const extension of ALL_EXTENSIONS) {
                      for (const perspective of ALL_PERSPECTIVES) {
                        const result2 = caToIthkuil({
                          affiliation,
                          configuration,
                          essence,
                          extension,
                          perspective,
                        })

                        if (result == result2) {
                          console.log(
                            {
                              affiliation,
                              configuration,
                              extension,
                              perspective,
                              essence,
                            },
                            "results in Ca form '" + result2 + "'.",
                          )
                        }
                      }
                    }
                  }
                }
              }
            } else {
              caSlots.push(result)
            }
          }
        }
      }
    }
  }

  console.log("Test passed. No duplicate geminated Ca forms found.")
}
