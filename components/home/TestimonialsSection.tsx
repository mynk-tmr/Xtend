"use client";

import { Icon } from "@iconify/react";
import { Avatar, Button, Rating } from "@mantine/core";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Manvika Madhrey",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Event Planner",
    content:
      "Xtended Space helped me find the perfect venue for my client's corporate event. The booking process was seamless and the space exceeded our expectations!",
    rating: 5,
    location: "Mumbai, Maharashtra",
  },
  {
    id: "testimonial-2",
    name: "Arun Awasthi",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Small Business Owner",
    content:
      "I needed extra storage for my inventory and found exactly what I was looking for. The platform made it easy to compare options and prices.",
    rating: 5,
    location: "Bangalore, Karnataka",
  },
  {
    id: "testimonial-3",
    name: "Supriya Patel",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Artist",
    content:
      "As an artist, I needed a studio space that was both affordable and inspiring. I found the perfect creative space through Xtended Space.",
    rating: 4,
    location: "New Delhi, NCR",
  },
  {
    id: "testimonial-4",
    name: "Vikram Reddy",
    avatar: "https://i.pravatar.cc/150?img=7",
    role: "Photographer",
    content:
      "The variety of spaces available is incredible. I've booked everything from studios to entire warehouses for my photoshoots.",
    rating: 5,
    location: "Hyderabad, Telangana",
  },
  {
    id: "testimonial-5",
    name: "Kavita Nair",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Startup Founder",
    content:
      "We needed temporary office space while our main office was being renovated. Found a great space that accommodated our entire team.",
    rating: 5,
    location: "Pune, Maharashtra",
  },
  {
    id: "testimonial-6",
    name: "Arjun Singh",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: "E-commerce Seller",
    content:
      "Finding storage for my products was always a challenge until I discovered Xtended Space. Now I have multiple locations across the city.",
    rating: 4,
    location: "Chennai, Tamil Nadu",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [shuffledTestimonials, setShuffledTestimonials] =
    useState(testimonials);

  // Randomize testimonials on mount
  useEffect(() => {
    const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
    setShuffledTestimonials(shuffled);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % shuffledTestimonials.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, shuffledTestimonials.length]);

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + shuffledTestimonials.length) % shuffledTestimonials.length,
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % shuffledTestimonials.length);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-blue-600 uppercase tracking-wider mb-4">
            What Our Users Say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied customers who have found their perfect
            spaces through Xtended Space
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={shuffledTestimonials[activeIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar and Info */}
                <div className="flex flex-col items-center md:items-start">
                  <Avatar
                    src={shuffledTestimonials[activeIndex].avatar}
                    alt={shuffledTestimonials[activeIndex].name}
                    size={80}
                    className="mb-4"
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {shuffledTestimonials[activeIndex].name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {shuffledTestimonials[activeIndex].role}
                    </p>
                    <p className="text-xs text-blue-600">
                      {shuffledTestimonials[activeIndex].location}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Rating
                    value={shuffledTestimonials[activeIndex].rating}
                    fractions={2}
                    readOnly
                    className="mb-4"
                  />
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    "{shuffledTestimonials[activeIndex].content}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              color="gray"
              size="sm"
              radius="xl"
              onClick={goToPrevious}
              aria-label="Previous testimonial"
            >
              <Icon icon="heroicons:arrow-left" width={16} height={16} />
            </Button>

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {shuffledTestimonials.map((_, index) => (
                <button
                  type="button"
                  key={shuffledTestimonials[index].id}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              color="gray"
              size="sm"
              radius="xl"
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <Icon icon="heroicons:arrow-right" width={16} height={16} />
            </Button>
          </div>

          {/* Play/Pause Indicator */}
          <div className="text-center mt-4">
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              radius="xl"
              onClick={togglePlayPause}
              aria-label={isPaused ? "Play testimonials" : "Pause testimonials"}
            >
              {isPaused ? (
                <>
                  <Icon
                    icon="heroicons:play"
                    width={12}
                    height={12}
                    className="mr-1"
                  />
                  Auto-play
                </>
              ) : (
                <>
                  <Icon
                    icon="heroicons:pause"
                    width={12}
                    height={12}
                    className="mr-1"
                  />
                  Auto-playing
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">10,000+</p>
            <p className="text-lg text-gray-600">Spaces Listed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">50,000+</p>
            <p className="text-lg text-gray-600">Happy Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">100+</p>
            <p className="text-lg text-gray-600">Cities Covered</p>
          </div>
        </div>
      </div>
    </section>
  );
}
