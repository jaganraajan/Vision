const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BrandSchema = new Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },

    
        name: {
            type: String,
            required: true
        },
        sentiments: {
            type: [Number]
        }
    
    
    

});



module.exports = Brand = mongoose.model("brands", BrandSchema);
