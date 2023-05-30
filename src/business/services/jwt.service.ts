import { JwtPayload, sign, verify } from "jsonwebtoken";

export class JwtService {
    private SECRET_KEY: string = "13384162-95f6-4b6c-879e-1fbb54d72de1"

    createToken(payload) {
        return sign(payload, this.SECRET_KEY, { expiresIn: '1m' })
    }

    verifyToken(token: string): string | undefined | JwtPayload {
        try {
            const infoToken = verify(token, this.SECRET_KEY)
            return infoToken
        } catch (error) {
            console.log();
            return undefined
        }
    }
}