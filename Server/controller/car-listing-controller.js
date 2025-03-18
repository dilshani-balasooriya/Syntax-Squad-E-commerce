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
      userId: req.user._id,
    });

    await newCarListing.save();
    return res.status(201).json("Save listing successfully!");
  } catch (error) {
    console.log(error);
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
    const userId = req.user._id;
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
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const EditCarListing = async (req, res) => {
  const { id } = req.params;

  try {
    const carListing = await CarListing.findById(id);

    if (!carListing) {
      return res.status(404).json({ error: "Car listing not found." });
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
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetListingsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const carListings = await CarListing.find({ category });

    if (carListings.length === 0) {
      return res
        .status(404)
        .json({ error: "No car listings found in this category." });
    }

    return res.status(200).json(carListings);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const SearchCarListings = async (req, res) => {
  const { condition, make, sellingPrice } = req.query;

  let filter = {};

  if (condition && condition !== "undefined") {
    filter.condition = condition;
  }
  if (make && make !== "undefined") {
    filter.make = make;
  }
  if (
    sellingPrice &&
    sellingPrice !== "undefined" &&
    !isNaN(parseFloat(sellingPrice))
  ) {
    filter.sellingPrice = parseFloat(sellingPrice);
  }

  try {
    const carListings = await CarListing.find(filter);
    return res.status(200).json(carListings);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const DeleteCarListing = async (req, res) => {
  const { id } = req.params;

  try {
    const carListing = await CarListing.findById(id);

    if (!carListing) {
      return res.status(404).json({ error: "Car listing not found." });
    }

    if (carListing.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action." });
    }

    await CarListing.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Car listing deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetUserCarListingCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const totalListings = (await CarListing.countDocuments({ userId })) || 0;
    return res.status(200).json({ count: totalListings });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetCarListingCount = async (req, res) => {
  try {
    const totalListings = (await CarListing.countDocuments()) || 0;
    return res.status(200).json({ count: totalListings });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetFuelTypeCount = async (req, res) => {
  try {
    const fuelTypeCounts = await CarListing.aggregate([
      { $group: { _id: "$fuelType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const result = fuelTypeCounts.map((entry) => ({
      fuelType: entry._id || "Unknown",
      count: entry.count,
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetCategoryCount = async (req, res) => {
  try {
    const categoryCounts = await CarListing.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const result = categoryCounts.map((entry) => ({
      category: entry._id || "Unknown",
      count: entry.count,
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetHotOfferCount = async (req, res) => {
  try {
    const hotOfferCount =
      (await CarListing.countDocuments({ offerType: "Hot Offer" })) || 0;
    return res.status(200).json({ count: hotOfferCount });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const GetListingsOverTime = async (req, res) => {
  try {
    const listingsOverTime = await CarListing.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const formattedData = listingsOverTime.map((entry) => ({
      name: monthNames[entry._id.month - 1],
      count: entry.count,
    }));

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};
