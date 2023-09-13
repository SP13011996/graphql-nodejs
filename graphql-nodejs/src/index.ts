import express from 'express'
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloGrapqlServer } from './graphql'
import { UserService } from './services/user';

const cors = require('cors');
const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

const PORT = Number(process.env.PORT) || 8000;

const init = async () => {

    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
        res.json({ message: "Server is up and running" });
    });

    app.use(cors(corsOptions));

    app.use(
        "/graphql",
        expressMiddleware(await createApolloGrapqlServer(), {
            context: async ({ req }) => {
                const token = req.headers["token"]
                if (token) {
                    const user = UserService.decodeToken(token as string)
                    return { user }
                }
            }
        })
    );

    app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init()