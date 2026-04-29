import { Schema, model } from "mongoose";

const studentSchema = new Schema(
    
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        career: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        loginAttempts: { type: Number, default: 0 },
        timeOut: { type: Date, default: null },
        resetPasswordToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null },
},
{
    timestamps: true,
    strict: false,
}
);
export default model("Student", studentSchema);