const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
.then( () => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '66a346cd7c74177f0e892617'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();     //it firstly delete all data then insert new 
//cd init // run node index.js // data was inititazed//
//then in future you want to delete data from database run this code
//then all old data wrong data delted totally
//ok