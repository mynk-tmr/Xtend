"use client";

import { Icon } from "@iconify/react";
import { motion } from "motion/react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "mdi:shield-check",
    title: "Verified Listings",
    description:
      "All spaces are verified by our team to ensure quality and safety for renters and property owners.",
  },
  {
    icon: "mdi:clock-fast",
    title: "Instant Booking",
    description:
      "Book your desired space instantly with our streamlined booking process and get confirmation in minutes.",
  },
  {
    icon: "mdi:headset",
    title: "24/7 Support",
    description:
      "Our dedicated support team is available round the clock to help you with any queries or issues.",
  },
  {
    icon: "mdi:map-marker-multiple",
    title: "Pan India Coverage",
    description:
      "Find spaces in all major cities across India with thousands of verified listings.",
  },
  {
    icon: "mdi:currency-inr",
    title: "Best Prices",
    description:
      "Competitive pricing with no hidden charges. Pay only for what you use with transparent billing.",
  },
  {
    icon: "mdi:star-circle",
    title: "Rated by Users",
    description:
      "Real reviews and ratings from actual users help you make informed decisions.",
  },
];

export default function FeaturesSection() {
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
          <h2 className="text-3xl text-blue-600 uppercase tracking-wider mb-4">
            Why Choose Xtended Space
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Features That Make a Difference
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We've designed our platform with both renters and property owners in
            mind, providing tools and features that make entire process
            seamless.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 hover:bg-blue-50/50"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  icon={feature.icon}
                  width={32}
                  height={32}
                  className="text-blue-600"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <span className="font-medium text-gray-600 leading-relaxed">
                {feature.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
