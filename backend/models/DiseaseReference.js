import mongoose from "mongoose";

const {Schema} = mongoose;

const DiseaseSchema = Schema({
    cropType : {
        type : String,
        required : true,
        trim : true
    },
    imageUrl: {
        type: String, //URL
        required: true 
    },
    symptoms : {
        type : String,
        required : true
    },
    cause : {
        type : String,
        required : true
    },
    prevention : {
        type : String,
        required : true
    },
    treatment : {
        type : String,
        required : true
    },
    diseaseName: { 
        type: String,
        required: true,
        unique: true 
    }
},
{ 
    // ⬅️ FIX: Explicitly set the collection name to match your database
    collection: 'DiseaseReferences' 
});

const DiseaseReference = mongoose.model('DiseaseReference', DiseaseSchema);

export default DiseaseReference;