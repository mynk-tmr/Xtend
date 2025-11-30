"use client";

import { Icon } from "@iconify/react";
import { Button } from "@mantine/core";
import { motion } from "motion/react";
import Image from "next/image";

export default function CTASection() {
  const avatars = Array.from(
    { length: 28 },
    (_, i) => `https://i.pravatar.cc/150?img=${i * 2 + 1}`,
  );
  return (
    <section className="py-16 md:py-24 bg-linear-to-r from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30s30 13.431 30 30 13.431c0 16.569-13.431 30-30 30zm0-2c0-14.912 12.088-27 27-27s27 12.088 27 27 12.088 27 27-12.088zm0-2c0-13.254 10.746-24 24-24s24 10.746 24 24 10.746 24 24-10.746zm0-2c0-11.597 9.403-21 21-21s21 9.403 21 21 9.403 21 21-9.403zm0-2c0-9.94 8.06-18 18-18s18 8.06 18 18 8.06 18 18-8.06zm0-2c0-8.284 6.716-15 15-15s15 6.716 15 15 6.716 15 15-6.716z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <p className="text-lg text-blue-200 uppercase tracking-wider mb-4">
              Ready to Get Started?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              List Your Space Today
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Join thousands of property owners earning passive income by
              listing their spaces on Xtended Space. Start earning in minutes
              with our simple onboarding process.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "No Listing Fees",
                "Instant verification",
                "24/7 support",
                "Dashboard and Metrics",
              ].map((str) => (
                <div key={str} className="flex items-center">
                  <Icon
                    icon="mdi:check-circle"
                    width={20}
                    height={20}
                    className="text-green-400 mr-3"
                  />
                  <b className="text-base">{str}</b>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              List Your Space Now
            </Button>
          </motion.div>

          {/* Right Images */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl flex flex-wrap gap-2 justify-center">
            {avatars.map((av, i) => (
              <motion.div
                key={av}
                viewport={{ once: true }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                <Image
                  src={av}
                  alt={`user no. ${i}`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center text-white"
        >
          <div>
            <p className="text-3xl font-bold mb-2">500+</p>
            <p className="text-base text-blue-200">New Listings Daily</p>
          </div>
          <div>
            <p className="text-3xl font-bold mb-2">95%</p>
            <p className="text-base text-blue-200">Satisfaction Rate</p>
          </div>
          <div>
            <p className="text-3xl font-bold mb-2">24/7</p>
            <p className="text-base text-blue-200">Customer Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
