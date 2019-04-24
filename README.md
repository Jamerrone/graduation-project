# Project Firefly
[![npm version](https://badge.fury.io/js/project-firefly.svg)](https://badge.fury.io/js/project-firefly)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a3530b42dade4a84830aafae6b910b57)](https://app.codacy.com/app/Jamerrone/graduation-project?utm_source=github.com&utm_medium=referral&utm_content=Jamerrone/graduation-project&utm_campaign=Badge_Grade_Dashboard)

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

## Output
```bash
~/Projects/usability-test
❯ firefly
 FAIL  main.css
  Properties (3)
    ✘ [20:3] ie 11 does not support 'grid-template-columns'. Consider using 'flex' or 'float' instead.
    ✘ [21:3] ie 11 does not support 'grid-template-rows'. Consider using 'flex' or 'float' instead.
    ✘ [34:3] ie 11 does not support 'object-fit'. Consider using 'background-size' with 'background-image' instead. [Note]: You could also try cropping the image.
    ✘ [35:3] ie 11 does not support 'object-position'. Consider using 'background-position' with 'background-image' instead. [Note]: You could also try cropping the image.
```