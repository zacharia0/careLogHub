// const asyncHandler = (fn) => (req,res,next) =>{
//     Promise.resolve(fn(req,res,next)).catch((error) =>{
//         res.status(500).json({error:error.message})
//     })
// }
// module.exports =  asyncHandler


const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); // Pass errors to the next middleware
};
module.exports = asyncHandler;

