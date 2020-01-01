import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { SequelizeUserRepository } from './infrastructure/persistence/sequelize/SequelizeUserRepository';
import { TokenApplicationService } from './application/TokenApplicationService';
import { TokenEncryptionService } from './infrastructure/encryption/TokenEncryptionService';
import { TokenRouter } from './api/TokenRouter';
import { UserApplicationService } from './application/UserApplicationService';
import { UserRouter } from './api/UserRouter';

const port = process.env.PORT || 8080;
const privateKey = process.env.PRIVATE_KEY;

const userRepository = new SequelizeUserRepository();
const userApplicationService = new UserApplicationService(userRepository);
const userRouter = new UserRouter(userApplicationService);

const tokenEncryptionService = new TokenEncryptionService(privateKey);
const tokenApplicationService = new TokenApplicationService(tokenEncryptionService);
const tokenRouter = new TokenRouter(userApplicationService, tokenApplicationService);

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRouter.getRouter());
app.use('/api/tokens', tokenRouter.getRouter());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
