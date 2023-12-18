const prisma = require("../DB/DbConfig");

const createPost = async (req, h) => {
    try {
        const { user_id, title, description } = req.payload;

        const newPost = await prisma.Post.create({
            data: {
                user_id: Number(user_id),
                title,
                description
            }
        });

        return h.response({status:201, message:"Post created successfully", data:newPost})

    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating post" }).code(500);
    }
};

// fetch user
const fetchPost = async (req, h) => {
    try {
        const post = await prisma.Post.findMany({
            include:{
                Comment: {
                    include:{
                        user:true
                    }
                }
            },
            orderBy:{
                id:"desc"
            }
        })
        return h.response({ success: true, status: 200, data: post })
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error getting user", error }).code(500);
    }
}
module.exports={
    createPost,
    fetchPost
}