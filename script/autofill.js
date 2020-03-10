export const autofill = (inputStr, arrItems, searchTerm) => {
  //function will take in a string and an array of all possible items

  //arrayItems will be sorted, just use .sort, convert to lowercase
  // inputStr = inputStr.toLowerCase()
  //since our arrays need to be search for name element, we can do this here
  // let arrLowerCase = arrItems.map(element => element.name.toLowerCase())
  //function will search the arrayItems and return anything containing inputStr at beginning
  //filter the array to all items for which a slice of beginning to inputStr.length === inputStr
  console.log(searchTerm)
  return arrItems.filter(element => {
    const elementSlice = element[searchTerm].slice(0, inputStr.length)

    if (elementSlice.toLowerCase() === inputStr.toLowerCase()) {
      return element
    }
  })
}
