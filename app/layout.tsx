import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import TanstackProvider from "@/components/providers/TanstackProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata = {
  title: "Xtended Space",
  description: "E-commerce app to rent or list spaces of any kind.",
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
        <TanstackProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
