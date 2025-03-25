import React, { useRef } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const formRef = useRef(null);
  const scriptURL = import.meta.env.VITE_CONTACT_SHEET_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Your message has been successfully sent 👍");
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error!", error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <div className="flex justify-center items-center mt-40">
          <Card className="w-[450px] h-[500px] p-6 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-semibold mt-8">
                Contact Us
              </CardTitle>
            </CardHeader>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              name="submit-to-google-sheet"
            >
              <CardContent>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input type="text" name="Name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input type="email" name="Email" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea name="Message" required />
                  </div>
                </div>
                <Button type="submit" className="mt-5 w-full">
                  Send
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Contact;
