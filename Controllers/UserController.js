const prisma = require("../DB/DbConfig");

const createUser = async (req, h) => {
    try {
        const { name, email, password } = req.payload;

        if (!name) {
            return h.response({ status: 404, message: "name is required" }).code(404);
        }
        if (!email) {
            return h.response({ status: 404, message: "email is required" }).code(404);
        }
        if (!password) {
            return h.response({ status: 404, message: "password is required" }).code(404);
        }

        const findUser = await prisma.User.findUnique({
            where: {
                email: email
            }
        });
        if (findUser) {
            return h.response({ status: 400, message: "User already exists" }).code(400);
        } else {
            const newUser = await prisma.User.create({
                data: { name, email, password }
            });
            return h.response({ status: 201, message: "User created successfully", data: newUser }).code(201);
        }
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error creating user" }).code(500);
    }
};


// update User
const updateUser = async (req, h) => {
    try {
        const { name, email, password } = req.payload;
        // const userId = req.params;
        const userId = Number(req.params.id);

        if (!userId) {
            return h.response({ status: 404, message: "userId is required" }).code(404);
        }
        if (!name) {
            return h.response({ status: 404, message: "name is required" }).code(404);
        }
        if (!email) {
            return h.response({ status: 404, message: "email is required" }).code(404);
        }
        if (!password) {
            return h.response({ status: 404, message: "password is required" }).code(404);
        }

        const updateUser = await prisma.User.update({
            where: {
                id: Number(userId),
            },
            data: {
                name, email, password
            }
        });
        return h.response({ status: 200, message: "User updated successfully", data: updateUser })
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error updating user", error }).code(500);
    }
}

// fetch user
const fetchUser = async (req, h) => {
    try {
        const user = await prisma.User.findMany({
            include:{
                posts:true
            }
        })
        return h.response({ success: true, status: 200, data: user })
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error getting user", error }).code(500);
    }
}

const singleUser = async (req, h) => {
    try {
        const userId = Number(req.params.id);

        // const user = await prisma.User.findFirst({
        //     where:{
        //         id:userId
        //     },
        //     include:{
        //         posts:true
        //     }
        // });

        // const user = await prisma.User.findFirst({
        //     where:{
        //         id:userId
        //     },
        //     include:{
        //         posts:{
        //          select:{
        //             title:true,
        //             comment_count:true
        //          }
        //         }
        //     }
        // });

        const user = await prisma.User.findFirst({
            where:{
                id:userId
            },
            select:{
                _count:{
                    select:{
                        posts:true,
                        Comment:true
                    }
                }
            }
        });

        return h.response({success:true, data:user})
    } catch (error) {
        console.log(error);
        return h.response({ message: "Error getting user", error }).code(500);
    }
}
module.exports = {
    createUser,
    updateUser,
    fetchUser,
    singleUser
}