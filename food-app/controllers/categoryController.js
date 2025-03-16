const Category = require("../models/categoryModel")
const createCategoryController = async (req, res) => {
    try {

        const { title, imageUrl } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            });
        }

        const newCategory = new Category({
            title,
            imageUrl
        })

        await newCategory.save()
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error creating category"
        })
    }
}

const getCategoriesController = async (req, res) => {
    try {

        const id = req.params.id;
        const categories = await Category.findById(id)
        if (!categories) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid id"
            })
        }

        res.status(200).send({
            success: true,
            data: categories
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error fetching categories"
        })
    }
}


const updateCategoryController = async (req, res) => {
    try {

        const id = req.params.id;
        const { title, imageUrl } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { title, imageUrl }, { new: true })

        if (!updatedCategory) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid id"
            })
        }

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error updating category"
        })
    }
}

const deleteCategoryController = async (req, res) => {
    try {

        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id)
        if (!category) {
            res.status(400).send({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error deleting category"
        })
    }
}


module.exports = {
    createCategoryController,
    getCategoriesController,
    deleteCategoryController,
    updateCategoryController
}