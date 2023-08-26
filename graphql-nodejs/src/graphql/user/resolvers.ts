import { prismaClient } from '../../lib/db';
const { v4: uuidv4 } = require('uuid');

const queries = {
    getUser: async () => {
        const data = await prismaClient.user.findMany({
            include: {
                todos: true
            }
        })
        return data
    }
}

const mutations = {
    createUser: async (_: any, { name }: { name: string }) => {
        const newUUID = uuidv4();
        await prismaClient.user.create({
            data: {
                Id: newUUID,
                Name: name,
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

}

export const resolvers = { queries, mutations }