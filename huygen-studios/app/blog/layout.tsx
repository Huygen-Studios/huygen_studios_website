import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Huygen Studios",
  description: "Insights on AI automation, high-end web development, and the future of business operations.",
  openGraph: {
    title: "Blog | Huygen Studios",
    description: "Insights on AI automation, high-end web development, and the future of business operations.",
    url: "https://huygenstudios.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
