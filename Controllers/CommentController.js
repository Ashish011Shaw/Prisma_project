const prisma = require("../DB/DbConfig");

// get all comments
const fetchComment = async (req, h) => {
    try {
        const comment = await prisma.Comment.findMany({
            include:{
                user:true,
                post:{
                    include:{
                        user:true
                    }
                }
            }
        })
        return h.response({ success: true, status: 200, data: comment })
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error getting comment", error }).code(500);
    }
}

// create comment 
const createComment = async (req, h) => {
    try {
        const { post_id, user_id, comment } = req.payload;

        // increament the comment_count by 1
        await prisma.Post.update({
            where:{
                id:Number(post_id)
            },
            data:{
                comment_count:{
                    increment:1
                }
            }
        });

        const newComment = await prisma.Comment.create({
            data:{
                post_id:Number(post_id),
                user_id:Number(user_id),
                comment
            }
        })

        return h.response({ success: true, status: 200, data: newComment })
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating comment", error }).code(500);
    }
}

// * delete comment 
const deleteMyComment = async(req,h)=>{
    try {
        const {id} = req.params;

        // find post_id
        const findPostId = await prisma.Comment.findFirst({
            where:{
                id
            }
        })
        const post_id = findPostId.post_id

       
        // increament the comment_count by 1
        await prisma.Post.update({
            where:{
                id:Number(post_id)
            },
            data:{
                comment_count:{
                    decrement:1
                }
            }
        });

        const deleteComment = await prisma.Comment.delete({
            where:{
                id
            }
        });
        return h.response({success:true, status:200, msg:"Comment deleted"}).code(200);
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error deleting comment", error }).code(500);
    }
} 
module.exports ={
    fetchComment,
    createComment,
    deleteMyComment
}