/* jest env jest */

// we can add npm test -- --watch to run test all the time
// const { testEnvironment } = require("jest-expo/jest-preset")
import plantsReducer from './src/redux/reducers/plantsReducer'

describe('plantsReducer Test', function () {

    test('has init state', function () {
        // expect(1).toBe(1)
        const state = plantsReducer(undefined, {})
        expect(state).toHaveProperty('myPlants',[])
    })
})