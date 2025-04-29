import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar
 
import clientsModel from "../models/customers.js";
import employeeModel from "../models/employee.js";
 
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";
 
 
// 1- Crear un array de funciones
const passwordRecoveryController = {};
 
passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;
 
  try {
    let userFound;
    let userType;
 
    userFound = await clientsModel.findOne({ email });
    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeeModel.findOne({ email });
      userType = "employee";
    }
 
    if (!userFound) {
      return res.json({ message: "User not found" });
    }
 
    // Generar un código de 5 digitos
    const code = Math.floor(10000 + Math.random() * 60000).toString();
 
    // generar un token
    const token = jsonwebtoken.sign(
      //1-¿qué voy a guardar?
      { email, code, userType, verfied: false },
      //2- secret key
      config.JWT.secret,
      //3- ¿Cúando expira?
      { expiresIn: "25m" }
    );
 
    res.cookie("tokenRecoveryCode", token, { maxAge: 25 * 60 * 1000 });
 
    // Enviamos el correo
    await sendEmail(
      email,
      "Password recovery Code",
      `your verification code is ${code}`,
      HTMLRecoveryEmail(code)
    );
 
    res.json({ message: "Verification code send" });
  } catch (error) {
    console.log("error" + error);
  }
};
 
////// VERIFICAR EL CODIGO QUE ME ENVIARON POR CORREO
passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;
 
  try {
    //1- Obtener el token que esta guardado en las cookies
    const token = req.cookies.tokenRecoveryCode;
 
    //2- Extraer todos los datos del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)
 
    //3- Comparar el codigo que esta guardado en el token con el codigo que el usuario escribio
    if(decoded.code !== code){
      return res.json({message: "Invalid code"});
    }
    // Marcamos el token como verificado (si es correcto)
    const newToken = jsonwebtoken.sign(
      //1- ¿Que vamos a guardas?
      {email: decoded.email, code: decoded.code, userType: decoded.userType, verfied: true},
      //2- Secret key
      config.JWT.secret,
      //3- ¿Cuando vence el token?
      {expiresIn: "25m"}
    )
 
    res.cookie("tokenRecoveryCode", newToken, {maxAge:25*60*1000})
 
    res.json({message: "Code verified successfully"});
  } catch (error) {
    console.log("error"+error)
  }
};
 
passwordRecoveryController.newPasword = async (req, res) => {
  const { newPasword } = req.body;

  try {
    //Acceder al token que esta en las cookies
        const token = req.cookies.tokenRecoveryCode

    //Decodificar
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)


    //Confirmar la variable 
    //Vamos a verificar el codigo
    if(!decoded.verfied){
      return res.json({message: "Code not verified"});
    }
    
let user;

//Encriptar la contraseña
const hashedPassword = await bcryptjs.hash(newPasword, 10)

//Guardar contraseña en base de datos
if( decoded.userType === "client" ){
  user = await clientsModel.findOneAndUpdate(
    {email},
    {password: hashedPassword},
    {new: true}
  )
}else if(decoded.userType === "employee"){
  user = await employeeModel.findOneAndUpdate(
    {email},
    {password: hashedPassword},
    {new: true}
  )
}
res.clearCookie("tokenRecoveryCode")

res.json({message: "Password update"})

  } catch (error) {
    console.log("error" + error);
  }
};
export default passwordRecoveryController;