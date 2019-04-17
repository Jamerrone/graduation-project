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

## Output
```bash
~/Projects/usability-test
❯ firefly -w
 FAIL  main.css
  Properties (4)
    ✘ [20:3] ie 11 does not support 'grid-template-columns'. Consider using Flexbox instead.
    ✘ [21:3] ie 11 does not support 'grid-template-rows'. Consider using Flexbox instead.
    ✘ [34:3] ie 11 does not support 'object-fit'. Try cropping the image or consider using 'background-size' instead.
    ✘ [35:3] ie 11 does not support 'object-position'. Try cropping the image or consider using 'background-position' instead.

[firefly] watching: main.css
```