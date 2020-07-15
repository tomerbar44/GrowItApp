import React from 'react'
import { render } from '@testing-library/react-native'
import Loading from '../src/components/Loading/Loading'

describe('Loading component Test', function () {
   
    test('render loading component snapshot ', function () {
      const { baseElement }= render(<Loading />)
      expect(baseElement).toMatchSnapshot()
    });
  
});

