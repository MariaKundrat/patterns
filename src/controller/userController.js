const express = require("express");
const router = express.Router();

class UserController {
    constructor(userService) {
        this.userService = userService;

        router.get("/", this.getAll.bind(this));
        router.post("/", this.create.bind(this));
    }

    /**
    * Get all users
    * @param {Object} req
    * @param {Object} res
    */
    async getAll(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Failed to fetch users" });
        }
    }

    /**
     * Create a new user
     * @param {Object} req
     * @param {Object} res
     */
    async create(req, res) {
        try {
            const newUser = await this.userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(400).json({ error: "Failed to create user" });
        }
    }

    /**
     * Get the router for this controller
     * @returns {Object}
     */
    getRouter() {
        return router;
    }
}

module.exports = UserController;