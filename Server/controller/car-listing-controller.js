import CarListing from '../schema/CarListing.js';

export const CreateCarListing = async (req, res) => {
    const { listingTitle, tagline, originalPrice, sellingPrice, category, condition, make, model, year, driveType, transmission, fuelType, mileage, engineSize, cylinder, color, door, vin, offerType, listingDescription, features } = req.body;

    try {
        const newCarListing = new CarListing({
            listingTitle,
            tagline,
            originalPrice,
            sellingPrice,
            category,
            condition,
            make,
            model,
            year,
            driveType,
            transmission,
            fuelType,
            mileage,
            engineSize,
            cylinder,
            color,
            door,
            vin,
            offerType,
            listingDescription,
            features,
            userId: req.user.id
        });

        await newCarListing.save();
        return res.status(201).json("Save listing successfully!");

    } catch (error) {
        return res.status(500).json({ error: 'Server error, please try again later.' });
    }
}