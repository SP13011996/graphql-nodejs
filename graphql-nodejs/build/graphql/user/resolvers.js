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
exports.resolvers = void 0;
const db_1 = require("../../lib/db");
const { v4: uuidv4 } = require('uuid');
const queries = {
    getUser: () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield db_1.prismaClient.user.findMany({
            include: {
                todos: true
            }
        });
        return data;
    })
};
const mutations = {
    createUser: (_, { name }) => __awaiter(void 0, void 0, void 0, function* () {
        const newUUID = uuidv4();
        yield db_1.prismaClient.user.create({
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
        });
        return newUUID;
    })
};
exports.resolvers = { queries, mutations };
