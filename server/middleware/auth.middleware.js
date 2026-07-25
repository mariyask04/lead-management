import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        token = token.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token.",
        });
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        next();
    }
}