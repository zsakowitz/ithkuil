# Developer Information

This guide has basic information about `@zsnout/ithkuil`'s architecture and how
to have a proper development environment for it. It is meant to be easy to
follow, so anybody can get started without much effort.

## Pre-pre-requisites

> If you have a terminal available and `git` is already installed, skip to
> [Pre-requisites](#pre-requisites).

Before anything else, you should have `git` installed and a terminal available.
On Mac, open the "Terminal" application. On Windows, open the "Windows Terminal"
application.

To check that `git` is installed, run this command:

```sh
git version
```

If you see a version number, Git is already installed. If you see an error,
install git through the instructions at
https://github.com/git-guides/install-git.

On Mac, you may see a popup asking you if you want to install Command Line
Tools. Press "Install" and follow the instructions on screen. It may take a few
minutes to install.

## Pre-requisites

> If you already have Node.JS and NPM installed, skip to
> [Setting Up](#setting-up).

To check if you have Node.JS and NPM installed, run these commands in your
terminal.

```sh
node -v
npm -v
```

If you get versions numbers from both, great! You can skip to
[Setting Up](#setting-up).

If you get an error from either of the commands, you'll need to install Node.JS
and NPM. An easy way to do this is through NVM, whose installation instructions
can be found at https://github.com/nvm-sh/nvm#installing-and-updating.

## Setting Up

Once you've verified that you have `git`, `node`, and `npm` installed, clone and
move into this repository by running

```sh
git clone https://github.com/zsakowitz/ithkuil
cd ithkuil
```

> If you use a visual IDE (code editor), this is the time to open the newly
> created `ithkuil` folder in your code editor.

Now, install the required packages for `ithkuil` with this command:

```sh
npm install
```

## Compiling

To compile the project, run

```sh
npm run build
```

## Experimenting

To experiment with the project, run this command in your terminal:

```sh
npm start
```

This will create a file called `playground.ts` where you can experiment with the
project. It will look somewhat like this:

```ts
import { parseWord, wordToIthkuil } from "./index.js"

/**
 * This file allows for quick experimentation with this project's functions. To
 * do so, import anything you need in the statement above and play around with
 * the imports below.
 */

// Be a tribe that works together towards a common goal.
const result1 = wordToIthkuil({
  type: "UNF/K",
  shortcut: true,
  root: "l",
  ca: { configuration: "MFS", affiliation: "COA" },
  context: "RPS",
  illocutionValidation: "DIR",
})

console.log(result1)

// me (beneficial, ergative) and you (detrimental, absolutive)
const result2 = parseWord("royež")

console.log(result2)
```

To run the file, just call

```sh
npm start
```

again.

You may modify the `playground.ts` file however you like; it will not be checked
into Git or NPM.

## Command Line Tools

To make working with this project easier, copy the contents of the `commands.sh`
file into your terminal configuration file (`~/.bashrc`, `~/.profile`,
`~/.zshrc`, etc.). It contains several utility commands that provide
abstractions over `esbuild` to help you run and debug files.

### Basic Commands

The following commands all have a similar syntax. First, write the command.
Second, write any options you want to pass to `esbuild`. Finally, write the file
name you want to compile.

- `esbuild [options] <file>` strips any TypeScript typings from the associated
  file, outputs it to disk, and echoes the output location.

- `bundle [options] <file>` strips any TypeScript typings from the associated
  file, bundles it and all of its dependencies into one file, outputs it to
  disk, and echoes the output location.

- `minify [options] <file>` strips any TypeScript typings from the associated
  file, bundles it and all of its dependencies into one file, minifies it,
  outputs it to disk, and echoes the output location.

- `copy [options] <file>` acts like `bundle`, but copies the result to your
  clipboard instead of writing it to disk.

- `run [options] <file>` runs the file locally in Node.JS.

- `serve [options] <file>` bundles the file and starts a local web server with a
  single `index.html` page that runs the provided file as JavaScript.

- `use [options] <file>` bundles the file, opens a Node.JS interactive window,
  runs the file, and places its exports into the global variable `M`.

### Compiling with `tsc`

To first compile the associated files with `tsc` before handing them off to
`esbuild`, prefix any command with `tsc ` (e.g. `tsc run index.js`). In this
case, the `[options]` argument will now refer to options passed to `tsc`, not
`esbuild`.

### Output Directory

All commands by default output their compiled files to the `$HOME/.ts_util`
directory. To change this directory, adjust the `TS_UTILITY_DIR` variable.

To ensure this directory exists, run `ensure_tmp_exists`. This helper command is
automatically called when any of the standard commands is called, and is not
needed in most situations. It additionally symlinks the current `node_modules`
folder into the `TS_UTILITY_DIR` folder.
