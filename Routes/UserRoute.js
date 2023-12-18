const controller = require("../Controllers/UserController")

module.exports = [
    {
        method: 'POST',
        path: '/signup',
        handler: controller.createUser
    },
    {
        method: 'PUT',
        path: '/update/{id}',
        handler: controller.updateUser
    },
    {
        method: 'GET',
        path: '/get-user',
        handler: controller.fetchUser
    },
    {
        method: 'GET',
        path: '/get-user/{id}',
        handler: controller.singleUser
    }
]