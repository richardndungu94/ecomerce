import jwt from  "jsonwebtoken"

export const signToken = (payload:object) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: "1h" });
}
