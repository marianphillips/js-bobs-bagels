const Basket2 = require("../src/basket-new.js")

const small = 5
const medium = 10
const large = 15

describe("Basket2", () => {
  let basket

  beforeEach(() => {
    basket = new Basket2()
  })

  
  it("new basket is empty array", () => {
    const expected = []
    expect(basket.items).toEqual(expected)
  })

  it("add items to basket", () => {
    const expected = [{
      "sku": "BGLO",
      "price": "0.49",
      "name": "Bagel",
      "variant": "Onion",
      "quantity": 1
    }]
    basket.add("BGLO")
    expect(basket.items).toEqual(expected)
  })

  it("cannot add item that is not in inventory", () => {
    const expected = "We do not stock this item"
    expect(basket.add("Snot Bagel")).toEqual(expected)
  })

  it("add existing items to basket", () => {
    const expected = [{
      "sku": "BGLO",
      "price": "0.49",
      "name": "Bagel",
      "variant": "Onion",
      "quantity": 3  
    }]
    basket.add("BGLO")
    basket.add("BGLO")
    expect(basket.add("BGLO")).toEqual("This item is already in your basket")
    expect(basket.items).toEqual(expected)
  })

  it("add existing items to basket", () => {
    const expected = [{
      "sku": "BGLS",
      "price": "0.49",
      "name": "Bagel",
      "variant": "Sesame",
      "quantity": 2  
    }]
    basket.add("BGLS", 2)
    expect(basket.items).toEqual(expected)
  })

  it("remove item with quantity of 1 in basket", () => {
    const expected = [{
      "sku": "BGLS",
      "price": "0.49",
      "name": "Bagel",
      "variant": "Sesame",
      "quantity": 1
    }]
    basket.add("BGLO")
    basket.add("BGLS")
    basket.remove("BGLO")
    //if change BGLO to BGLP tests work? added BGLO from before? 
    expect(basket.items).toEqual(expected)
  })


  it("remove items when more than one in basket", () => {
    const expected = [{
      "sku": "BGLS",
      "price": "0.49",
      "name": "Bagel",
      "variant": "Sesame",
      "quantity": 2
    }]
    basket.add("BGLS")
    basket.add("BGLS")
    basket.add("BGLS")
    basket.remove("BGLS")
    expect(basket.items).toEqual(expected)
  })


  it("know if full and not full", () => {
    basket.add("BGLO")
    basket.add("BGLS")
    expect(basket.isFull()).toEqual(false)
  })

  it("know if full and is full", () => {
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLS")
    basket.add("BGLS")
    //when console log out 2 bglo still full
    expect(basket.isFull()).toEqual(true)
    expect(basket.totalItemsInBasket()).toEqual(5)
  })

  it("know if basket is full so cannot add items", () => {
    const expected = "You cannot add more items, your basket is full"
    basket.add("BGLO")
    basket.add("BGLS")
    basket.add("BGLO")
    basket.add("BGLS")
    basket.add("BGLO")
    expect(basket.add("BGLO")).toEqual(expected)
    expect(basket.totalItemsInBasket()).toEqual(5)
  })

  it("change basket size", () => {
    basket.add("BGLO")
    basket.add("BGLS")
    basket.add("BGLO")
    basket.add("BGLS")
    basket.add("BGLO")
    basket.changeBasketSize(medium)
    basket.add("BGLS")
    basket.add("BGLO")
    expect(basket.totalItemsInBasket()).toEqual(7)
    expect(basket.size).toEqual(10)
  })

  it("cannot change basket size to random", () => {
    expect(basket.changeBasketSize(250)).toEqual(`Pick small, medium or large`)
    expect(basket.size).toEqual(5)
  })

  it("change basket size", () => {
    const expected = `Pick a basket bigger than 7`
    basket.add("BGLO")
    basket.add("BGLS")
    basket.add("BGLO")
    basket.add("BGLS")
    basket.add("BGLO")
    basket.changeBasketSize(medium)
    basket.add("BGLS")
    basket.add("BGLO")
    expect(basket.changeBasketSize(small)).toEqual(expected)
    expect(basket.size).toEqual(10)
  
  })


  it("cannot remove items that are not in basket", () => {
    const expected = "You cannot remove items that are not in your basket"
    basket.add("BGLO")
    basket.add("BGLS")
    basket.remove("BBB")
    expect(basket.remove("BBB")).toEqual(expected)
  })

  it("check if item exists in basket, not there", () => {
    basket.add("BGLO")
    basket.add("BGLS")
    expect(basket.howManyOfItem("BGLW")).toEqual(0)
  })

  it("check if item exists in basket, one is there", () => {
    basket.add("BGLO")
    basket.add("BGLS")
    //says 3 there when should be one
    expect(basket.howManyOfItem("BGLO")).toEqual(1)
  })

  it("check price of basket", () => {
    basket.add("BGLO")
    basket.add("BGLS")
    basket.add("BGLO")
    basket.add("BGLS")
    //BGLO changes to BGLE and outcome mwent from 3.43 to 2.45
    expect(basket.priceOfBasket()).toEqual(1.96)
  })

  it("check price of item", () => {
    expect(basket.priceOfBagel("BGLO")).toEqual("0.49")
  })

  it("check special offer on onion bagels by itself", () => {
    basket.changeBasketSize(medium)
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    expect(basket.priceOfBasket()).toEqual(2.49)
  })

  it("check special offer on plain bagels itself", () => {
    basket.changeBasketSize(large)
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    basket.add("BGLP")
    expect(basket.priceOfBasket()).toEqual(3.99)
  })

  it("check special offer on everything bagels itself", () => {
    basket.changeBasketSize(medium)
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    expect(basket.priceOfBasket()).toEqual(2.49)
  })

  it("check two special offer deals together", () => {
    basket.changeBasketSize(large)
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    expect(basket.priceOfBasket()).toEqual(4.98)
  })

  it("check two of samespecial offer deals together", () => {
    basket.changeBasketSize(large)
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    expect(basket.priceOfBasket()).toEqual(4.98)
  })

  it("check bagel coffee offerr", () => {
    basket.add("BGLP")
    basket.add("COF")
    expect(basket.priceOfBasket()).toEqual(1.25)
  })

  it("2 bagel coffee offers", () => {
    basket.add("BGLP")
    basket.add("COF")
    basket.add("BGLP")
    basket.add("COF")
    expect(basket.priceOfBasket()).toEqual(2.50)
  })

  it("check bagel coffee offer with another offer ", () => {
    basket.changeBasketSize(medium)
    basket.add("BGLE")
    basket.add("COF")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLE")
    basket.add("BGLP") 
    expect(basket.priceOfBasket()).toEqual(3.74)
  })

  it("check special offer plus extra", () => {
    // set up
    // const expected = "You cannot remove items that are not in your basket"
    // execute
    // const result = todoList.create("turn the heating on!")
    // verify
    basket.changeBasketSize(medium)
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    basket.add("BGLO")
    expect(basket.priceOfBasket()).toEqual(3.47)
  })



})