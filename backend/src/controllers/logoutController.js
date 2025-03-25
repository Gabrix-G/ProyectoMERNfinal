const logoutController={};
 
logoutController.logout = (req, res) => {
res.clearCookie("authToken");
return res.json({ message: "se cerro sesion" });
}
 
export default logoutController;