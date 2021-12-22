export const jewelryService = {
    query

}

const JEWELRY = 'JEWELRY_DB'

function query() {
    let jewelrys = localStorage.getItem(JEWELRY)
    if (!jewelrys || !jewelrys.length) {
        jewelrys = [
            {
                "_id": "j101",
                "img": "https://res.cloudinary.com/nofar/image/upload/v1614948568/photo-1566977744263-79e677f4e7cf_j62exs.jpg",
                "title": "Gold Ring",
                "price": 20,
                "amountInStock": 4,
                "isOnSale": true,
                "keys": ["ring", "gold"]
            },
            {
                "_id": "j102",
                "img": "https://res.cloudinary.com/nofar/image/upload/v1614948513/photo-1605084192554-c4819b9df088_kq2w3t.jpg",
                "title": "Rustic Gold Ring",
                "price": 55,
                "amountInStock": 6,
                "isOnSale": false,
                "keys": ["ring", "gold", "rural", "rustic"]
            },
            {
                "_id": "j103",
                "img": "https://res.cloudinary.com/nofar/image/upload/v1614948494/photo-1561172478-a203d9c8290e_rdkskp.jpg",
                "title": "Star Gold Earrings",
                "price": 105,
                "amountInStock": 4,
                "isOnSale": true,
                "keys": ["earring", "gold", "star"]
            },
            {
                "_id": "j104",
                "img": "https://res.cloudinary.com/nofar/image/upload/v1614948453/photo-1609242914948-c1740efdae9d_xgvwls.jpg",
                "title": "Leaf Gold Earring",
                "price": 20,
                "amountInStock": 0,
                "isOnSale": false,
                "keys": ["earring", "leaf", "gold"]
            }
        ]
    }
    return jewelrys
}