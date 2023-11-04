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
exports.router = exports.helloProcedure = exports.tRPC = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const server_1 = require("@trpc/server");
exports.prisma = new client_1.PrismaClient();
exports.tRPC = server_1.initTRPC.create();
exports.helloProcedure = exports.tRPC.procedure.query(() => 'Hello from back');
exports.router = exports.tRPC.router({
    sayHi: exports.tRPC.procedure.query(() => 'Hello from back'),
    getUsers: exports.tRPC.procedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield exports.prisma.user.findMany({ where: { name: 'Alice' } });
            return user;
        }
        catch (e) {
            return 'Some backend error';
        }
    })),
});
