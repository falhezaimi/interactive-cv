export const metadata = {
  title: "Fares Alhezaimi — Interactive CV",
  description: "PDF-look interactive resume with chat",
};

import "./../styles/globals.css";
import "./../styles/print.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
