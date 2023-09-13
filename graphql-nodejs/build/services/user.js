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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../lib/db");
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { v4: uuidv4 } = require('uuid');
const JWT_SECRECT = 'SUPERSECRET';
class UserService {
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name: Name, password: Password } = payload;
            const salt = (0, node_crypto_1.randomBytes)(32).toString('hex');
            const hashedPassword = this.generateHash(salt, Password);
            const newUUID = uuidv4();
            yield db_1.prismaClient.user.create({
                data: {
                    Id: newUUID,
                    Name: Name,
                    Password: hashedPassword,
                    salt: salt,
                    todos: {
                        create: [
                            {
                                Id: uuidv4(),
                                Description: "some random desc"
                            },
                            {
                                Id: uuidv4(),
                                Description: "some random desc"
                            }
                        ]
                    }
                }
            });
            return newUUID;
        });
    }
    static getUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prismaClient.user.findUnique({ where: { Name: name } });
        });
    }
    static getUserById(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prismaClient.user.findUnique({
                where: { Id: Id }, include: {
                    todos: true
                }
            });
        });
    }
    static generateHash(salt, password) {
        const hashedPassword = (0, node_crypto_1.createHmac)('sha256', salt).update(password).digest('hex');
        return hashedPassword;
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name: Name, password: Password } = payload;
            const salt = (0, node_crypto_1.randomBytes)(32).toString('hex');
            const user = yield UserService.getUserByName(Name);
            if (!user)
                throw new Error('User not found');
            const userSalt = user.salt;
            const hashedPassword = UserService.generateHash(userSalt, Password);
            if (hashedPassword !== user.Password) {
                throw new Error("Incorrect Password");
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.Id, name: user.Name
            }, JWT_SECRECT);
            return token;
        });
    }
    static decodeToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, JWT_SECRECT);
        }
        catch (error) {
            throw new Error('User not found');
        }
    }
}
exports.UserService = UserService;
