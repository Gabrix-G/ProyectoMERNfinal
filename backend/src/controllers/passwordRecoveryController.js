import jsonwebtoken from "jsonwebtoken"; //tken
import "bxryptjs" //Encriptar

import clientsModel from "../models/customers.js";
import employeeModel from "../models/employee.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js"
import { config } from "../config.js";
import { assign } from "nodemailer/lib/shared";

//Crear array de funciones
const passwordRecoveryControler = {};
passwordRecoveryControler.requestCode = async (req,res)=> {
    const { email } = req.body;

    try {
        let userFound;
        let userType;

        userFound = await clientsModel.findOne({ email });
        if(userFound){
            userType = "client"
        }else
userFound = await employeeModel.findOne({ email });
userType = "emplyee";

if(!userFound){
    return res.json({message: "user not found"})
}
//Generar codigo de 5 digitos
const code = Math.floor(1000 + Math.random() * 60000).toString();
//Generar token
const token = jsonwebtoken.sign(
    //Que voy a guardar
    {email, code, userType, verified: false},
    //secret key
    config.JWT.secret,
    //cuando expira
    {expiresIn: "25m"}
)

res.cookie("tokenRecoveryCode", token, {maxAge: 25 * 60 * 1000}) 

//Enviamos el correo
await sendEmail(
    email,
    "your recovery Code",
    `your verification code is ${code}`,
    HTMLRecoveryEmail(code)
);

res.json({ message: "Verification code send" })
    } 
    catch (error) {
        console.log("error" + error);
    }
};
