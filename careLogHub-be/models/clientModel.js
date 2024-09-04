const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({

        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },

    },
    {timestamps:true}
)

module.exports = mongoose.model("Client", clientSchema)