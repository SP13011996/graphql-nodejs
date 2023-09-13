import { prismaClient } from '../../lib/db';
import { CreateUserPayload, GetUseTokenPayload, UserService } from '../../services/user';

const queries = {
    getUser: async (_: any, __: any, context: any) => {

        /* const data = await prismaClient.user.findMany({
            include: {
                todos: true
            }
        }) */
        console.log(context)
        const data = await UserService.getUserById(context.user.id)
        return data
    },
    getUserToken: async (_: any, payload: GetUseTokenPayload) => {
        const response = await UserService.getUserToken(payload)
        return response
    }
}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const response = await UserService.createUser(payload)
        return response
    }

}

export const resolvers = { queries, mutations }