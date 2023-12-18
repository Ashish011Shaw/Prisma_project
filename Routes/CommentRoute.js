const controller = require("../Controllers/CommentController")


module.exports =[
    {
        method: 'POST',
        path: '/create-comment',
        handler: controller.createComment
    },
    {   
        method: 'GET',
        path: '/get-all-comment',
        handler: controller.fetchComment
    },
    {   
        method: 'DELETE',
        path: '/delete-comment/{id}',
        handler: controller.deleteMyComment
    }
]