/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

//NOTE: Must import the componenets that are NOT "connected"
import {UserHome} from './user-home'
import {AllFruit} from './fruit-all'
import {Cart} from './cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('REACT COMPONENTS', () => {
  /**
   * TESTS FOR: USER-HOME.JS COMPONENT ------------------------------------
   */

  describe('UserHome', () => {
    let userHome

    beforeEach(() => {
      userHome = shallow(<UserHome email="cody@email.com" />)
    })

    it('renders the email in an h3', () => {
      expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
    })
  })

  /**
   * TESTS FOR: FRUIT-ALL.JS COMPONENT ------------------------------------
   */
  const FRUIT = [
    {
      id: 1,
      name: 'Asian Pear',
      imgUrl: 'https://ya-webdesign.com/image/fruit-bowl-icon-png/463143.html',
      price: 0.49
    },
    {
      id: 2,
      name: 'Blood Orange',
      imgUrl: 'https://ya-webdesign.com/image/fruit-bowl-icon-png/463143.html',
      price: 0.57
    },
    {
      id: 3,
      name: 'Honey Crisp Apple',
      imgUrl: 'https://ya-webdesign.com/image/fruit-bowl-icon-png/463143.html',
      price: 0.99
    }
  ]

  // describe('AllFruit', () => {
  //   let allFruit

  //   beforeEach(() => {
  //     allFruit = shallow(<AllFruit allFruit={FRUIT} />)
  //   })

  //   it('renders the component name in h1 text', () => {
  //     expect(allFruit.find('h1').text()).to.be.equal('All Fruit')
  //   })

  // it("specifies a `key` prop on each <Article />, equal to that article's id", () => {
  //   articleListWrapper.setState({ articles: articleList });

  //   const firstMessage = articleListWrapper.find(Article).at(0);
  //   const secondMessage = articleListWrapper.find(Article).at(1);
  //   expect(Number(firstMessage.key())).to.be.equal(articleList[0].id);
  //   expect(Number(secondMessage.key())).to.be.equal(articleList[1].id);
  // });
  // })

  /**
   * TESTS FOR: FRUIT-SINGLE.JS COMPONENT ------------------------------------
   */

  /**
   * TESTS FOR: CART.JS COMPONENT ------------------------------------
   */

  describe('Cart', () => {
    let cart

    beforeEach(() => {
      cart = shallow(<Cart name="Apple" />)
    })

    xit('renders the fruit name in an h4', () => {
      expect(cart.find('h4').text()).to.be.equal('Apple')
    })
  })
})
