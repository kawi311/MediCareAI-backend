const {  } = require("firebase/firestore");
const { v4: uuidv4 } = require("uuid");
const { db } = require("../database/config");

const getAllBlogs = async (req, res) => {
    try {
        // Retrieve all blogs from Firestore collection
        const blogsRef = db.collection("blogs");
        const snapshot = await blogsRef.get();

        // Check if any blogs are found
        if (snapshot.empty) {
            return res.status(404).json({ message: "No blogs found" });
        }

        const blogs = [];

        // Iterate through each blog document and extract necessary data
        snapshot.forEach((doc) => {
            const blogData = doc.data();
            const blog = {
                postId: doc.id,
                userId: blogData.userId,
                title: blogData.title,
                photo: blogData.photo,
                tag: blogData.tag,
                content: blogData.content,
                totalCmt: blogData.totalCmt,
                totalLike: blogData.totalLike,
                postDate: blogData.postDate,
                state: blogData.state
            };
            blogs.push(blog);
        });

        // Respond with the retrieved blogs
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error getting blogs:", error);
        res.status(500).json({ message: "Failed to get blogs" });
    }
};

const getBlogById = async (req, res) => {
    const blogId = req.params.id;

    try {
        // Retrieve a specific blog by its ID
        const blogRef = db.collection("blogs").doc(blogId);
        const doc = await blogRef.get();

        // Check if the blog exists
        if (!doc.exists) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Extract necessary data from the blog document
        const blogData = doc.data();
        const blog = {
            postId: doc.id,
            userId: blogData.userId,
            title: blogData.title,
            photo: blogData.photo,
            tag: blogData.tag,
            content: blogData.content,
            totalCmt: blogData.totalCmt,
            totalLike: blogData.totalLike,
            postDate: blogData.postDate,
            state: blogData.state
        };

        // Respond with the retrieved blog
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error getting blog:", error);
        res.status(500).json({ message: "Failed to get blog" });
    }
};

const createBlog = async (req, res) => {
    try {
        // Extract blog data from request body
        const {
            userId,
            title,
            photo,
            tag,
            content,
            totalCmt,
            totalLike,
            postDate,
            state
        } = req.body;

        // Create a new blog document in Firestore
        const blogData = {
            userId,
            title,
            photo,
            tag,
            content,
            totalCmt,
            totalLike,
            postDate,
            state
        };

        const blogRef = await db.collection("blogs").add(blogData);

        // Respond with success message and the ID of the newly created blog
        res.status(201).json({ message: "Blog created successfully", postId: blogRef.id });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Failed to create blog" });
    }
};

const updateBlog = async (req, res) => {
    const blogId = req.params.id;

    try {
        // Retrieve the blog document to update
        const blogRef = db.collection("blogs").doc(blogId);
        const doc = await blogRef.get();

        // Check if the blog exists
        if (!doc.exists) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update the blog document with data from the request body
        await blogRef.update(req.body);

        // Retrieve updated blog data and respond with it
        const updatedDoc = await blogRef.get();
        const updatedBlog = {
            postId: updatedDoc.id,
            ...updatedDoc.data()
        };

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Failed to update blog" });
    }
};

const deleteBlog = async (req, res) => {
    const blogId = req.params.id;

    try {
        // Retrieve the blog document to delete
        const blogRef = db.collection("blogs").doc(blogId);
        const doc = await blogRef.get();

        // Check if the blog exists
        if (!doc.exists) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Delete the blog document
        await blogRef.delete();

        // Respond with success message
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Failed to delete blog" });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog, 
    updateBlog, 
    deleteBlog,
};
