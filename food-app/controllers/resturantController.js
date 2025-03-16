const Restaurant = require("../models/resturantModel");

const createRestaurantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount
        } = req.body;

        // Validation
        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Title is required",
            });
        }

        // Create restaurant
        const newRestaurant = new Restaurant({
            title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount
        });

        await newRestaurant.save();

        res.status(201).send({
            success: true,
            message: "Restaurant created successfully",
            restaurant: newRestaurant
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating Restaurant API",
        });
    }
};

const getRestaurantController = async (req, res) => {
    try {

        const restaurants = await Restaurant.find({})
        if (!restaurants) {
            return res.status(404).send({
                success: false,
                message: "No restaurants found",
            })
        }

        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Restaurant API",
        })
    }
}

const getRestaurantByIDController = async (req, res) => {
    try {

        const id = req.params.id
        const restaurant = await Restaurant.findById(id)
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant not found",
            })
        }

        res.status(200).send({
            success: true,
            restaurant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting specific Restaurant",
        })
    }
}

const deleteRestaurantByIDController = async (req, res) => {
    try {

        const id = req.params.id
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Restaurant ID is required",
            })
        }
        const restaurant = await Restaurant.findByIdAndDelete(id)
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant not found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Restaurant deleted successfully",
            restaurant
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleting Restaurant",
        })
    }
}

module.exports = {
    createRestaurantController,
    getRestaurantController,
    getRestaurantByIDController,
    deleteRestaurantByIDController
};
