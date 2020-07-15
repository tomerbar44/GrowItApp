import React from 'react'
import { render } from '@testing-library/react-native'
import MainScreen from '../src/components/MainScreen/MainScreen'

describe('MainScreen component Test', function () {
   
    test('render main screen component snapshot ', function () {
      const { baseElement }= render(<MainScreen/>)
      expect(baseElement).toMatchSnapshot()
    });
  
});





  
