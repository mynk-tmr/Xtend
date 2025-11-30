"use client";

import { Icon } from "@iconify/react";
import { ActionIcon } from "@mantine/core";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StorageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % CARASOUL_IMAGES.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={CARASOUL_IMAGES[currentSlide].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: "easeInOut" },
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0"
        >
          <Image
            src={CARASOUL_IMAGES[currentSlide].url}
            alt={CARASOUL_IMAGES[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl"
        >
          <p className="text-xs text-blue-400 uppercase tracking-wider mb-2">
            {CARASOUL_IMAGES[currentSlide].category}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {CARASOUL_IMAGES[currentSlide].title}
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            {CARASOUL_IMAGES[currentSlide].location}
          </p>
        </motion.div>
      </div>

      {/* Play/Pause Button */}
      <ActionIcon
        variant="transparent"
        onClick={togglePlayPause}
        className="absolute left-1/2 top-1/2 bg-black/20 backdrop-blur-sm text-white"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Icon icon="heroicons:pause" width={20} height={20} />
        ) : (
          <Icon icon="heroicons:play" width={20} height={20} />
        )}
      </ActionIcon>
    </section>
  );
}

export const CARASOUL_IMAGES = [
  {
    id: "warehouse-mumbai",
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Balcony Apartment",
    category: "Business",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "luxury-bangalore",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Modern Interior 2BHK",
    category: "Flat",
    location: "Bangalore, Karnataka",
  },
  {
    id: "studio-delhi",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Creative Studio Space",
    category: "Workshop",
    location: "New Delhi, NCR",
  },
  {
    id: "industrial-chennai",
    url: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Furniture Storage Facility",
    category: "Industrial",
    location: "Chennai, Tamil Nadu",
  },
  {
    id: "climate-hyderabad",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Luxury Big House",
    category: "Real Estate",
    location: "Hyderabad, Telangana",
  },
  {
    id: "coworking-pune",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Co-working Storage Space",
    category: "Hybrid Spaces",
    location: "Pune, Maharashtra",
  },
];
