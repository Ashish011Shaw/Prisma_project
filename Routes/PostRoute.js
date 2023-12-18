const controller = require("../Controllers/PostController")

module.exports=[
    {
        method: 'POST',
        path: '/create-post',
        handler: controller.createPost
    },
    {   
        method: 'GET',
        path: '/get-all-post',
        handler: controller.fetchPost
    }
]