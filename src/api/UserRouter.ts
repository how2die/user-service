import { Router } from 'express';
import { UserApplicationService } from '../application/UserApplicationService';
import { UserId } from '../model/UserId';

export class UserRouter {

    private userApplicationService: UserApplicationService;

    constructor(userApplicationService: UserApplicationService) {
        this.userApplicationService = userApplicationService;
    }

    getRouter(): Router {
        const router = Router();
        router.post('/', async (req, res) => this.createNewUser(req, res));
        router.get('/:id', async (req, res) => this.getUserById(req, res));
        return router;
    }

    private createNewUser = async (req, res) => {
        if (!req.body.username) {
            res.status(400).send("enter a username");
        }
        if (!req.body.password) {
            res.status(400).send("enter a password");
        }

        this.userApplicationService.findUserByUsername(req.body.username)
            .then(existing => {
                existing
                    ? res.status(409).send("username not available")
                    : this.createUser(req.body.username, req.body.password, res)
            })
            .catch(error => res.status(500).send("Error: " + error));
    }

    private createUser = async (username, password, res) =>
        this.userApplicationService.createUser(username, password)
            .then(user => res.status(201).send({ userid: user.getUserId().value(), username: user.getUsername() }))
            .catch(error => res.status(500).send("Error: " + error));

    private getUserById = async (req, res) => {
        const userId = new UserId(req.params.id)
        this.userApplicationService.getUserById(userId)
            .then(user => res.send({ userid: user.getUserId().value(), username: user.getUsername() }))
            .catch(() => res.status(404).send());
    };
}
