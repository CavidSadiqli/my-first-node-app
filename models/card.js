const fs = require('fs');
const path = require('path');

const cardPath = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'card.json'
);

class Card
{
    static addProduct(product)
    {
        product.price = parseFloat(product.price);
        fs.readFile(cardPath, (err, fileContent) => {
            let card;
            if(!err)
            {
                card = JSON.parse(fileContent);
            }
            else
            {
                card = {products : [], totalPrice : 0};
            }
            
            const product_index = card.products.findIndex(prod => prod.id == product.id);
            const existingProduct = card.products[product_index];
            if(existingProduct != undefined)
            {
                card.products[product_index].amount += 1;
            }
            else
            {
                product.amount = 1;
                card.products.push(product);
            }
            
            card.totalPrice += product.price;
            card.totalPrice = parseFloat(card.totalPrice.toFixed(2));
            fs.writeFile(cardPath, JSON.stringify(card), (err) => {
                if(err)
                {
                    console.log(err);
                }
            });
        });
    }
    static EditProductById(id, newTitle, newDescription, newImageLink, newPrice)
    {
        newPrice = parseFloat(newPrice);
        fs.readFile(cardPath, (err, fileContent) => {
            let card;
            if(!err)
            {
                card = JSON.parse(fileContent);
            }
            else
            {
                card= {products : [], totalPrice : 0};
            }
            
            const product_index = card.products.findIndex(prod => prod.id == id);
            
            if(product_index >= 0)
            {
                card.totalPrice += ((newPrice - card.products[product_index].price) * card.products[product_index].amount);
                card.totalPrice = parseFloat(card.totalPrice.toFixed(2));
                card.products[product_index].title = newTitle;
                card.products[product_index].description = newDescription;
                card.products[product_index].image_link = newImageLink;
                card.products[product_index].price = newPrice; 
            }
            else
            {
                return;
            }
            
            fs.writeFile(cardPath, JSON.stringify(card), (err) => {
                if(err)
                {
                    console.log(err);
                }
            });
        });
    }

    static DeleteProductById(id)
    {
        fs.readFile(cardPath, (err, fileContent) => {
            let card = JSON.parse(fileContent);
            const product_index = card.products.findIndex(prod => prod.id == id);
            if(product_index >= 0)
            {
                card.totalPrice -= (card.products[product_index].amount * card.products[product_index].price);
                card.totalPrice = parseFloat(card.totalPrice.toFixed(2));
                card.products.splice(product_index, 1);
            }
            else
            {
                return;
            }
            fs.writeFile(cardPath, JSON.stringify(card), (err) => {
                if(err)
                {
                    console.log(err);
                }
            });
        });
    }

    static fetchCard(CALLBACK_FUNCTION)
    {
        fs.readFile(cardPath, (err, fileContent) => {
            let card;
            if(!err)
            {
                card = JSON.parse(fileContent);
            }
            else
            {
                card= {products : [], totalPrice : 0};
            }
            CALLBACK_FUNCTION(card);
        });
    }

}

module.exports = Card;
