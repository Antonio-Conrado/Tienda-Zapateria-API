import jwt from "jsonwebtoken";

const generarJWT = (usuario) => {
    const { id, rol } = usuario;
    try {
        return jwt.sign(
            { id, rol },
            process.env.JWT_SECRET,
            { expiresIn: "5d" },
        );
    } catch (error) {
        console.error("Error al generar el token JWT:", error.message);
        throw new Error("Error al generar el token JWT");
    }
};

export default generarJWT;