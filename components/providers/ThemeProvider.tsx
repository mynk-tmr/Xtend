import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Sora as Sans } from "next/font/google";

const sans = Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function ThemeProvider(props: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{
        ...sans.style,
      }}
    >
      {props.children}
    </MantineProvider>
  );
}
