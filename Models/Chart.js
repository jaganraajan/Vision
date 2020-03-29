const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ChartSchema = new Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },

    
        chartType: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        data: [ 
            {
             _id: false,
             name: {
                 type: String,
                 
                 },
            value: {
                type: Number,
                
            }

    }
]
        
    
    
    

});



module.exports = Chart = mongoose.model("charts", ChartSchema);
