"use client";

import { Icon } from "@iconify/react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Search & Explore",
    description:
      "Browse through thousands of verified spaces across India. Use filters to find exactly what you need.",
    icon: "mdi:magnify",
  },
  {
    number: 2,
    title: "Compare & Choose",
    description:
      "Compare prices, amenities, and locations. Read reviews from other users to make informed decisions.",
    icon: "mdi:compare",
  },
  {
    number: 3,
    title: "Book & Confirm",
    description:
      "Book your desired space instantly. Get immediate confirmation and booking details.",
    icon: "mdi:calendar-check",
  },
  {
    number: 4,
    title: "Enjoy & Review",
    description:
      "Use your space as needed. Share your experience to help others in the community.",
    icon: "mdi:star-face",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-lg text-blue-600 uppercase tracking-wider mb-4">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Xtended Space Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finding and booking spaces has never been easier. Follow these
            simple steps to get your perfect space in minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    icon={step.icon}
                    width={24}
                    height={24}
                    className="text-blue-600"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of users who have found their perfect spaces
              through Xtended Space
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Searching
              </Button>
              <Button size="lg" variant="outline" color="blue">
                List Your Space
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
