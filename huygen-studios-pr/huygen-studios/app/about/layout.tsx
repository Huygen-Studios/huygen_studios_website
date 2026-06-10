import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Huygen Studios",
  description: "Learn about Huygen Studios, our mission, and how we build autonomous revenue engines using premium AI automation and cinematic web experiences.",
  openGraph: {
    title: "About Us | Huygen Studios",
    description: "Learn about Huygen Studios, our mission, and how we build autonomous revenue engines using premium AI automation and cinematic web experiences.",
    url: "https://huygenstudios.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
