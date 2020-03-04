/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllFruit} from './fruit-all'

const adapter = new Adapter()
enzyme.configure({adapter})

const FRUIT = [
  {
    name: 'Asian Pear',
    imgUrl: 'https://ya-webdesign.com/image/fruit-bowl-icon-png/463143.html',
    price: 0.49
  },
  {
    name: 'Blood Orange',
    imgUrl: 'https://ya-webdesign.com/image/fruit-bowl-icon-png/463143.html',
    price: 0.57
  },
  {
    name: 'Honey Crisp Apple',
    imgUrl: 'https://ya-webdesign.com/image/fruit-bowl-icon-png/463143.html',
    price: 0.99
  }
]

describe('AllFruit', () => {
  let allFruit

  beforeEach(() => {
    allFruit = shallow(<AllFruit allFruit={FRUIT} />)
  })

  it('renders the fruit name in an h5', () => {
    expect(allFruit.find('h5').text()).to.be.equal('Asian Pear')
  })
})
