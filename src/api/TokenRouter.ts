import { Router } from 'express';
import { TokenApplicationService } from '../application/TokenApplicationService';
import { UserApplicationService } from '../application/UserApplicationService';
import { Token } from '../model/Token';

export class TokenRouter {

    private userApplicatinoService: UserApplicationService;
    private tokenApplicationService: TokenApplicationService;

    constructor(userApplicatinoService: UserApplicationService, tokenApplicationService: TokenApplicationService) {
        this.userApplicatinoService = userApplicatinoService;
        this.tokenApplicationService = tokenApplicationService;
    }

    getRouter(): Router {
        const router = Router();
        router.post('/', async (req, res) => this.loginAndCreateToken(req, res));
        router.get('/:token', async (req, res) => this.validateToken(req, res));
        return router;
    }

    private loginAndCreateToken = async (req, res) => {
        this.userApplicatinoService.validateCredentials(req.body.username, req.body.password)
            .then(user => this.tokenApplicationService.createToken(user))
            .then(token => res.status(201).send({ token: token.getValue() }))
            .catch(() => res.status(401).send("wrong username or password"));
    };

    private validateToken = async (req, res) => {
        this.tokenApplicationService.validateToken(new Token(req.params.token))
            .then(valid => res.status(200).send(valid))
            .catch(() => res.status(404).send("invalid token"));
    };
}
