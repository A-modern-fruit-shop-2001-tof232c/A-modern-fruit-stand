import React from 'react'

const HomePage = props => {
  const navToAllFruitPage = () => {
    props.history.push('/fruit')
  }

  return (
    <div>
      <div id="HomePageHeader">
        <h1>A Modern Fruit Stand</h1>
        <h2>for modern times</h2>
      </div>
      <div id="HomePageImageContainer">
        <img src="https://www.baldorfood.com/uploads/PhotoModel/12230/image/image248.gallery.jpg?t=1470425378" />
        <button id="HomePageShopNow" type="button" onClick={navToAllFruitPage}>
          <span>Shop Now</span>
        </button>
      </div>
    </div>
  )
}

export default HomePage
