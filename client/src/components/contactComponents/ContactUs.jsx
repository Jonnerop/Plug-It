import { useState, useEffect } from "react";
import contactData from "./data";
import carImage from "../../assets/images/car-w-charger.jpg";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) {
      alert("Please fill in all fields");
      return;
    }
    const newContactForm = {
      name: formData.name,
      email: formData.email,
      content: formData.content,
    };
    addContactForm(newContactForm);
    //reset form
    setFormData({ name: "", email: "", content: "" });
  };

  const addContactForm = async (newContactForm) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContactForm),
      });
      if (response.ok) {
        console.log("Form data sent successfully");
      } else {
        alert("Failed to send form data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mb-36 mt-28">
      <div className="font-Roboto">
        <h1 className="text-3xl font-bold text-eGreen mb-4 font-Orbitron ">
          Contact Us
        </h1>

        <div className="text-white flex flex-col mb-2">
          <h2 className="font-bold">Customer Support</h2>
          <p>{contactData.customerSupport}</p>
        </div>
        <div className="flex flex-row items-center relative justify-center">
          {/* Contact info section */}
          <div className="bg-white p-4 rounded-xl w-64 h-64 justify-center absolute -translate-x-1/2 left-10 hidden contact:block">
            <div>
              <h2 className="font-bold">Email Us</h2>
              <p className="mb-4 text-electricBlue hover:underline">
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
              </p>
            </div>

            <div>
              <h2 className="font-bold">Phone Support</h2>
              <p className="mb-4 text-electricBlue hover:underline">
                <a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
              </p>
            </div>
            <div className="mb-2">
              <h2 className="font-bold">Office Location</h2>
              <p>{contactData.officeLocation}</p>
            </div>
          </div>

          {/* image section */}
          <div>
            <img
              src={carImage}
              alt="Car with charger"
              className="h-[450px] rounded-l-xl hidden contact-form:block xs:hidden w-80"
            />
          </div>

          {/* Contact form section */}
          <div className="bg-white rounded-xl w-80 contact-form:rounded-none contact-form:rounded-r-xl min-h-[450px] font-Roboto">
            <form onSubmit={handleSubmit} className="p-4 ">
              <h2 className="font-bold mb-4">Contact Form</h2>

              {/* Name Field */}
              <div className="font-Roboto">
                <label>Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-lilac bg-opacity-50 w-full rounded-lg text-xs p-2 text:pl-2 placeholder-gray-500 placeholder:text-xs mb-3"
                />
              </div>

              {/* Email Field */}
              <div className="font-Roboto">
                <label>Email: </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="bg-lilac bg-opacity-50 w-full rounded-lg text-xs p-2 text:pl-2 placeholder-gray-500 placeholder:text-xs mb-3"
                />
              </div>

              {/* Content Field */}
              <div className="font-Roboto">
                <label>Content:</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Your message"
                  required
                  className="bg-lilac bg-opacity-50 w-full rounded-lg text-xs p-2 placeholder-gray-500 placeholder:text-xs mb-3 min-h-[34px] max-h-[167px] overflow-y-auto"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="p-2 px-5 text-sm rounded-3xl font-bold font-Roboto bg-gradient-to-r from-eGreen to-eGreenDark hover:bg-darkGreen hover:text-white transition-all duration-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Contact info for small screens */}
        <div className="text-white mt-4 rounded-xl w-64 h-64 justify-center contact:hidden xs:block">
          <div>
            <h2 className="font-bold">Email Us</h2>
            <p className="mb-4 text-blue-300 hover:underline">
              <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
            </p>
          </div>

          <div>
            <h2 className="font-bold">Phone Support</h2>
            <p className="mb-4 text-blue-300 hover:underline">
              <a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
            </p>
          </div>
          <div className="mb-2">
            <h2 className="font-bold">Office Location</h2>
            <p>{contactData.officeLocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
