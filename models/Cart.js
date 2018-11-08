const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'cartData.json');

module.exports = class Cart {
    static addToCart(product) {
        // 1 fetch data from the file 
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if (!err) {
                // existing a file 
                cart = JSON.parse(fileContent);
            }
            // 2 analyze our carts and check it
            const record = cart.products.find(ele => ele.id === product.id)
            if (record) {
                // we have an existing product 
                // if product existing we increase it by two and also its qty
                record.qty += 1;
            } else {
                // if not we add new to the cart
                cart.products.push({
                    title: product.title,
                    id: product.id,
                    qty: 1
                });
            }
            const price = parseFloat(product.price.replace('$', ''));
            cart.totalPrice += price;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static deleteProductCart(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            // fetch products from cart file
            const allCarts = JSON.parse(fileContent);
            // find out product we will delete
            const productDel = allCarts.products.find(ele => ele.id === id);
            // our new products array after we remove product 
            const updatedCartProducts = allCarts.products.filter(ele => ele.id !== id)
            const updatedPrice = allCarts.totalPrice - parseFloat(productPrice.replace('$', '')) * productDel.qty;

            const newCart = {
                products: updatedCartProducts,
                totalPrice: updatedPrice
            }

            fs.writeFile(p, JSON.stringify(newCart), err => {
                console.log(err);
            })
        })
    }
}