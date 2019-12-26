import jwt from 'jsonwebtoken';
import { Token } from '../../model/Token';
import { User } from '../../model/User';

export class TokenEncryptionService {

    private privateKey;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
    }

    async createToken(user: User): Promise<Token> {
        return new Token(jwt.sign({ userId: user.getUserId().value() }, this.privateKey));
    }

    async validateToken(token: Token): Promise<object | string> {
        return jwt.verify(token.getValue(), this.privateKey);
    }
}
