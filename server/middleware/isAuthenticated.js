import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(
        //     token
        // );
        // console.log(req.cookies);
        
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const decode =  jwt.verify(token,process.env.secret);
        // req.user = decode;
        if (!decode) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        req.user = decode.userId; 
        next();
        
    } catch (error) {
        // return res.status(403).json({ message: "Unauthorized", success: false });
        console.log(error);
        
        
    }
}

export default isAuthenticated; 