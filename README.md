# Project Firefly

[![npm version](https://badge.fury.io/js/project-firefly.svg)](https://badge.fury.io/js/project-firefly)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a3530b42dade4a84830aafae6b910b57)](https://app.codacy.com/app/Jamerrone/graduation-project?utm_source=github.com&utm_medium=referral&utm_content=Jamerrone/graduation-project&utm_campaign=Badge_Grade_Dashboard)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

> A CSS Support Validator.

## Installation

You can install Project Firefly either through cloning with git or by using npm (the recommended way):

```console
npm install -g project-firefly
```

## Usage

```console
firefly <options>
```

For CLI options, use the -h (or --help) argument:

```console
firefly -h
```

```text
Usage: firefly or
       firefly [-i | --input <path>] [-e | --export <path>] [-w | --watch]
       [-j | --json] [-h | --help] [-v | --version]

Options:
   -i, --input <path>    Specify the input file path.
   -e, --export <path>   Export the generated report in JSON format.

Flags:
   -w, --watch           Rerun firefly on file change.
   -j, --json            Output firefly's report in JSON format.
   -h, --help            Output usage information.
   -v, --version         Output the version number.
```

## Configuration File

Use a JavaScript, JSON or YAML file to specify configuration information for an entire directory and all of its subdirectories. Firefly supports the following formats:

-   a `firefly` property in `package.json`
-   a `.fireflyrc` file in JSON or YAML format
-   a `.fireflyrc.json` file
-   a `.fireflyrc.yaml`, `.fireflyrc.yml`, or `.fireflyrc.js` file
-   a `firefly.config.js` file exporting a JS object

### Options

**mode**<br>
Type: `string`<br>
Default: `'default'`<br>
Modes:

-   `default` - Validate the project and output its report.
-   `export` - Export the generated report in JSON format.
-   `json` - Output Firefly's report in JSON format.
-   `watch` - Rerun Firefly on file change.

**entry**<br>
Type: `string` or `null`<br>
Default: `null`<br>

Specify the input file path. `null` will validate the entire project.

**export**<br>
Type: `object`<br>
Default: `{filename: 'report.json', path: './'}`<br>
Properties: `filename` and `path`

Specify the export path and filename using the relative syntax.

**browserslist**<br>
Type: `array`<br>
Default: `['defaults']`<br>

An array containing the project's [browserslist](https://github.com/browserslist/browserslist).

**disableFeedbackSystem**<br>
Type: `boolean`<br>
Default: `false`<br>

Whether Firefly should display the alternatives/feedback or not.

**exclude**<br>
Type: `array`<br>
Default: `['**/node_modules']`<br>

An array containing files and directories which Firefly should ignore. E.g. `['**/dist, **/node_modules']`

**ignoreAtSupports**<br>
Type: `boolean`<br>
Default: `false`<br>

Whether Firefly should ignore `@supports` declarations or not.

**ignoreVendorPrefixes**<br>
Type: `boolean`<br>
Default: `false`<br>

Whether Firefly should ignore venter prefixes or not. E.g. `-webkit-**`, `-moz-**`, etc.

## Output

```bash
~/Projects/usability-test
❯ firefly
 FAIL  bootstrap.css
  At-Rules (1)
    ✘ [8224:3] safari 12 does not support 'page'.
  Properties (16)
    ✘ [273:3] edge 17 & ie 11 does not support 'resize'.
    ✘ [300:3] ie 11 does not support 'outline-offset'.
    ✘ [633:3] ie 11 does not support 'grid-template-columns'.
    ✘ [634:3] ie 11 does not support 'grid-template-rows'.
    ✘ [3395:3] ie 11 does not support 'appearance'.
    ✘ [3493:3] ie 11 does not support 'appearance'.
    ✘ [3509:3] ie 11 does not support 'appearance'.
    ✘ [3534:3] ie 11 does not support 'appearance'.
    ✘ [3558:3] ie 11 does not support 'appearance'.
    ✘ [4114:3] ie 11 does not support 'object-fit'.
    ✘ [4244:5] firefox 65, safari_ios 11.3 & safari 12 does not support 'orphans'.
    ✘ [4245:5] firefox 65, safari_ios 11.3 & safari 12 does not support 'widows'.
    ✘ [5042:3] firefox 65 does not support 'line-break'.
    ✘ [5152:3] firefox 65 does not support 'line-break'.
    ✘ [8217:5] firefox 65, safari_ios 11.3 & safari 12 does not support 'orphans'.
    ✘ [8218:5] firefox 65, safari_ios 11.3 & safari 12 does not support 'widows'.
  Media Features (7)
    ✘ [1735:19] chrome 72, edge 17 & others does not support 'prefers-reduced-motion'.
    ✘ [2222:19] chrome 72, edge 17 & others does not support 'prefers-reduced-motion'.
    ✘ [2814:19] chrome 72, edge 17 & others does not support 'prefers-reduced-motion'.
    ✘ [2831:19] chrome 72, edge 17 & others does not support 'prefers-reduced-motion'.
    ✘ [4645:19] chrome 72, edge 17 & others does not support 'prefers-reduced-motion'.
    ✘ [4911:19] chrome 72, edge 17 & others does not support 'prefers-reduced-motion'.
    ✘ [5327:19] chrome 72, edge 17 & others does not support 'prefers-reduced-motion'.
```
