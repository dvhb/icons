@dvhb/icons
===========

dvhb icons toolset

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@dvhb/icons.svg)](https://npmjs.org/package/@dvhb/icons)
[![Downloads/week](https://img.shields.io/npm/dw/@dvhb/icons.svg)](https://npmjs.org/package/@dvhb/icons)
[![License](https://img.shields.io/npm/l/@dvhb/icons.svg)](https://github.com/dvhb/icons/blob/master/package.json)

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
@dvhb/icons/0.0.1 darwin-x64 node-v10.15.3
$ dvhb-icons --help [COMMAND]
USAGE
  $ dvhb-icons COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dvhb-icons figma2svg`](#dvhb-icons-figma2svg)
* [`dvhb-icons help [COMMAND]`](#dvhb-icons-help-command)

## `dvhb-icons figma2svg`

extract svg icons from figma

```
USAGE
  $ dvhb-icons figma2svg

OPTIONS
  -d, --dest=dest      (required) [default: icons] icons folder
  -f, --fileId=fileId  (required) figma fileId
  -h, --help           show CLI help
  -p, --page=page      (required) [default: Icons] figma page
  -t, --token=token    (required) figma token

EXAMPLE
  $ dvhb-icons figma2svg
```

_See code: [src/commands/figma2svg.ts](https://github.com/dvhb/icons/blob/v0.0.1/src/commands/figma2svg.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
