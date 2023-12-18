'use strict';

const Hapi = require('@hapi/hapi');
const UserRoute = require("./Routes/UserRoute")
const postRoute = require("./Routes/PostRoute")
const commentRoute = require("./Routes/CommentRoute")

const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost'
});

const init = async () => {  
    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return '<h3>Hello!</h3>';
        }
    });

    await server.route(UserRoute);
    await server.route(postRoute)
    await server.route(commentRoute)
};

init();
