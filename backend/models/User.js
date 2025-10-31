import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const {Schema} = mongoose

const UserSchema = new Schema(
    {
        username : {
            type : String,
            required : [true,'Please enter a username'],
            unique : true,
            trim : true,
        },
        email: {
            type: String,
            required: [true, 'Please enter an email address'],
            unique: true,
            lowercase: true,
            trim: true,
            // Basic email validation regex
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        diagnoses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Diagnosis', // References the Diagnosis model
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
)

//mongoose Pre-Save hook for password hashing
//this middleware runs *before* the user document is saved to database
UserSchema.pre('save', async function (next){
    //only hash the password if it is modified(or is new)
    if(!this.isModified('password')){
        return next();
    }

    try{
        //generate salt(recommended complexity is 10)
        const salt = await bcrypt.genSalt(10);
        //hash the password
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next(error);
    }
});

const User = mongoose.model('User',UserSchema);

export default User;