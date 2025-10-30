import mongoose from "mongoose";

const DiagnosisSchema  = new mongoose.Schema(
    {
        //User association (for authentication)
        user : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : false,
        },
        //Image Identification
        image : {
            type : String,
            required : true,
        },
        //Primary AI result
        isHealthy : {
            type : Boolean,
            required : true,
        },
        primaryDisease : {
            type : String,
            required : true,
        },
        confidanceScore : {
            type : Number,
            required : true,
        },

        //full API Response
        fullResponse : {
            type : Schema.Types.Mixed, //Allows storage of entire flexible json object
            required : true,
        },
        timestamps : true,
    }
)

const Diagnosis = mongoose.model('Diagnosis',DiagnosisSchema);

export default Diagnosis;
