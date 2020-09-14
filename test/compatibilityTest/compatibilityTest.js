const {
    KoconutArray
} = require("../../")

const sampleProcess = () => {
    const myArray = KoconutArray.of(1,2,3,4,5,6)
    
    myArray
        .filter(eachNumber => eachNumber % 2 == 0)
        .yield()
        .then(console.log)

}
sampleProcess()