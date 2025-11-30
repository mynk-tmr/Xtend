"use client";

import { Icon } from "@iconify/react";
import { Button, TextInput } from "@mantine/core";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "Popular Cities",
    icon: "material-symbols:location-on-rounded",
    items: [
      "Gurgaon",
      "Noida",
      "Delhi",
      "Mumbai",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
    ],
  },
  {
    title: "Quick Links",
    icon: "material-symbols:arrow-right-rounded",
    items: ["Browse Spaces", "List Your Space", "How It Works", "About Us"],
  },
  {
    title: "Get Help",
    icon: "mdi:help-box",
    items: ["FAQs", "Terms & Conditions", "Privacy Policy", "Contact Support"],
  },
  {
    title: "Property Types",
    icon: "mdi:home-city",
    items: [
      "Warehouses",
      "Studios",
      "Apartments",
      "Commercial Spaces",
      "Storage Units",
    ],
  },
];

const stats = [
  { label: "Spaces Listed", value: "10,000+" },
  { label: "Happy Users", value: "50,000+" },
  { label: "Cities Covered", value: "100+" },
];

export default function Footer() {
  return (
    <footer className="text-white bg-zinc-900 -mx-4">
      {/* Stats Section */}
      <motion.section
        className="border-b border-zinc-800 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-zinc-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-between items-start">
          {/* Developer Info */}
          <motion.section
            className="max-w-xs p-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="https://www.linkedin.com/in/mayank-tomar-9bba0613b"
              target="_blank"
              rel="noreferrer"
              className="flex gap-2 items-center text-sm text-sky-500 hover:text-sky-400 transition-colors mb-4"
            >
              <Image
                width={48}
                height={48}
                src="https://github.com/mynk-tmr.png"
                alt="Mayank"
                className="size-12 rounded-md"
              />
              <div>
                <div className="font-semibold">Developed by Mayank</div>
                <div className="text-xs opacity-75">Full Stack Developer</div>
              </div>
              <Icon icon="mdi:linkedin" className="ml-2" />
            </a>
            <p className="text-sm text-stone-300">
              Xtended Space is an online marketplace for storage spaces across
              India. Connect renters with property owners seamlessly.
            </p>
            <div className="flex gap-3 mt-4">
              <Button
                variant="subtle"
                color="gray"
                component="a"
                href="#"
                size="sm"
              >
                <Icon icon="mdi:facebook" width={20} height={20} />
              </Button>
              <Button
                variant="subtle"
                color="gray"
                component="a"
                href="#"
                size="sm"
              >
                <Icon icon="mdi:twitter" width={20} height={20} />
              </Button>
              <Button
                variant="subtle"
                color="gray"
                component="a"
                href="#"
                size="sm"
              >
                <Icon icon="mdi:instagram" width={20} height={20} />
              </Button>
            </div>
          </motion.section>

          {/* Navigation Sections */}
          <section className="text-sm lg:text-base flex flex-wrap *:grow *:p-8">
            {sections.map(({ title, icon, items }, sectionIndex) => (
              <motion.nav
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * sectionIndex }}
              >
                <motion.h3
                  className="font-bold text-red-400 mb-4 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <Icon icon={icon} className="text-lg" />
                  {title}
                </motion.h3>
                <ul className="space-y-2">
                  {items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: sectionIndex * 0.1 + itemIndex * 0.05,
                      }}
                      className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex gap-2 items-center py-1"
                    >
                      <Icon
                        icon="mdi:chevron-right"
                        className="text-xs opacity-50"
                      />
                      <Link href="/" className="hover:underline">
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </section>
        </div>
      </div>

      {/* Newsletter Section */}
      <motion.section
        className="border-t border-zinc-800 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.h3
            className="text-xl font-bold mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Stay Updated with Latest Spaces
          </motion.h3>
          <motion.p
            className="text-zinc-400 mb-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Get notified about new spaces in your area and exclusive offers
          </motion.p>
          <motion.form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TextInput
              placeholder="Enter your email address"
              variant="filled"
              className="flex-1"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </motion.form>
        </div>
      </motion.section>

      {/* Copyright */}
      <motion.div
        className="border-t border-zinc-800 py-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <p className="text-sm font-semibold text-zinc-400">
          © {new Date().getFullYear()} Xtended Space. All rights reserved. |
          <Link href="/terms" className="hover:text-white underline ml-1">
            Terms
          </Link>{" "}
          |
          <Link href="/privacy" className="hover:text-white underline ml-1">
            Privacy
          </Link>
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          Made with ❤️ in India | Connecting spaces with people
        </p>
      </motion.div>
    </footer>
  );
}
