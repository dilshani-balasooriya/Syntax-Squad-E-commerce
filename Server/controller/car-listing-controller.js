import CarListing from "../schema/CarListing.js";

export const CreateCarListing = async (req, res) => {
  const {
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
    imageUrl,
  } = req.body;

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
      imageUrl,
      userId: req.user.id,
    });

    await newCarListing.save();
    return res.status(201).json("Save listing successfully!");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetAllCarListing = async (req, res) => {
  try {
    const carListings = await CarListing.find();
    return res.status(200).json(carListings);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetUserCarListing = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCarListings = await CarListing.find({ userId });
    return res.status(200).json(userCarListings);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetSingleCarListing = async (req, res) => {
  const { id } = req.params;

  try {
    const carListing = await CarListing.findById(id);

    if (!carListing) {
      return res.status(404).json({ error: "Car listing not found." });
    }

    return res.status(200).json(carListing);
  } catch (error) {
    return res.status(500).json({ error: "Server error, please try again later." });
  }
}

export const EditCarListing = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const carListing = await CarListing.findById(id);

    if (!carListing) {
      return res.status(404).json({ error: "Car listing not found." });
    }

    if (carListing.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized to edit this listing." });
    }

    const updatedCarListing = await CarListing.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Car listing updated successfully!",
      updatedCarListing,
    });

  } catch (error) {
    return res.status(500).json({ error: "Server error, please try again later." });
  }
}


