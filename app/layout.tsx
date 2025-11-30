import { Sora as Sans } from "next/font/google";
import "@/styles/globals.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

const sans = Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={{
            ...sans.style,
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
