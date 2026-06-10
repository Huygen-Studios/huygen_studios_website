import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Huygen Studios",
  description: "Frequently asked questions about our AI voice agents, web development services, automation, and pricing.",
  openGraph: {
    title: "FAQ | Huygen Studios",
    description: "Frequently asked questions about our AI voice agents, web development services, automation, and pricing.",
    url: "https://huygenstudios.com/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What exactly is an AI Voice Agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI Voice Agent is a highly intelligent, 24/7 autonomous caller that handles inbound customer service, appointment bookings, and outbound lead qualification. It speaks naturally, understands context, and updates your CRM in real-time."
      }
    },
    {
      "@type": "Question",
      name: "How much does a cinematic website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our web projects are custom-tailored to the complexity and scale of the design. Typically, our cinematic web experiences range depending on features like 3D WebGL rendering, custom animations, and backend integration. Please contact us for a detailed quote."
      }
    },
    {
      "@type": "Question",
      name: "Do you integrate with my existing CRM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we integrate seamlessly with Hubspot, Salesforce, GoHighLevel, Pipedrive, and custom backends via webhooks to ensure your data flows perfectly into your existing ecosystem."
      }
    },
    {
      "@type": "Question",
      name: "How long does implementation take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard deployments take between 2 to 4 weeks depending on the complexity of the flows and the integrations required. Custom enterprise builds may take longer."
      }
    }
  ]
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
