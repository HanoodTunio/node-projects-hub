const Food = require("../models/foodModel")

const createFoodController = async (req, res) => {
    try {

        const { title, price, description } = req.body;
        if (!title || !price || !description) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            });
        }

        const food = await Food.create({
            title,
            price,
            description
        })


        await food.save();
        res.status(200).send({
            success: true,
            message: "Food created successfully",
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating Food"
        })
    }
}

const getFoodController = async (req, res) => {
    try {

        const id = req.params.id;
        const food = await Food.findById(id)
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            })
        }

        res.status(200).send({
            success: true,
            message: "Food found",
            food
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Food"
        })
    }
}

const updateFoodController = async (req, res) => {
    try {

        const id = req.params.id;
        const { title, description, price } = req.body;
        const food = await Food.findByIdAndUpdate(id, { title, description, price }, { new: true });

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            })
        }

        res.status(200).send({
            success: true,
            message: "Food updated",
            food
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating Food"
        })
    }
}

const deleteFoodController = async (req, res) => {
    try {

        const id = req.params.id;
        const food = await Food.findByIdAndDelete(id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Food deleted",
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleting Food"
        })
    }
}

module.exports = {
    createFoodController,
    getFoodController,
    updateFoodController,
    deleteFoodController
}