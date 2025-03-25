import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center mt-40">
        <Card className="w-[450px] h-[500px] p-6 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold mt-8">
              Contact Us
            </CardTitle>
          </CardHeader>
          <form>
            <CardContent>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" />
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
  );
};

export default Contact;
