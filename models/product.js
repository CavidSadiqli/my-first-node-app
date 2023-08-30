const fs = require('fs');
const path = require('path');
const ConsoleController = require('../controllers/console');
const Database = require('../data/database');

const productPath = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'products.json'
);

function getProductsFromFile(path, CALLBACK_FUNCTION)
{
    fs.readFile(path, (err, FileContent) => {
        if(err){
            console.log(err);
            CALLBACK_FUNCTION([]);
        }
        CALLBACK_FUNCTION(JSON.parse(FileContent));
    });
}

function AddProductToFile(path, newProduct)
{
    getProductsFromFile(path, (products) => {
        const lastProduct = products[products.length - 1];
        newProduct.id = lastProduct.id + 1;
        products.push(newProduct);
        fs.writeFile(path, JSON.stringify(products), (err) => {
            if(err)
            {
                console.log(err);
            }
            else
            {
                ConsoleController.LOG_Added_Model('Product', newProduct);
            }
        });
    });
}

function EditProductInFile(path, id, newTitle, newDescription, newImageLink, newPrice)
{
    getProductsFromFile(path, (products) => {
        const product_index = products.findIndex(prod => prod.id == id);
        products[product_index].title = newTitle;
        products[product_index].description = newDescription;
        products[product_index].image_link = newImageLink;
        products[product_index].price = parseFloat(newPrice);

        fs.writeFile(path, JSON.stringify(products), (err) => {
            if(err)
            {
                console.log(err);
            }
            else
            {
                ConsoleController.LOG_Edited_Model('Product', products[product_index]);
            }
        })
    });
}
function DeleteProductFromFile(path, id)
{
    getProductsFromFile(path, (products) => {
        const product_index = products.findIndex(prod => prod.id == id);
        const the_product = products[product_index];
        products.splice(product_index,1);
        fs.writeFile(path, JSON.stringify(products), (err) => {
            if(err)
            {
                console.log(err);
            }
            else
            {
                ConsoleController.LOG_Deleted_Model('Product', the_product);
            }
        })
    });
}

function getProductsFromDatabase(CALLBACK_FUNCTION)
{
    Database.execute('SELECT * FROM products;').then(([rows, dataTypes]) => {
        CALLBACK_FUNCTION(rows);
    }).catch((err) => {
        console.log(err);
    });
}
function EditProductInDatabase(id, newTitle, newDescription, newImageLink, newPrice)
{   
    Database.execute(
        'UPDATE products SET title = ?, description = ?, price = ?, image_link = ? WHERE id = ?;', 
        [newTitle, newDescription, newPrice, newImageLink, id]
    ).catch((err) => {
        console.log(err);
    });
}
function DeleteProductFromDatabase(id)
{
    Database.execute(
        'DELETE FROM products WHERE id = ?;',
        [id]
    ).catch((err) => {
        console.log(err);
    });
}
function AddProductToDatabase(newProduct)
{
    Database.execute(
        'INSERT INTO products (title, description,image_link ,price ) VALUES(?,?,?,?);',
        [newProduct.title, newProduct.description, newProduct.image_link, newProduct.price]
    ).catch((err) => {
        console.log(err);
    })
}


class Product
{
    constructor(title, description, image_link, price) {
        this.title = title;
        this.description = description;
        this.image_link = image_link;
        this.price = parseFloat(price);
    }

    save()
    {
        AddProductToFile(productPath, this);
    }

    static fetchAll(CALLBACK_FUNCTION)
    {
        getProductsFromFile(productPath, CALLBACK_FUNCTION);
    }
    static fetchProductById(id, CALLBACK_FUNCTION)
    {
        getProductsFromFile(productPath ,(products) => {
            CALLBACK_FUNCTION(products.find(p => p.id == id))
        });
    }
    static editProductById(id, newTitle, newDescription, newImageLink, newPrice)
    {
        EditProductInFile(productPath, id, newTitle, newDescription, newImageLink, newPrice);
    }
    static deleteProductById(id)
    {
        DeleteProductFromFile(productPath ,id);
    }
}

module.exports = Product;
