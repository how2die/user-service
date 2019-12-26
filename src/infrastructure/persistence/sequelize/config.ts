import { Model, Sequelize, UUID, STRING } from 'sequelize';

const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
    host: "postgres",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => { console.log('Database connection has been successfully established!'); })
    .catch(err => { console.log('Unable to connect to the database: ', err) });

class User extends Model {
    public id!: string;
    public username!: string;
    public password!: string;
}

User.init({
    id: {
        type: UUID,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    indexes: [
        {
            unique: true,
            name: 'unique_username',
            // @ts-ignore
            fields: [Sequelize.fn('lower', Sequelize.col('username'))]
        }
    ],
    sequelize: sequelize,
});

sequelize
    .sync()
    .then(() => { console.log('Models synced and tables ready!'); })
    .catch(() => { console.log('Error syncing models') });

export default {
    User: User
}
