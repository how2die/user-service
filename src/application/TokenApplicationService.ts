import { Token } from '../model/Token';
import { TokenEncryptionService } from '../infrastructure/encryption/TokenEncryptionService';
import { User } from '../model/User';

export class TokenApplicationService {

    private tokenEncryptionService: TokenEncryptionService;

    constructor(tokenEncryptionService: TokenEncryptionService) {
        this.tokenEncryptionService = tokenEncryptionService;
    }

    async createToken(user: User): Promise<Token> {
        return this.tokenEncryptionService.createToken(user);
    }

    async validateToken(token: Token): Promise<object | string> {
        return this.tokenEncryptionService.validateToken(token);
    }
}
