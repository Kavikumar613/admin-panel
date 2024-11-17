import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;

    // check authorized account can access dashboard
    if(!token){
        return res.status(401).send({message : "Unauthorized access. Please log in again."});
    }

    jwt.verify(token , process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message:"Token expired. Please log in again"});
        }
        req.admin = decoded;
        next();
    })
};

export {verifyToken}
