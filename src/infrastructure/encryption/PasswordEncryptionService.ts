import bcrypt from 'bcrypt';

const saltRounds = 10;

export class PasswordEncryptionService {

    async encrypt(password: string): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }

    async validate(password: string, encryptedPassword: string): Promise<void> {
        return bcrypt.compare(password, encryptedPassword).then(result => {
            if (result) {
                return;
            } else {
                throw new Error("invalid password");
            }
        })
    }
}
