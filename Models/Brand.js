const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BrandSchema = new Schema({


    
        name: {
            type: String,
            required: true
        },
        sentiments: {
            type: [Number]
        }
    
    
    

});



module.exports = Brand = mongoose.model("brand", BrandSchema);
