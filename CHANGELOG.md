# Koconut Release Note

<hr>
<br>

## Release **v1.0.15** 
<div style="text-align: right; font-weight : bold; color : orange">
1 Oct 2020 
</div>

### Major Features and Improvements
- New base container class `KoconutBoolean` is added. It is a child class that extends `KoconutPrimitive<boolean>` and also implements `Boolean` of typescript. All the methods of other classes that return `KoconutPrimitive<boolean>` are replcaed with it. Documentization is still being processed. Supported methods are as following.

    - `compareTo`
    - `not`
    - `and`
    - `nand`
    - `or`
    - `nor`
    - `xor`
    - `xnor`
    - `eqv`

- New processor method `retrieve` is added to container classes.  It simply processes all the chained objects and returns container instance itself. Please, have a check following example. 

    ```typescript
    const koconutBoolean = await new KoconutBoolean(true)
                                         .retrieve()
    console.log(koconutBoolean)
    // ↑ KoconutBoolean { isValidated: true, data: true }
    ```

- Return type of `equalsTo` of protocol `KoconutEquatable` is now also can be `KoconutPrimitive<boolean>` or `KoconutBoolean`.

### Known Caveats
- Following methods are deprecated.

    - `toArray` -- Commonly // `asArray` instead.
    - `toSet` -- Commonly // `asSet` instead.
    - `forEachIndexed` -- in `KoconutMap`
    - `onEachIndexed` -- in `KoconutMap`
<br>
<br>
<hr>
<br>

## Release **v1.0.14** 
<div style="text-align: right; font-weight : bold; color : orange">
21 Sep 2020
</div>

### Major Features and Improvements
- New static creator method `generate` is added to container classes. It creates a new container instance with given `count` as number of elements and the values are provided by following `generator` function block with given ordered index as an argument . Please, have a check following example.
    ```typescript

    const evenNumberArray = await KoconutArray.generate(5, i => i*2)
                                                        .yield()
    console.log(evenNumberArray)
    // ↑ [ 0, 2, 4, 6, 8 ]

    const evenNumberSet = await KoconutSet.generate(5, i => i*2)
                                                    .yield()
    console.log(evenNumberSet)
    // ↑ Set { 0, 2, 4, 6, 8 }

    const numberKeyStringValueMap = await KoconutMap.generate(
                                        5, i => [i, i.toString()]
                                                // ↑ Also can be
                                                //   new Pair(i, i.toString())
                                                //   Pair.from([i, i.toString()])
                                                //   new KoconutPair(i, i.toString())
                                                //   new Entry(i, i.toString())
                                                //   Entry.from([i, i.toString()])
                                                //   new KoconutEntry(i, i.toString())
                                    )
                                    .yield()
    console.log(numberKeyStringValueMap)
    // ↑ Map { 0 => '0', 1 => '1', 2 => '2', 3 => '3', 4 => '4' }
    ```

### Bug Fixes and Other Changes
- Mapping and filtering methods of collections with specified target destination is now propery applied to `Set` when the value is instance of
your custom class that inherits `KoconutEquatable`.
    
    Applied Methods
    - `flatMapTo`
    - `mapTo`
    - `mapNotNullTo`
    - `flatMapIndexedTo`
    - `mapIndexedTo`
    - `mapIndexedNotNullTo`
    - `filterTo`
    - `filterNotTo`
    - `filterIndexedTo`
    - `filterNotNullTo`
<br>
<br>
<hr>
<br>

## Release **v1.0.13** 
<div style="text-align: right; font-weight : bold; color : orange">
18 Sep 2020
</div>

### Currently Working on...
- I'm planning to design 2 new data container classes for sequential and parallel promise chain. Those are quite similar to `Sequence` or `Stream` in `Java` and `Kotlin`. 

### Known Caveats
- `indexed` methods of `KoconutMap` are deprecated. It is not appropriate to let it be possible to use in `Map` data structure. They'll remain until version `1.0.15`.
- Common caster methods `toArray` and `toSet` are deprecated. Instead, you can use `asArray` or `asSet`. Those have the same functionality. They'll remain until version `1.0.15`.

### Repository
- API documentation of `KoconutMap` is completed.
<br>
<br>
<hr>
<br>

## Release **v1.0.12**
<div style="text-align: right; font-weight : bold; color : orange">
14 Sep 2020
</div>

### Bug Fixes and Other Changes
- Babel@runtime is now moved to common dependencies section. I'm sorry I didn't catch that.
<br>
<br>
<hr>
<br>

## Release **v1.0.11**
<div style="text-align: right; font-weight : bold; color : orange">
12 Sep 2020
</div>

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
<br>
<br>
<hr>
<br>

## Release **v1.0.10**
<div style="text-align: right; font-weight : bold; color : orange">
10 Sep 2020
</div>

### Major Features and Improvements
- Iterative functions, such as `forEach`, `forEachIndexed`, `onEach` and `onEachIndexed` now can be interrupted with `KoconutLoopSignal.BREAK`. Of course it is still available by simple ```boolean```. To stop the iteration in the mean time, you can simply `return false` or `return KoconutLoopSignal.BREAK`. You can check [example](https://apexcaptain.github.io/Koconut/classes/KoconutArray.html#forEach) if you want to.

### Known Caveats
- [Deprecation Warning](https://github.com/ApexCaptain/Koconut/blob/master/README.md#Deprecation-Warning) functionality is now available

### Repository
- [README.md] and [CHANGELOG.md] files added.
- All the classes, methods, protocols or etc are currently being documentized and available from now on. There are still lots of work to do though... You can check'em [here](https://apexcaptain.github.io/Koconut/).

[README.md]: https://github.com/ApexCaptain/Koconut/blob/master/README.md
[CHANGELOG.md]: https://github.com/ApexCaptain/Koconut/blob/master/CHANGELOG.md
