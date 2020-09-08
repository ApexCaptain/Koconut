# <img src="ReadMeRes/logo.png" alt="Koconut Logo" width="70" height="70">Koconut : Kotlin Style Collection Lib For Node.Js 

[![npm version](https://img.shields.io/npm/v/koconut.svg?color=RED&label=Koconut&style=plastic&logo=npm)](https://www.npmjs.com/settings/ayteneve93/packages)

## Table of Contents
- [Installation](#Installation)
- [Introduction](#Introduction)
- [Documents](#Documents)

## Installation

This is [Node.js](https://nodejs.org/en/) library available through the [npm registry](https://www.npmjs.com/).

Before you install it, please [download and install Node.js](https://nodejs.org/en/download/).

Currently, Koconut does not require specific node version, however is is recommended to be 0.8.x or higher due to this library
is depends on [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) a lot.

Installation is done using [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

```sh
$ npm install koconut --save
```

## Introduction

This is a node.js library for collection, a.k.a data structure. It's fully written in TypeScript, but also compatible with JavaScript application. It is 100% [Apache-2.0](https://github.com/ApexCaptain/Koconut/blob/master/LICENSE) licensed.

Here is a short example on how to use it:

### TypeScript
```ts
import {
    KoconutArray
} from "koconut"

const sampleProcess = async () => {
    const myArray = KoconutArray.of(1,2,3,4,5,6)

    const evenNumbers = await myArray
                        .filter(eachNumber => eachNumber % 2 == 0)
                        .yield()

    console.log(evenNumbers)
    // ↑ [ 2, 4, 6 ]
}
sampleProcess()
```

### JavaScript (CommonJs)
``` js
const {
    KoconutArray
} = require("koconut")

const sampleProcess = async () => {
    const myArray = KoconutArray.of(1,2,3,4,5,6)
    
    const evenNumbers = await myArray
                        .filter(eachNumber => eachNumber % 2 == 0)
                        .yield()

    console.log(evenNumbers)
    // ↑ [ 2, 4, 6 ]
}
sampleProcess()
```

As you can see, there's no big difference between usage in JS and TS. Both example created an 1 to 6 integer array and filtered only the even number.

## Documents
#### Container
- [KoconutEntry](https://apexcaptain.github.io/Koconut/classes/_container_base_koconutentry_.koconutentry.html)
- [Entry](https://apexcaptain.github.io/Koconut/classes/_container_base_koconutentry_.entry.html)
- [KoconutPair](https://apexcaptain.github.io/Koconut/classes/_container_base_koconutpair_.koconutpair.html)
- [Pair](https://apexcaptain.github.io/Koconut/classes/_container_base_koconutpair_.pair.html)
- [KoconutArray](https://apexcaptain.github.io/Koconut/classes/_container_collection_array_koconutarray_.koconutarray.html)
- [KoconutSet](https://apexcaptain.github.io/Koconut/modules/_container_collection_set_koconutset_.html)
- [KoconutMap](https://apexcaptain.github.io/Koconut/classes/_container_map_koconutmap_.koconutmap.html)
#### Enum
- [KoconutLoopSignal](https://apexcaptain.github.io/Koconut/enums/_enum_koconutloopsignal_.koconutloopsignal.html)
#### Exception
- [KoconutConflictException](https://apexcaptain.github.io/Koconut/classes/_exception_koconutexceptions_.koconutconflictexception.html)
- [KoconutIndexOutOfBoundsException](https://apexcaptain.github.io/Koconut/classes/_exception_koconutexceptions_.koconutindexoutofboundsexception.html)
- [KoconutInvalidArgumentException](https://apexcaptain.github.io/Koconut/classes/_exception_koconutexceptions_.koconutinvalidargumentexception.html)
- [KoconutNoSuchElementException](https://apexcaptain.github.io/Koconut/classes/_exception_koconutexceptions_.koconutnosuchelementexception.html)
#### Protocol (Interface)
- [KoconutComparable](https://apexcaptain.github.io/Koconut/interfaces/_protocol_koconutcomparable_.koconutcomparable.html)
- [KoconutEquatable](https://apexcaptain.github.io/Koconut/interfaces/_protocol_koconutequatable_.koconutequatable.html)