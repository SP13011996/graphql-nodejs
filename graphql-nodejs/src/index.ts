import express from 'express'
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloGrapqlServer } from './graphql'

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
        expressMiddleware(await createApolloGrapqlServer())
    );

    app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init()