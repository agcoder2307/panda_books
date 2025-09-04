import { useState, useEffect } from "react";
import robot from "../assets/hero/robot.jpg";
import cyborg from "../assets/services/service-3.png";
import Slideshow from "../components/Slideshow";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => prev + 1), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isAnimating) {
      const r = requestAnimationFrame(() => setIsAnimating(true));
      return () => cancelAnimationFrame(r);
    }
  }, [isAnimating]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12"
      >
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Learn English with <span className="text-blue-600">E-ReadBook</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Improve your English skills by reading engaging books designed for
            learners of all levels.
          </p>
          <div className="space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Browse Books
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src={cyborg}
            alt="Reading Illustration"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Slideshow Section */}
      <section id="slideshow" className="bg-gray-50 py-12">
        <Slideshow />
      </section>

      {/* Featured Books */}
      <section id="books" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-8">Featured Books</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4].map((book) => (
              <div
                key={book}
                className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={robot}
                  alt={`Book ${book}`}
                  className="rounded-md mb-4"
                />
                <h4 className="text-lg font-semibold mb-2">
                  Book Title {book}
                </h4>
                <p className="text-gray-700 flex-grow">
                  Short description about Book {book}. Learn and improve your
                  skills.
                </p>
                <button
                  onClick={() => navigate("/details")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Watch Our Intro Video
          </h3>
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-md"
              src="https://www.youtube.com/embed/MQEszef9ev0"
              title="Intro Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-800">
              <p>
                <strong>Email:</strong> support@ereadbook.com
              </p>
              <p>
                <strong>Phone:</strong> +998 (90) 123-45-67
              </p>
              <p>
                <strong>Address:</strong> Tashkent, Uzbekistan
              </p>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2 bg-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-2 bg-white"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full border rounded-lg px-4 py-2 bg-white"
              ></textarea>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} E-ReadBook. All rights reserved.
          </p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
