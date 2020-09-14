# Koconut Release Note

## Release 1.0.11
### Bug Fixes and Other Changes
- Babel@runtime is now moved to common dependencies section. I'm sorry I didn't catch that.

## Release 1.0.11

### Bug Fixes and Other Changes
- Creation of container classes now allow `null` and also use it as default value. If the argument is omitted, it'll return an empty collection instance.
    ``` typescript
        new KoconutArray()
        KoconutArray.of()
        KoconutArray.from() // An empty array.

        new KoconutSet()
        KoconutSet.of()
        KoconutSet.from() // An empty set.

        new KoconutMap()
        KcoonutMap.of()
        KoconutMap.from() // An empty map.
    ```
    If you're using TypeScript, it is recommended to declare generic type explicitly.
    

### Repository
- README for NPM is now separated. Not very different from the original [README.md]. Since the column on NPM README is quite narrow and table of contents navigation does not work properly. I think it's because anchor links are generated differently on GitHub and NPM. I'll only leave brief introductions and examples in the NPM README.

## Release 1.0.10

### Major Features and Improvements
- Iterative functions, such as `forEach`, `forEachIndexed`, `onEach` and `onEachIndexed` now can be interrupted with `KoconutLoopSignal.BREAK`. Of course it is still available by simple ```boolean```. To stop the iteration in the mean time, you can simply `return false` or `return KoconutLoopSignal.BREAK`. You can check [example](https://apexcaptain.github.io/Koconut/classes/_container_collection_array_koconutarray_.koconutarray.html#foreach) if you want to.

### Known Caveats
- [Deprecation Warning](https://github.com/ApexCaptain/Koconut/blob/master/README.md#Deprecation-Warning) functionality is now available

### Repository
- [README.md] and [RELEASE.md] files added.
- All the classes, methods, protocols or etc are currently being documentized and available from now on. There are still lots of work to do though... You can check'em [here](https://apexcaptain.github.io/Koconut/).

[README.md]: https://github.com/ApexCaptain/Koconut/blob/master/README.md
[RELEASE.md]: https://github.com/ApexCaptain/Koconut/blob/master/RELEASE.md
