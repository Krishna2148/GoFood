// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://krishnapdbhatt:mern123@cluster0.jc6uszm.mongodb.net/gofood?retryWrites=true&w=majority'
// const mongoDB = async () => {
//     await mongoose.connect(mongoURI,{userNewUrlParser:true},async(err,result) => {
//         if (err) console.log("...",err);
    
//         else{
//             console.log("'connected ");
//             const fetched_data =await mongoose.connection.db.collection("food_items");
//             fetched_data.find({}).toArray(async function(err,data){
//                 const foodCategory  = await mongoose.connection.db.collection("foodCategory");
//                 foodCategory.find({}).toArray(function(err,catData){
//                  if(err) console.log("...",err);
//                  else{
//                 global.food_items =data;
//                 global.foodCategory =catData;

//                 }
//                 })
//             //   if(err) console.log("...",err);
//             //   else{
//             //     global.food_items =data;
//             //   }
//             })
//         }
//     });
// }

// module.exports = mongoDB;


const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://krishnapdbhatt:mern123@cluster0.jc6uszm.mongodb.net/gofood?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });

        console.log('Connected to MongoDB');

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.food_items = fetchedData;
        global.foodCategory = catData;

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = mongoDB;
