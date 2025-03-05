import React, { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader";
import carDetails from "../../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@/components/ui/separator";
import features from "../../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import apiRequest from "@/lib/apiRequest";
import toast, { Toaster } from "react-hot-toast";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";

const AddListing = () => {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [triggerUploadImages, setTriggerUploadImages] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, isChecked) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: isChecked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, features: featuresData };
      await apiRequest.post("/car-listing/create-listing", dataToSend);

      setFormData({});
      setFeaturesData({});
      setTriggerUploadImages(true);
      setFormKey(Date.now());

      toast.success("Create new vehicle listing successfully 👍");
    } catch (error) {
      toast.error("Failed to add listing!");
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <AdminHeader title={"Add Listing"} />
        <div className="px-10 md:px-20 my-10">
          <h2 className="font-bold text-4xl">Add New Listing</h2>
          <form
            key={formKey}
            className="p-10 border rounded-xl mt-10"
            onSubmit={handleSubmit}
          >
            {/* Car Details */}
            <div>
              <h2 className="font-medium text-xl mb-6">Car Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {carDetails.carDetails.map((item, index) => (
                  <div key={index}>
                    <label className="text-sm flex gap-2 items-center mb-2">
                      <IconField icon={item?.icon} />
                      {item?.label}{" "}
                      {item.required && <span className="text-red-500">*</span>}
                    </label>
                    {item.fieldType === "text" ||
                    item.fieldType === "number" ? (
                      <InputField
                        item={item}
                        value={formData[item.name] || ""}
                        handleInputChange={handleInputChange}
                      />
                    ) : item.fieldType === "dropdown" ? (
                      <DropdownField
                        item={item}
                        value={formData[item.name] || ""}
                        handleInputChange={handleInputChange}
                      />
                    ) : item.fieldType === "textarea" ? (
                      <TextAreaField
                        item={item}
                        value={formData[item.name] || ""}
                        handleInputChange={handleInputChange}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-6" />

            {/* Features List */}
            <div className="">
              <h2 className="font-medium text-xl my-6">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {features.features.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Checkbox
                      checked={!!featuresData[item.name]}
                      onCheckedChange={(checked) =>
                        handleFeatureChange(item.name, checked)
                      }
                    />
                    <h2>{item.label}</h2>
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-6" />

            {/* Car Images */}
            <UploadImages triggerUploadImages={triggerUploadImages} />

            <div className="mt-10 flex justify-end">
              <Button type="submit" className="bg-red-500">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddListing;