const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BrandSchema = new Schema({


 sentiments: [Number]

});

// sentiments:  [
//     {
//         sentiment: {
//             type: String
//         }
//     }
// ]
// });

module.exports = Brand = mongoose.model("brand", BrandSchema);
