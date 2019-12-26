import { User } from '../model/User';
import { UserId } from '../model/UserId';

export interface UserRepository {

    nextIdentity(): Promise<UserId>;

    save(user: User): Promise<void>;

    findById(userId: UserId): Promise<User | null>;

    findByUsername(username: string): Promise<User | null>;

}
