import jsonServer from 'json-server';
import {routes} from './routes.js';
import cors from "cors";

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// Добавляем дефолтных посредников (logger, static, cors и no-cache)
server.use(middlewares)

server.use(cors({credentials: true, origin: 'http://localhost:5173'}));

// Для обработки POST, PUT и PATCH необходимо использовать body-parser
server.use(jsonServer.bodyParser)
routes.forEach((route) => {
    const {handler: routeHandler, url, method} = route;

    const methodHandler = server[method.toLowerCase()].bind(server);

    methodHandler(url, (req, res) => {
        try {
            const response = routeHandler(req);
            res.status(200).jsonp(response)
        } catch (error) {
            res.status(500).jsonp(error)
        }
    })
})

server.listen(3006, () => {
    console.log('Server ready')
})