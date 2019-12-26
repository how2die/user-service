import { User } from '../../../model/User';
import { UserId } from '../../../model/UserId';
import { UserRepository } from '../../../model/UserRepository';

export class InMemoryUserRepository implements UserRepository {

    private idGenerator: number;
    private users: Object;

    constructor() {
        this.idGenerator = 1;
        this.users = {};
    }

    async nextIdentity(): Promise<UserId> {
        let nextId = this.idGenerator++;
        return new UserId(nextId.toString());
    }

    async save(user: User): Promise<void> {
        this.users[user.getUserId().value()] = user;
    }

    async findByUsername(username: string): Promise<User> {
        for (let key of Object.keys(this.users)) {
            if (this.users[key].getUsername().toLowerCase() === username.toLowerCase()) {
                return this.users[key];
            }
        }
        return null;
    }

    async findById(userId: UserId): Promise<User> {
        return this.users[userId.value()];
    }
}
