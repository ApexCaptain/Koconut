# <img src="ReadMeRes/logo.png" alt="Koconut Logo" width="70" height="70">Koconut : Kotlin Style Collection Lib For Node.Js 

[![npm version](https://img.shields.io/npm/v/koconut.svg?color=RED&label=Koconut&style=plastic&logo=npm)](https://www.npmjs.com/settings/ayteneve93/packages)

# Table of Contents
- [Installation](#Installation)
- [Introduction](#Introduction)
- [Documents](#Documents)

# Installation

This is [Node.js](https://nodejs.org/en/) library available through the [npm registry](https://www.npmjs.com/).

Before you install it, please [download and install Node.js](https://nodejs.org/en/download/).

Currently, [Koconut] does not require specific node version, however is is recommended to be 0.8.x or higher due to this library depends on [Promise] a lot.

Installation is done using [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

```sh
$ npm install koconut --save
```

# Introduction

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

As you can see, there's no big difference between using in JS and TS. Both examples created an 1 to 6 integer array and filtered only the even numbers.

# Documents

The full document of this library is running on [git-hub page].

### Container
- [KoconutEntry]
- [Entry]
- [KoconutPair]
- [Pair]
- [KoconutArray]
- [KoconutSet]
- [KoconutMap]
### Enum
- [KoconutLoopSignal]
### Exception
- [KoconutConflictException]
- [KoconutIndexOutOfBoundsException]
- [KoconutInvalidArgumentException]
- [KoconutNoSuchElementException]
### Protocol (Interface)
- [KoconutComparable]
- [KoconutEquatable]

# Necessity
### `OK, so... why do I need it?`

[Koconut] is promise-friendly. The basic design philsophy of this library is to use `async/await` functionality without any interruption even if whlie using iterative process. Let me give you an example.

Imagine if there are 3 different http request info. Each and every one of them has very different purpose and cannot be merged into a single requset. You want to process one by one sequentially.
```ts
const requestInfoList = [
    {
        method : "POST",
        uri : "https://myServer",
        data : {
            some : 'payload1'
        }
    },
    {
        method : "GET",
        uri : "https://myServer",
        data : {
            some : 'payload2'
        }
    },
    {
        method : "DELETE",
        uri : "https://myServer",
        data : {
            some : 'payload3'
        }
    }
]
```
Now, let's send those request with one of the most common http node.js lib, [axios](https://www.npmjs.com/package/axios).
```ts
const mainProcess = async () => {

    requestInfoList.forEach(async eachRequestInfo => {
        const eachResult = await axios(eachRequestInfo)
        console.log(eachResult) // --- [1]
    })
    console.log("Finished!") // --- [2] 

}
mainProcess()
```
Within upper example, each http request processed asynchronously. However, the result of outer `forEach` function of normal `Array` is not a [Promise], in other words it does not support [Promise] nor `async/await`. Therefore, printed message[2], which is `Finished!` will come out much earlier before any one[1] of requests is actually done.


Now, you have to come up with a different way. Maybe, after some Googling and Googleing (Like as I did), you'll find an answer just like below.


```ts
const mainProcess = async () => {

    for(const eachRequestInfo of requestInfoList) {
        const eachResult = await axios(eachRequestInfo)
        console.log(eachResult) // --- [1]
    }
    console.log("Finished!") // --- [2]

}
mainProcess()
```

# License

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

[Koconut]: https://github.com/ApexCaptain/Koconut
[git-hub page]: https://apexcaptain.github.io/Koconut/



[KoconutEntry]: https://apexcaptain.github.io/Koconut/classes/_container_base_koconutentry_.koconutentry.html
[Entry]: https://apexcaptain.github.io/Koconut/classes/_container_base_koconutentry_.entry.html
[KoconutPair]: https://apexcaptain.github.io/Koconut/classes/_container_base_koconutpair_.koconutpair.html
[Pair]: https://apexcaptain.github.io/Koconut/classes/_container_base_koconutpair_.pair.html
[KoconutArray]: https://apexcaptain.github.io/Koconut/classes/_container_collection_array_koconutarray_.koconutarray.html
[KoconutSet]: https://apexcaptain.github.io/Koconut/modules/_container_collection_set_koconutset_.html
[KoconutMap]: https://apexcaptain.github.io/Koconut/classes/_container_map_koconutmap_.koconutmap.html
[KoconutLoopSignal]: https://apexcaptain.github.io/Koconut/enums/_enum_koconutloopsignal_.koconutloopsignal.html
[KoconutConflictException]: https://apexcaptain.github.io/Koconut/classes/_exception_koconutexceptions_.koconutconflictexception.html
[KoconutIndexOutOfBoundsException]: https://apexcaptain.github.io/Koconut/classes/_exception_koconutexceptions_.koconutindexoutofboundsexception.html
[KoconutInvalidArgumentException]: https://apexcaptain.github.io/Koconut/classes/_exception_koconutexceptions_.koconutinvalidargumentexception.html
[KoconutNoSuchElementException]: https://apexcaptain.github.io/Koconut/classes/_exception_koconutexceptions_.koconutnosuchelementexception.html
[KoconutComparable]: https://apexcaptain.github.io/Koconut/interfaces/_protocol_koconutcomparable_.koconutcomparable.html
[KoconutEquatable]: https://apexcaptain.github.io/Koconut/interfaces/_protocol_koconutequatable_.koconutequatable.html

[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise