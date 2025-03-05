import mongoose from 'mongoose';
import FeatureSchema from './FeatureSchema.js';

const carListingSchema = new mongoose.Schema({
    listingTitle: { 
        type: String,
        required: true
    },
    tagline: { 
        type: String 
    },
    originalPrice: { 
        type: String 
    },
    sellingPrice: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Van", "Hatchback", "Electric", "Hybrid"],
        required: true 
    },
    condition: { 
        type: String, 
        enum: ["New", "Used", "Certified Pre-Owned"],
        required: true 
    },
    make: { 
        type: String, 
        enum: ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Audi", "Tesla", "Volkswagen", "Hyundai", "Kia", "Lexus", "Subaru", "Mazda", "Jeep", "Dodge", "Ram", "GMC", "Volvo", "Land Rover", "Jaguar", "Porsche", "Fiat", "Alfa Romeo", "Mitsubishi", "Infiniti", "Acura", "Mini", "Buick", "Cadillac", "Chrysler", "Lincoln", "Maserati", "Bentley", "Rolls-Royce", "Aston Martin", "Ferrari", "Lamborghini", "McLaren", "Pagani", "Bugatti"],
        required: true 
    },
    model: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    driveType: { 
        type: String, 
        enum: ["FWD", "RWD", "AWD", "4WD"],
        required: true 
    },
    transmission: { 
        type: String, 
        enum: ["Automatic", "Manual", "CVT"],
        required: true 
    },
    fuelType: { 
        type: String, 
        enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
        required: true 
    },
    mileage: { 
        type: Number, 
        required: true 
    },
    engineSize: { 
        type: String 
    },
    cylinder: { 
        type: Number 
    },
    color: { 
        type: String, 
        enum: ["Black", "Blue", "Gold", "Pink", "Red", "Silver", "White"],
        required: true 
    },
    door: { 
        type: Number, 
        required: true 
    },
    vin: { 
        type: String 
    },
    offerType: { 
        type: String,
        enum: ["Buy", "Hot Offer", "Sell", "Urgent"],
    },
    listingDescription: { 
        type: String, 
        required: true 
    },
    features: {
        type: FeatureSchema,
        default: {}
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
}, {timestamps: true });

export default mongoose.model("carListing", carListingSchema);