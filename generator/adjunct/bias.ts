import { deepFreeze } from "../helpers/deep-freeze.js"

/** A bias adjunct. */
export type BiasAdjunct =
  | "ACC"
  | "ACH"
  | "ADS"
  | "ANN"
  | "ANP"
  | "APB"
  | "APH"
  | "ARB"
  | "ATE"
  | "CMD"
  | "CNV"
  | "COI"
  | "CRP"
  | "CRR"
  | "CTP"
  | "CTV"
  | "DCC"
  | "DEJ"
  | "DES"
  | "DFD"
  | "DIS"
  | "DLC"
  | "DOL"
  | "DPB"
  | "DRS"
  | "DUB"
  | "EUH"
  | "EUP"
  | "EXA"
  | "EXG"
  | "FOR"
  | "FSC"
  | "GRT"
  | "IDG"
  | "IFT"
  | "IPL"
  | "IPT"
  | "IRO"
  | "ISP"
  | "IVD"
  | "MAN"
  | "MNF"
  | "OPT"
  | "PES"
  | "PPT"
  | "PPX"
  | "PPV"
  | "PSC"
  | "PSM"
  | "RAC"
  | "RFL"
  | "RSG"
  | "RPU"
  | "RVL"
  | "SAT"
  | "SGS"
  | "SKP"
  | "SOL"
  | "STU"
  | "TRP"
  | "VEX"

/** An array of all biases. */
export const ALL_BIAS_ADJUNCTS: readonly BiasAdjunct[] =
  /* @__PURE__ */ deepFreeze([
    "ACC",
    "ACH",
    "ADS",
    "ANN",
    "ANP",
    "APB",
    "APH",
    "ARB",
    "ATE",
    "CMD",
    "CNV",
    "COI",
    "CRP",
    "CRR",
    "CTP",
    "CTV",
    "DCC",
    "DEJ",
    "DES",
    "DFD",
    "DIS",
    "DLC",
    "DOL",
    "DPB",
    "DRS",
    "DUB",
    "EUH",
    "EUP",
    "EXA",
    "EXG",
    "FOR",
    "FSC",
    "GRT",
    "IDG",
    "IFT",
    "IPL",
    "IPT",
    "IRO",
    "ISP",
    "IVD",
    "MAN",
    "MNF",
    "OPT",
    "PES",
    "PPT",
    "PPX",
    "PPV",
    "PSC",
    "PSM",
    "RAC",
    "RFL",
    "RSG",
    "RPU",
    "RVL",
    "SAT",
    "SGS",
    "SKP",
    "SOL",
    "STU",
    "TRP",
    "VEX",
  ])

/** An object mapping from bias adjuncts to their Ithkuilic translations. */
export const BIAS_ADJUNCT_TO_ITHKUIL_MAP = /* @__PURE__ */ deepFreeze({
  ACC: "lf",
  ACH: "mçt",
  ADS: "lļ",
  ANN: "drr",
  ANP: "lst",
  APB: "řs",
  APH: "vvz",
  ARB: "xtļ",
  ATE: "ňj",
  CMD: "pļļ",
  CNV: "rrj",
  COI: "ššč",
  CRP: "gžž",
  CRR: "ňţ",
  CTP: "kšš",
  CTV: "gvv",
  DCC: "gzj",
  DEJ: "žžg",
  DES: "mřř",
  DFD: "cč",
  DIS: "kff",
  DLC: "żmm",
  DOL: "řřx",
  DPB: "ffx",
  DRS: "pfc",
  DUB: "mmf",
  EUH: "gzz",
  EUP: "vvt",
  EXA: "kçç",
  EXG: "rrs",
  FOR: "lzp",
  FSC: "žžj",
  GRT: "mmh",
  IDG: "pšš",
  IFT: "vvr",
  IPL: "vll",
  IPT: "žžv",
  IRO: "mmž",
  ISP: "lçp",
  IVD: "řřn",
  MAN: "msk",
  MNF: "pss",
  OPT: "ççk",
  PES: "ksp",
  PPT: "mll",
  PPX: "llh",
  PPV: "sl",
  PSC: "žžt",
  PSM: "nnţ",
  RAC: "kll",
  RFL: "llm",
  RSG: "msf",
  RPU: "šštļ",
  RVL: "mmļ",
  SAT: "ļţ",
  SGS: "ltç",
  SKP: "rnž",
  SOL: "ňňs",
  STU: "ļļč",
  TRP: "llč",
  VEX: "ksk",
})

/**
 * An object mapping from Ithkuilic translation of bias adjuncts to the
 * adjuncts.
 */
export const BIAS_ITHKUIL_TO_ADJUNCT_MAP = /* @__PURE__ */ deepFreeze({
  lf: "ACC",
  mçt: "ACH",
  lļ: "ADS",
  drr: "ANN",
  lst: "ANP",
  řs: "APB",
  vvz: "APH",
  xtļ: "ARB",
  ňj: "ATE",
  pļļ: "CMD",
  rrj: "CNV",
  ššč: "COI",
  gžž: "CRP",
  ňţ: "CRR",
  kšš: "CTP",
  gvv: "CTV",
  gzj: "DCC",
  žžg: "DEJ",
  mřř: "DES",
  cč: "DFD",
  kff: "DIS",
  żmm: "DLC",
  řřx: "DOL",
  ffx: "DPB",
  pfc: "DRS",
  mmf: "DUB",
  gzz: "EUH",
  vvt: "EUP",
  kçç: "EXA",
  rrs: "EXG",
  lzp: "FOR",
  žžj: "FSC",
  mmh: "GRT",
  pšš: "IDG",
  vvr: "IFT",
  vll: "IPL",
  žžv: "IPT",
  mmž: "IRO",
  lçp: "ISP",
  řřn: "IVD",
  msk: "MAN",
  pss: "MNF",
  ççk: "OPT",
  ksp: "PES",
  mll: "PPT",
  llh: "PPX",
  sl: "PPV",
  žžt: "PSC",
  nnţ: "PSM",
  kll: "RAC",
  llm: "RFL",
  msf: "RSG",
  šštļ: "RPU",
  mmļ: "RVL",
  ļţ: "SAT",
  ltç: "SGS",
  rnž: "SKP",
  ňňs: "SOL",
  ļļč: "STU",
  llč: "TRP",
  ksk: "VEX",
})

/** An object mapping from bias adjuncts to their names. */
export const BIAS_ADJUNCT_TO_NAME_MAP = /* @__PURE__ */ deepFreeze({
  ACC: "Accidental",
  ACH: "Archetypal",
  ADS: "Admissive",
  ANN: "Annunciative",
  ANP: "Anticipative",
  APB: "Approbative",
  APH: "Apprehensive",
  ARB: "Arbitrary",
  ATE: "Attentive",
  CMD: "Comedic",
  CNV: "Contensive",
  COI: "Coincidental",
  CRP: "Corruptive",
  CRR: "Corrective",
  CTP: "Contemptive",
  CTV: "Contemplative",
  DCC: "Disconcertive",
  DEJ: "Dejective",
  DES: "Desperative",
  DFD: "Diffident",
  DIS: "Dismissive",
  DLC: "Delectative",
  DOL: "Dolorous",
  DPB: "Disapprobative",
  DRS: "Derisive",
  DUB: "Dubitative",
  EUH: "Euphoric",
  EUP: "Euphemistic",
  EXA: "Exasperative",
  EXG: "Exigent",
  FOR: "Fortuitous",
  FSC: "Fascinative",
  GRT: "Gratificative",
  IDG: "Indignative",
  IFT: "Infatuative",
  IPL: "Implicative",
  IPT: "Impatient",
  IRO: "Ironic",
  ISP: "Insipid",
  IVD: "Invidious",
  MAN: "Mandatory",
  MNF: "Manifestive",
  OPT: "Optimal",
  PES: "Pessimistic",
  PPT: "Propitious",
  PPX: "Perplexive",
  PPV: "Propositive",
  PSC: "Prosaic",
  PSM: "Presumptive",
  RAC: "Reactive",
  RFL: "Reflective",
  RSG: "Resignative",
  RPU: "Repulsive",
  RVL: "Revelative",
  SAT: "Satiative",
  SGS: "Suggestive",
  SKP: "Skeptical",
  SOL: "Solicitative",
  STU: "Stupefactive",
  TRP: "Trepidative",
  VEX: "Vexative",
})

/** An object mapping from bias adjuncts to English translations of them. */
export const BIAS_ADJUNCT_TO_DESCRIPTION_MAP = /* @__PURE__ */ deepFreeze({
  ACC: "“As luck would have it...” “Fate has decided that...” “What luck!”",
  ACH: "What (a) ...!; How ...!; Boy! Did (does) X ever ...",
  ADS: "“Mm-hmm” “Uh-huh” (said as mere acknowledgement of a statement without any implied agreement with or assent to the statement)",
  ANN: "“Guess what!” or “Wait till you hear this!",
  ANP: "“I’m looking forward to this!”",
  APB: "“(That’s) OK.” “(That’s) alright/good/fine.” “Very well.” “Sure.”",
  APH: "“I’m worried...” “I’ve got a bad feeling about this...”",
  ARB: "“Yeah, whatever...”, “Ah, what the hell, I’m going ahead and...”",
  ATE: "“Well, whaddya know...” “Well, will you look at that...!” “Well, go figure...” “Who would’ve thought...?” “Well I’ll be!”",
  CMD: "“Funny!” “LOL”",
  CNV: "“I’m telling you...”, “I told you so!”, “You see?!”",
  COI: "“What a coincidence!”",
  CRP: "“How corrupt!” “What corruption!”",
  CRR: "“That is to say...,” “What I mean(t) to say is...” “I mean...”",
  CTP: "“What nonsense!” or “What bullshit!”",
  CTV: "“I wonder how...,” “that’s odd...,” “I don’t get it...,” “Hmmmm?”",
  DCC: "“I’m not sure about this.” “I don’t feel comfortable about this.” “I’m feeling out of my element here.”",
  DEJ: "“(sigh)” [of dejection/disillusionment]",
  DES: "“I don’t know how to say this, but...” “I’m afraid that...” “I’m sorry to have to tell you, but...”",
  DFD: "“Sorry, but...” “It’s nothing. It’s just...”",
  DIS: "“Is that it?” “Big deal!” “So what!?”",
  DLC: "“Whee!”",
  DOL: "“Ow!” “Ouch!”",
  DPB: "“I don’t like the fact that...” “It bothers me that...” “Unacceptable!” “I hate it!”",
  DRS: "“How foolish!” “How silly!” “Look at how ridiculous this is!”",
  DUB: "“Hmm, not likely.” “I doubt it.” “Sounds fishy to me.” “I don’t trust this/it/him/her/them...”",
  EUH: "“(Sigh) What bliss!”",
  EUP: "“Let’s just say that...” or “Well, let me put it this way...”",
  EXA: "“Dammit!” “Look, don’t you get it?...” “Look, I’m trying to tell you...”",
  EXG: "“It’s now or never!”",
  FOR: "“It’s just as well that...” or “All’s well that ends well...”",
  FSC: "“Cool!” “Wow!” “Awesome!”",
  GRT: "“Ah! What bliss...!” “Oh, there’s nothing like...” [physical pleasure only]",
  IDG: "“The nerve!” or “How dare...!?”",
  IFT: "“Praise be to...!” “Oh, thank God for...!” “There’s nothing more sacred/holy/important than...!”",
  IPL: "“Of course, ...” “After all, ...” “Needless to say, ...”",
  IPT: "“C’mon!,” “What’re you waiting for?” “So...already!” as in “So dance already!”",
  IRO: "“Oh, nice!” “Just great!” “Well, now, isn’t this lovely!”",
  ISP: "“Meh... (said due to lack of interest)” “How boring/tedious/dull!”",
  IVD: "“Why do they get to... and I don’t?!” “How unfair (that I don’t get to)!”",
  MAN: "“Take it or leave it,” “this is your last chance,”",
  MNF: "“Ah!”, “Well, now!” “So!” [Italian “Allora!” ]",
  OPT: "Prolonged “so” or “totally” as in “I so don’t care!” or “That is totally not what I meant.”",
  PES: "“Yeah, like it really matters that...” “Pfft! What’s it to me?”",
  PPT: "“It’s a wonder that” as in It’s a wonder he didn’t break a bone in that fall.",
  PPX: "“Huh? What do you mean...? What the hell? “WTF!?” “You gotta be kidding me!”",
  PPV: "“What if...” “It could be that...” “Consider this: ...” “Assume for the sake of argument that...”",
  PSC: "“Meh... (said in disappointment)” “How ordinary!”",
  PSM: "“It can only mean one thing, ...” “..., and that’s that!” “and that’s all there is to it!” “There’s no two ways about it, ...”",
  RAC: "“My goodness! “Wow!” “Amazing!”",
  RFL: "“Look at it this way...” “As I see it,...” “In my opinion...” “From my point of view...”",
  RSG: "“So much for...!” “There goes...!”",
  RPU: "“Yuck! Ew! How gross!”",
  RVL: "“No wonder...!” “So that’s why...!” “A-ha!...” “Well, well, well!...”",
  SAT: "“How satisfying...!” “At last, the pleasure of knowing/being/seeing/doing...” [psychological/emotional pleasure/satiety only]",
  SGS: "“How about...” “We could...” “Might I suggest...”",
  SKP: "“Yeah, right!” “Oh, sure! Like anyone’s supposed to believe that!”",
  SOL: "“Please”",
  STU: "“Woah!” “Holy, bejeezus!” “What the...!” “Jeez, Louise...!”",
  TRP: "“Oh, God...” “Oh, no!...” “Oh, dear!” [fear-based]",
  VEX: "“How annoying!” “What a bother!” “What a pain!”",
})

/**
 * Converts a bias adjunct to Ithkuil.
 * @param bias The adjunct to be converted.
 * @returns Romanized Ithkuilic text representing the adjunct.
 */
export function biasAdjunctToIthkuil(bias: BiasAdjunct): string {
  return BIAS_ADJUNCT_TO_ITHKUIL_MAP[bias]
}
