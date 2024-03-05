import { Inter } from "next/font/google";
import LayoutWrapper from "./_component/LayoutWrapper";
const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>;
      </body>
    </html>
  );
}
