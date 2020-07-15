const { initSystem } = require("./plantActions")
const { INIT_SYS } = require("./plantsTypes")

// jest.mock('../../../node_modules/expo-location', () => {
//     return { coords: { latitude: '30', longitude: '30' } }
// })

// jest.mock('../../../node_modules/native-base', () => {
//     return { }
// })
describe("plant Action Test", function () {
    test('initSystem', function () {
        const action = initSystem()
        console.log('action -> ', action)
    })
})