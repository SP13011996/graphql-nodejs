import { ApolloServer } from "@apollo/server";
import { User } from "./user";

export async function createApolloGrapqlServer() {
    const gqlserver = new ApolloServer({
        typeDefs: `            
            ${User.typeDefs}
                        
            type Todo {
                Id:String
                Description:String                
            }

            type Query{
                ${User.queries}                           
            }

            type Mutation{
                ${User.mutations}            
            }    
        `,
        resolvers: {
            Query: User.resolvers.queries,
            Mutation: User.resolvers.mutations
        }
    })

    await gqlserver.start()
    return gqlserver;
}