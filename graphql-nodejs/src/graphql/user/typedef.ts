export const typeDefs = `#graphql
    type User {
        Id:String 
        Name:String
        todos:[Todo]
    }
` 