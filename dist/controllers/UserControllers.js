"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUser = void 0;
const user_1 = require("../models/user");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.User.findOne({ _id: req.userId });
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(currentUser);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hitting create user");
        const { authId } = req.body;
        const existingUser = yield user_1.User.findOne({ authId });
        if (existingUser) {
            return res.status(200).json();
        }
        const newUser = new user_1.User(req.body);
        yield newUser.save();
        res.status(200).json(newUser.toObject());
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hitting update user");
        const { name, address1, city, country } = req.body;
        const user = yield user_1.User.findById(req.userId);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.address1 = address1;
        user.city = city;
        user.country = country;
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
});
exports.updateUser = updateUser;
