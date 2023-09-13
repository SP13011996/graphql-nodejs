"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    getUser:User,
    getUserToken(name:String,password:String):String
`;
