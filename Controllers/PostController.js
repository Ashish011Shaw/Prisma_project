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

        return h.response({ status: 201, message: "Post created successfully", data: newPost })

    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating post" }).code(500);
    }
};

// fetch user
const fetchPost = async (req, h) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (page <= 0) {
        page = 1
    }

    if (limit <= 0 || limit > 100) {
        limit = 10
    }

    const skip = (page - 1) * limit

    try {
        const post = await prisma.Post.findMany({
            skip: skip,
            take: limit,
            include: {
                Comment: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        });

        const totalPosts = await prisma.Post.count();
        const totalPages = Math.ceil(totalPosts / limit);

        return h.response({
            success: true, status: 200, data: post,
            meta: {
                total_Pages : totalPages,
                current_page:page,
                limit:limit
            }
        })
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error getting user", error }).code(500);
    }
}

// search posts by description afetr migration
const searchPost = async (req, h) => {
    try {
        const query = req.query.q;
        const posts = await prisma.Post.findMany({
            where: {
                description: {
                    search: query
                }
            }
        });

        return h.response({ status: 200, data: posts }).code(200);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Error while searching!", error }).code(500);
    }
}

module.exports = {
    createPost,
    fetchPost,
    searchPost
}