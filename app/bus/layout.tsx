"use client";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <div>{children}</div>;
}
