# Koconut Release Note

## Release 1.0.10

### Major Features and Improvements
- Iterative functions, such as `forEach`, `forEachIndexed`, `onEach` and `onEachIndexed` now can be interrupted with `KoconutLoopSignal.BREAK`. Of course it is still available by simple boolean. To stop the iteration in the mean time, you can simply `return false` or `return KoconutLoopSignal.BREAK`.

### Repository
- [README.md](https://github.com/ApexCaptain/Koconut/blob/master/README.md) and [RELEASE.md](https://github.com/ApexCaptain/Koconut/blob/master/RELEASE.md) added.
- All the classes, method, enum... etc are currently being documentized and available from now on. There are still lots of work to do though... You can check'em [here](https://apexcaptain.github.io/Koconut/).