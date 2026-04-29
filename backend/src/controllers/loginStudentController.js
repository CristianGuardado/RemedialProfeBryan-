import studentModel from "../models/students.js"
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config.js";

const loginStudentController =  { };

loginStudentController.login  =async (req, res) => {
    const {email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({message: "correo invalido"});
    }

    try{
        const studenFound = await studentModel.findOne({ email });

        if(!studenFound){
            return res.status(400).json({message: "Estudiante no encontrado"});
        }

        if(!studenFound.timeOut && studenFound.timeOut > Date.now()){
            return res.status(400).json({message: "Cuenta bloqueada, temporalmente"});
        }  
        
        const isMatch = await bcrypt.compare(password, studenFound.password);

        if (!isMatch) {
            studenFound,loginAttempts = (studenFound.loginAttempts || 0) + 1;

        if (studenFound.loginAttempts >= 5) {
            studenFound.timeOut = Date.now() + 5 *60 *1000;
            studenFound.loginAttempts = 0;

            await studenFound.save();

            return res
            .status(403)
            .json({ message: "Cuenta bloqueada temporalmente, intente de nuevo en 5 minutos" });
        }
        
    }

};

export default loginStudentController;