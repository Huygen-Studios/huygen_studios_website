import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Huygen Studios",
  description: "Explore our portfolio of elite AI automation systems, voice agents, and cinematic web experiences.",
  openGraph: {
    title: "Projects | Huygen Studios",
    description: "Explore our portfolio of elite AI automation systems, voice agents, and cinematic web experiences.",
    url: "https://huygenstudios.com/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
