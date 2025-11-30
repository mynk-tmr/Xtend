"use client";

import { Icon } from "@iconify/react";
import { Button, UnstyledButton } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { AnimatePresence, motion } from "motion/react";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { width } = useViewportSize();

  const isMobile = width < 768;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon
                icon="heroicons:building-office-2"
                width={20}
                height={20}
                className="text-white"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Xtended Space
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-8">
              <HeaderLink href="/listings" label="Browse Spaces" />
              <HeaderLink href="/how-it-works" label="How It Works" />
              <HeaderLink href="/about" label="About" />
            </nav>
          )}

          {/* Desktop Auth Buttons */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                color="gray"
                component={Link}
                href="/auth/login"
              >
                Log In
              </Button>
              <Button component={Link} href="/auth/register">
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <UnstyledButton
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Icon
                icon={mobileMenuOpen ? "heroicons:x-mark" : "heroicons:bars-3"}
                width={24}
                height={24}
                className="text-gray-700"
              />
            </UnstyledButton>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-200 overflow-hidden"
            >
              <div className="py-4 space-y-3">
                <MobileLink
                  href="/listings"
                  label="Browse Spaces"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <MobileLink
                  href="/how-it-works"
                  label="How It Works"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <MobileLink
                  href="/about"
                  label="About"
                  onClick={() => setMobileMenuOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-3 mt-3 space-y-2"
                >
                  <Button
                    variant="outline"
                    color="gray"
                    fullWidth
                    component={Link}
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Button>
                  <Button
                    fullWidth
                    component={Link}
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* -------------------------------- */
/* Small Reusable Components        */
/* -------------------------------- */

function HeaderLink({ href, label }: { href: Route; label: string }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
    >
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
