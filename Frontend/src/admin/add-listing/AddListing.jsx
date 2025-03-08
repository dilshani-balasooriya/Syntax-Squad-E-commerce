import React, { useEffect, useState } from "react";
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
import { BiLoaderAlt } from "react-icons/bi";
import UploadImages from "./components/UploadImages";
import { useSearchParams } from "react-router-dom";

const AddListing = () => {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [triggerUploadImages, setTriggerUploadImages] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [loader, setLoader] = useState(false);
  const [carInfo,setCarInfo]=useState();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode === "edit" && recordId) {
      GetListingDetail();
    }
  }, [mode, recordId]);

  const GetListingDetail = async () => {
    try {
      setLoader(true);
      const response = await apiRequest.get(
        `/car-listing/get-single-car-listing/${recordId}`
      );
      const data = response.data;

      setCarInfo(data);
      setFeaturesData(data.features);

      // setFormData({
      //   ...data,
      // });
      // setFeaturesData(data.features);
      // setUploadedImageUrls(data.imageUrl);
    } catch (error) {
      toast.error("Failed to update listing details!");
    } finally {
      setLoader(false);
    }
  };

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

  const handleImageUploadComplete = (imageUrls) => {
    setUploadedImageUrls(imageUrls);
    setTriggerUploadImages(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (uploadedImageUrls.length === 0) {
      setTriggerUploadImages(true);
      setLoader(false);
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        features: featuresData,
        imageUrl: uploadedImageUrls,
      };

      if (mode === "edit") {
        response = await apiRequest.put(
          `/car-listing/edit-car-list/${recordId}`,
          dataToSend
        );
        toast.success("Listing updated successfully 👍");
      } else {
        await apiRequest.post("/car-listing/create-listing", dataToSend);
        toast.success("Created new vehicle listing successfully 👍");
      }
    } catch (error) {
      toast.error("Failed to add listing!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <AdminHeader title={mode === "edit" ? "Edit Listing" : "Add Listing"} />
        <div className="px-10 md:px-20 my-10">
          <h2 className="font-bold text-4xl">
            {mode === "edit" ? "Edit Listing" : "Add New Listing"}
          </h2>
          <form
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
                        carInfo={carInfo}
                      />
                    ) : item.fieldType === "dropdown" ? (
                      <DropdownField
                        item={item}
                        value={formData[item.name] || ""}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                      />
                    ) : item.fieldType === "textarea" ? (
                      <TextAreaField
                        item={item}
                        value={formData[item.name] || ""}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-6" />

            {/* Features */}
            <div>
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
            <UploadImages
              triggerUploadImages={triggerUploadImages}
              onUploadComplete={handleImageUploadComplete}
              setLoader={(v) => setLoader(v)}
            />

            <div className="mt-10 flex justify-end">
              <Button
                type="submit"
                disabled={loader}
                className="bg-red-500 hover:bg-red-600"
              >
                {!loader ? (
                  "Submit"
                ) : (
                  <BiLoaderAlt className="animate-spin text-lg" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddListing;
