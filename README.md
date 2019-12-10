@dvhb/icons
===========

dvhb icons toolset

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@dvhb/icons.svg)](https://npmjs.org/package/@dvhb/icons)
[![Downloads/week](https://img.shields.io/npm/dw/@dvhb/icons.svg)](https://npmjs.org/package/@dvhb/icons)
[![License](https://img.shields.io/npm/l/@dvhb/icons.svg)](https://github.com/dvhb/icons/blob/master/package.json)
[![Travis (.org)](https://img.shields.io/travis/dvhb/icons)](https://travis-ci.org/dvhb/icons)
<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @dvhb/icons
$ dvhb-icons COMMAND
running command...
$ dvhb-icons (-v|--version|version)
@dvhb/icons/1.1.1 linux-x64 node-v12.13.1
$ dvhb-icons --help [COMMAND]
USAGE
  $ dvhb-icons COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dvhb-icons figma2svg`](#dvhb-icons-figma2svg)
* [`dvhb-icons generate`](#dvhb-icons-generate)
* [`dvhb-icons help [COMMAND]`](#dvhb-icons-help-command)

## `dvhb-icons figma2svg`

extract svg icons from figma

```
USAGE
  $ dvhb-icons figma2svg

OPTIONS
  -e, --exclude=exclude  comma separated frames for excluding
  -f, --fileId=fileId    (required) figma fileId
  -h, --help             show CLI help
  -i, --icons=icons      (required) [default: icons] icons folder
  -p, --page=page        (required) [default: Icons] figma page
  -t, --token=token      (required) figma token

EXAMPLE
  $ dvhb-icons figma2svg
```

_See code: [src/commands/figma2svg.ts](https://github.com/dvhb/icons/blob/v1.1.1/src/commands/figma2svg.ts)_

## `dvhb-icons generate`

generate react components from svg icons

```
USAGE
  $ dvhb-icons generate

OPTIONS
  -c, --components=components  (required) [default: components] components folder
  -h, --help                   show CLI help
  -i, --icons=icons            (required) [default: icons] icons folder
  -n, --native                 generate icons for react-native
  -t, --template=template      (required) [default: template] template for icon files

EXAMPLE
  $ dvhb-icons generate
```

_See code: [src/commands/generate.ts](https://github.com/dvhb/icons/blob/v1.1.1/src/commands/generate.ts)_

## `dvhb-icons help [COMMAND]`

display help for dvhb-icons

```
USAGE
  $ dvhb-icons help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
