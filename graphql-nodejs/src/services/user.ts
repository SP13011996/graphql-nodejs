import { prismaClient } from "../lib/db"
import { createHmac, randomBytes } from 'node:crypto'
import JWT from 'jsonwebtoken'
const { v4: uuidv4 } = require('uuid');

const JWT_SECRECT = 'SUPERSECRET'

export interface CreateUserPayload {
    name: string
    password: string
}

export interface GetUseTokenPayload {
    name: string
    password: string
}

export class UserService {
    public static async createUser(payload: CreateUserPayload) {
        const { name: Name, password: Password } = payload
        const salt = randomBytes(32).toString('hex')
        const hashedPassword = this.generateHash(salt, Password)

        const newUUID = uuidv4();

        await prismaClient.user.create({
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
        })
        return newUUID
    }

    private static async getUserByName(name: string) {
        return await prismaClient.user.findUnique({ where: { Name: name } })
    }

    public static async getUserById(Id: string) {
        return await prismaClient.user.findUnique({
            where: { Id: Id }, include: {
                todos: true
            }
        })
    }

    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
        return hashedPassword
    }


    public static async getUserToken(payload: GetUseTokenPayload) {

        const { name: Name, password: Password } = payload
        const salt = randomBytes(32).toString('hex')
        const user = await UserService.getUserByName(Name)

        if (!user) throw new Error('User not found')

        const userSalt = user.salt
        const hashedPassword = UserService.generateHash(userSalt!, Password)

        if (hashedPassword !== user.Password) {
            throw new Error("Incorrect Password");

        }

        const token = JWT.sign({
            id: user.Id, name: user.Name
        }, JWT_SECRECT)

        return token
    }

    public static decodeToken(token: string) {
        try {
            return JWT.verify(token, JWT_SECRECT)
        } catch (error) {
            throw new Error('User not found')
        }
    }
}