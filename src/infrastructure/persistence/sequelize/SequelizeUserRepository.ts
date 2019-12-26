import sequelize from 'sequelize';
import uuid from 'uuid/v4';
import { User } from '../../../model/User';
import { UserId } from '../../../model/UserId';
import Model from './config';
import { UserRepository } from '../../../model/UserRepository';

export class SequelizeUserRepository implements UserRepository {

    async nextIdentity(): Promise<UserId> {
        return new UserId(uuid());
    }

    async save(user: User): Promise<void> {
        return Model.User.create({
            id: user.getUserId().value(),
            username: user.getUsername(),
            password: user.getEncryptedPassword()
        })
            .then(() => undefined);
    }

    async findByUsername(username: string): Promise<User | null> {
        return Model.User.findAll({
            limit: 1,
            where: {
                username: sequelize.where(sequelize.fn(
                    'LOWER', sequelize.col('username')), 'LIKE', '%' + username.toLowerCase() + '%')
            }
        }).then(result => {
            if (result.length < 1) {
                return null;
            } else {
                const user = result[0];
                return new User(new UserId(user.id), user.username, user.password);
            }
        });
    }

    async findById(userId: UserId): Promise<User> {
        return Model.User.findByPk(userId.value())
            .then(user =>
                new User(new UserId(user.id), user.username, user.password));
    }
}
