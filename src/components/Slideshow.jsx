import { useState, useEffect, useRef } from "react";
import robot from "../assets/hero/robot.jpg";
import cyborg from "../assets/services/service-3.png";
const Slideshow = () => {
  const images = [robot, cyborg, robot];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length, paused]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setPaused(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPaused(false);
    }, 30000); // resume after 30s
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full h-80 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
