import { UserId } from '../model/UserId';

export class User {
    
    private userId: UserId;
    private username: string;
    private encryptedPassword: string;

    constructor(userId: UserId, username: string, encryptedPassword: string) {
        this.userId = userId;
        this.username = username;
        this.encryptedPassword = encryptedPassword;
    }

    public getUserId(): UserId {
        return this.userId;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEncryptedPassword(): string {
        return this.encryptedPassword;
    }
}
