"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@trpc/server/adapters/express");
const router_1 = require("./router");
const common_1 = require("./common");
const app = (0, express_1.default)();
const port = process.env.PORT || common_1.DEFAULT_PORT;
const appRouter = router_1.router;
app.use((0, cors_1.default)({ origin: true }));
app.use(common_1.ROUTES.TRPC, (0, express_2.createExpressMiddleware)({ router: appRouter }));
app.listen(port, () => {
    console.log(common_1.STARTED_APP, port);
});
