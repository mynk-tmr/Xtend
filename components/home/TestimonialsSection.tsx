"use client";

import { motion, useAnimation } from "motion/react";
import Image from "next/image";
import { useEffect, useEffectEvent } from "react";

export const testimonials = [
  {
    id: "testimonial-1",
    name: "Manvika Madhrey",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Event Planner",
    content:
      "Xtended Space helped me find the perfect venue for my client's corporate event. Booking was seamless!",
    rating: 5,
    location: "Mumbai, Maharashtra",
  },

  {
    id: "testimonial-2",
    name: "Aarav Khurana",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "Wedding Photographer",
    content:
      "I booked a studio in Delhi for a shoot. The process was instant and the place looked exactly like the photos.",
    rating: 5,
    location: "New Delhi, Delhi",
  },

  {
    id: "testimonial-3",
    name: "Ritika Sharma",
    avatar: "https://i.pravatar.cc/150?img=32",
    role: "Interior Designer",
    content:
      "Finding spacious homes for my clients became so easy. The filtering options saved me hours!",
    rating: 4,
    location: "Gurugram, Haryana",
  },

  {
    id: "testimonial-4",
    name: "Kabir Mehta",
    avatar: "https://i.pravatar.cc/150?img=18",
    role: "Startup Founder",
    content:
      "Booked a meeting room for investor calls. Fast, reliable and transparent — exactly what I needed.",
    rating: 5,
    location: "Bengaluru, Karnataka",
  },

  {
    id: "testimonial-5",
    name: "Saanvi Rao",
    avatar: "https://i.pravatar.cc/150?img=27",
    role: "Fashion Stylist",
    content:
      "Loved the studio options for catalogue shoots! Extremely affordable and well-maintained spaces.",
    rating: 5,
    location: "Hyderabad, Telangana",
  },

  {
    id: "testimonial-6",
    name: "Raghav Tiwari",
    avatar: "https://i.pravatar.cc/150?img=44",
    role: "Corporate HR Manager",
    content:
      "We needed a training hall for 80+ employees. Booking took less than 2 minutes — simply outstanding.",
    rating: 5,
    location: "Pune, Maharashtra",
  },

  {
    id: "testimonial-7",
    name: "Ishita Banerjee",
    avatar: "https://i.pravatar.cc/150?img=15",
    role: "Event Decor Specialist",
    content:
      "This platform has the best range of venues for intimate events. I've already booked three!",
    rating: 4,
    location: "Kolkata, West Bengal",
  },

  {
    id: "testimonial-8",
    name: "Viraj Deshmukh",
    avatar: "https://i.pravatar.cc/150?img=39",
    role: "Freelance Videographer",
    content:
      "Super easy to find large indoor spaces for commercials. Pricing is clear and upfront.",
    rating: 5,
    location: "Nashik, Maharashtra",
  },

  {
    id: "testimonial-9",
    name: "Neha Kapoor",
    avatar: "https://i.pravatar.cc/150?img=47",
    role: "Blogger & Content Creator",
    content:
      "Found a beautiful rooftop café for a brand collaboration shoot. Highly recommended!",
    rating: 5,
    location: "Chandigarh",
  },

  {
    id: "testimonial-10",
    name: "Aditya Singh",
    avatar: "https://i.pravatar.cc/150?img=21",
    role: "Tour Operator",
    content:
      "I often need group stay venues. Xtended Space has made my work so much more efficient.",
    rating: 4,
    location: "Jaipur, Rajasthan",
  },
];

const marqueeData = [...testimonials, ...testimonials];

export default function CombinedTestimonials() {
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  // Core auto move logic — pure motion + state
  const startMarquee = useEffectEvent(async () => {
    while (true) {
      await controls1.start({
        x: "-50%",
        transition: { duration: 15, ease: "linear" },
      });
      controls1.set({ x: "0%" });

      await controls2.start({
        x: "0%",
        transition: { duration: 15, ease: "linear" },
      });
      controls2.set({ x: "-50%" });
    }
  });

  useEffect(() => {
    startMarquee();
  });

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
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

        {/* Marqueees */}
        <div className="relative overflow-hidden max-w-5xl mx-auto mb-12">
          <motion.div
            className="flex gap-4"
            animate={controls1}
            initial={{ x: "0%" }}
          >
            {marqueeData.map((t, i) => (
              <TestimonialCard key={`${t.id}-r1-${i}`} data={t} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-12 mt-16">
        <Stat num="10,000+" label="Spaces Listed" />
        <Stat num="50,000+" label="Happy Users" />
        <Stat num="100+" label="Cities Covered" />
      </div>
    </section>
  );
}

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ data }: { data: Testimonial }) {
  return (
    <div className="p-4 rounded-lg shadow hover:shadow-lg transition-all bg-white w-72 shrink-0">
      <div className="flex gap-3">
        <Image
          width={44}
          height={44}
          src={data.avatar}
          className="size-11 rounded-full"
          alt={data.name}
        />
        <div>
          <p className="font-medium">{data.name}</p>
          <p className="text-xs text-slate-500">{data.role}</p>
        </div>
      </div>

      <p className="text-sm py-4 text-gray-800">{data.content}</p>

      <div className="text-xs text-slate-500">{data.location}</div>
    </div>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-blue-600">{num}</p>
      <p className="text-lg text-gray-600">{label}</p>
    </div>
  );
}
