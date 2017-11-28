const cart = require("./cart");
const cars = require("./data/cars");

describe("Cart Properties:", () => {
    test('test that cart is an empty array', () => {
        expect(Array.isArray(cart.cart)).toEqual(true);
        expect(cart.cart.length).toBe(0);        
    })
    test('test that the total property is 0', () => {
        expect(cart.total).toEqual(0);
    })
});
describe("Cart Methods:", () => {
    afterEach(() => {
        cart.cart = [],
        cart.total = 0;
    })
    test('to see if cart is updated when addToCart is invoked', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);

        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[1]);
        expect(cart.cart.length).toBe(2);
    })
    test('to see if total is updated when addToCart is invoked', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[2]);
        cart.addToCart(cars[8]);

        expect(cart.total).toEqual(cars[0].price + cars[2].price + cars[8].price);
    });
    test('removeFromCart removes an item from the array', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[2]);
        cart.addToCart(cars[8]);

        cart.removeFromCart(1, cars[2]);
        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[8]);
    });
    test('removeFromCart should update the price property in the cart', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[2]);
        cart.addToCart(cars[8]);

        cart.removeFromCart(0, cars[0].price);
        cart.removeFromCart(1, cars[8].price);
        expect(cart.total).toEqual(cars[2].price);
    });
    test('checkout should empty the array and reset the total to 0', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[2]);
        cart.addToCart(cars[8]);

        cart.checkout();
        expect(cart.cart.length).toEqual(0);
        expect(cart.total).toEqual(0);
    })
});
