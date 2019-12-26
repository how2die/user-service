import { PasswordEncryptionService } from '../infrastructure/encryption/PasswordEncryptionService';
import { User } from '../model/User';
import { UserId } from '../model/UserId';
import { UserRepository } from '../model/UserRepository';

export class UserApplicationService {

    private passwordEncryptionService: PasswordEncryptionService;
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.passwordEncryptionService = new PasswordEncryptionService();
        this.userRepository = userRepository;
    }

    async createUser(username: string, password: string): Promise<User> {
        const nextIdentity = this.userRepository.nextIdentity();
        const encryptPassword = this.passwordEncryptionService.encrypt(password);
    
        return Promise.all([nextIdentity, encryptPassword])
            .then(data => {
                const user = new User(data[0], username.trim(), data[1]);
                return this.userRepository.save(user).then(() => user);
            });
    };

    async getUserById(userId: UserId): Promise<User> {
        return this.userRepository.findById(userId)
            .then(user => {
                if (user) {
                    return user;
                } else {
                    throw new Error("user not found with id: " + userId.value());
                }
            });
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.findByUsername(username.trim());
    }

    async validateCredentials(username: string, password: string): Promise<User> {
        return this.userRepository.findByUsername(username)
            .then(user => {
                if (!user) {
                    throw new Error("invalid username");
                } else {
                    return this.passwordEncryptionService.validate(password, user.getEncryptedPassword())
                        .then(() => user);
                }
            });
    }
}
