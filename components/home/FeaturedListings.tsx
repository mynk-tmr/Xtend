"use client";

import { Icon } from "@iconify/react";
import { Badge, Button } from "@mantine/core";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function FeaturedListings() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(featuredListings.length / itemsPerPage);

  const currentListings = featuredListings.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage,
  );

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-lg text-blue-600 uppercase tracking-wider mb-4">
            Featured Spaces
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Handpicked Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium spaces across India's
            major cities
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-xl shadow-md">
                    {/* Image */}
                    <div className="relative rounded-t-md h-48 overflow-hidden">
                      <Image
                        src={`https://images.unsplash.com/photo-${listing.imageId}?auto=format&fit=crop&w=800&q=80`}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-2 right-2">
                        {listing.propertyType}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {listing.title}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{listing.price.toLocaleString("en-IN")}{" "}
                        <span className="text-xs text-gray-500">/month</span>
                      </p>

                      <div className="flex items-center text-gray-600 mb-3">
                        <Icon
                          icon="mdi:map-marker"
                          width={16}
                          height={16}
                          className="mr-1"
                        />
                        <span className="text-sm">{listing.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center mt-8 gap-4"
          >
            <Button
              variant="outline"
              color="gray"
              onClick={goToPrevious}
              disabled={totalPages === 1}
              className="flex items-center"
            >
              <Icon
                icon="mdi:chevron-left"
                width={16}
                height={16}
                className="mr-1"
              />
              Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  type="button"
                  key={featuredListings[index].id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              color="gray"
              onClick={goToNext}
              disabled={totalPages === 1}
              className="flex items-center"
            >
              Next
              <Icon
                icon="mdi:chevron-right"
                width={16}
                height={16}
                className="ml-1"
              />
            </Button>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            component="a"
            href="/listings"
            className="bg-blue-600 hover:bg-blue-700"
          >
            View All Spaces
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

const featuredListings = [
  {
    id: "1",
    title: "Modern Loading Dock",
    price: 25000,
    location: "Mumbai, Maharashtra",
    imageId: "1509228270533-dabaaa2a9dde",
    propertyType: "warehouse",
  },
  {
    id: "2",
    title: "Creative Studio Space",
    price: 15000,
    location: "Bangalore, Karnataka",
    imageId: "1581092795360-fd1ca04f0952",
    propertyType: "studio",
  },
  {
    id: "3",
    title: "Luxury Apartment with City View",
    price: 35000,
    location: "Delhi, NCR",
    imageId: "1600607687939-ce8a6c25118c",
    propertyType: "apartment",
  },
  {
    id: "4",
    title: "Commercial Storage Facility",
    price: 20000,
    location: "Pune, Maharashtra",
    imageId: "1609143739217-01b60dad1c67",
    propertyType: "commercial",
  },
];
