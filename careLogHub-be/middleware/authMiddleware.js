// const jwtToken = require("jsonwebtoken")
//
//
// module.exports = (req,res,next) =>{
//     try{
//
//         const token = req.headers.authorization.split(' ')[1]
//         const decodedToken = jwtToken.verify(token,process.env.JWT_SECRET_KEY)    //{employeeId:validEmployeeCredentials._id} line:61 employeeController.js
//
//         req.body.employeeId = decodedToken.employeeId
//
//         next()
//     }catch(error){
//         res.json({
//             message:error.message,
//             success:false
//         })
//     }
//
//
// }




//
const jwtToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token missing or invalid.",
                success: false,
            });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwtToken.verify(token, process.env.JWT_SECRET_KEY);

        req.employeeId = decodedToken.employeeId; // Attach decoded info
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        res.status(401).json({
            message: error.message,
            success: false,
        });
    }
};
