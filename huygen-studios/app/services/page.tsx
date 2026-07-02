"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, LayoutDashboard, Mic, Globe, MessageSquare, UserCheck, Settings, TrendingUp, Video } from "lucide-react";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";

type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  price: string;
  popular?: boolean;
  dashboard?: boolean;
};

type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortDescription: string;
  image: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  glow: string;
  gradientFrom: string;
  services: Service[];
};

const CATEGORIES: Category[] = [
  {
    id: "voice",
    label: "AI Voice Services",
    shortDescription: "Deploy hyper-realistic voice agents that handle calls, qualify leads, and book meetings automatically. Operates 24/7 without taking a break.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80",
    icon: <Mic size={16} />,
    accent: "text-rose-400",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30",
    glow: "shadow-[0_0_60px_-20px_rgba(244,63,94,0.4)]",
    gradientFrom: "from-rose-500/10",
    services: [
      {
        id: "inbound-voice",
        name: "Inbound AI Voice Agent",
        tagline: "24/7 intelligent answering.",
        description: "A hyper-realistic AI receptionist that answers every call instantly, handles FAQs, and routes complex cases in real-time.",
        features: ["Human-like voice synthesis", "Real-time conversation", "Lead routing logic", "Call analytics"],
        price: "₹45,000",
        popular: true,
        dashboard: true,
      },
      {
        id: "outbound-voice",
        name: "Outbound AI Voice Agent",
        tagline: "Scalable proactive engagement.",
        description: "Launch outbound call campaigns for lead follow-up, reminders, and reactivation with an AI that reasons like a human.",
        features: ["Campaign management", "Dynamic script logic", "Voicemail detection", "Post-call data capture"],
        price: "₹55,000",
        dashboard: true,
      },
      {
        id: "ai-receptionist",
        name: "AI Receptionist",
        tagline: "Your digital front desk.",
        description: "Professional call handling, call transferring, and basic information relay available 24/7 for your business.",
        features: ["Custom greeting", "Call forwarding", "Message taking", "Business hour logic"],
        price: "₹35,000",
        dashboard: true,
      },
      {
        id: "appointment-voice",
        name: "Appointment Booking Voice Agent",
        tagline: "Zero-friction scheduling.",
        description: "Voice AI that checks your calendar and books appointments directly during the call without human intervention.",
        features: ["Calendar sync", "Instant confirmation", "Rescheduling support", "Multi-time zone logic"],
        price: "₹40,000",
        dashboard: true,
      },
      {
        id: "lead-qual-voice",
        name: "Lead Qualification Voice Agent",
        tagline: "Filter leads automatically.",
        description: "Identify high-intent prospects by asking specific qualification questions before passing them to sales.",
        features: ["Custom scoring logic", "Detailed summaries", "CRM integration", "Handoff automation"],
        price: "₹42,000",
        dashboard: true,
      },
      {
        id: "multilingual-voice",
        name: "Multilingual Voice Agent Setup",
        tagline: "Speak every language.",
        description: "Deploy voice agents that can understand and respond in multiple languages fluently and naturally.",
        features: ["30+ languages supported", "Natural accent selection", "Real-time translation", "Cultural nuance logic"],
        price: "₹60,000",
        dashboard: true,
      },
      {
        id: "missed-call-voice",
        name: "Missed Call Recovery Voice System",
        tagline: "Never lose a lead.",
        description: "Automatically calls back missed callers within seconds to capture their inquiry before they call a competitor.",
        features: ["Instant trigger", "Personalized callback", "SMS fallback", "Recovery tracking"],
        price: "₹30,000",
        dashboard: true,
      },
      {
        id: "followup-voice",
        name: "Voice Follow-up & Reminder System",
        tagline: "Persistent engagement.",
        description: "Automated voice reminders for appointments, payment deadlines, or general lead follow-ups.",
        features: ["Custom schedules", "Dynamic data injection", "Interactive responses", "Success reporting"],
        price: "₹25,000",
        dashboard: true,
      }
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp & Chat",
    shortDescription: "Automate your entire WhatsApp Business workflow from first contact to conversion and support with intelligent AI chatbots.",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=1200&q=80",
    icon: <MessageSquare size={16} />,
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    glow: "shadow-[0_0_60px_-20px_rgba(16,185,129,0.4)]",
    gradientFrom: "from-emerald-500/10",
    services: [
      {
        id: "whatsapp-biz",
        name: "WhatsApp Business Automation",
        tagline: "Scale your reach.",
        description: "Automate your entire WhatsApp Business workflow from first contact to conversion and support.",
        features: ["Flow builder", "Catalog integration", "Auto-reply logic", "Team inbox"],
        price: "₹18,000",
        popular: true,
        dashboard: true,
      },
      {
        id: "whatsapp-ai",
        name: "WhatsApp AI Chatbot",
        tagline: "Intelligent messaging.",
        description: "An AI-powered bot that understands context and intent to provide human-like assistance on WhatsApp.",
        features: ["LLM powered", "Knowledge base sync", "Lead capture", "Human handoff"],
        price: "₹25,000",
        dashboard: true,
      },
      {
        id: "web-ai-chat",
        name: "Website AI Chatbot",
        tagline: "Convert web traffic.",
        description: "Smart chatbot for your website that answers visitor questions and captures leads in real-time.",
        features: ["Custom styling", "Page-aware logic", "Lead qualification", "Live chat toggle"],
        price: "₹20,000",
        dashboard: true,
      },
      {
        id: "sms-followup",
        name: "SMS Follow-up Automation",
        tagline: "High-open rate engagement.",
        description: "Strategic SMS sequences that keep your brand top-of-mind and drive action after an inquiry.",
        features: ["Dynamic fields", "Timed sequences", "Two-way messaging", "Link tracking"],
        price: "₹15,000",
        dashboard: true,
      },
      {
        id: "multi-channel-followup",
        name: "Multi-Channel Follow-up System",
        tagline: "Omnichannel presence.",
        description: "Orchestrate follow-ups across WhatsApp, SMS, and Email in one unified automated system.",
        features: ["Cross-channel logic", "Unified lead view", "Engagement scoring", "Smart routing"],
        price: "₹35,000",
        dashboard: true,
      },
      {
        id: "whatsapp-broadcast",
        name: "WhatsApp Broadcast Automation",
        tagline: "Mass reach, personalized.",
        description: "Send personalized broadcast messages to your entire database without getting banned.",
        features: ["Template management", "Audience segmentation", "Opt-out logic", "Campaign analytics"],
        price: "₹12,000",
        dashboard: true,
      },
      {
        id: "support-chat",
        name: "Customer Support Chat Automation",
        tagline: "Deflect support tickets.",
        description: "Automate 80% of common support inquiries with an intelligent chat system that integrates with your docs.",
        features: ["Ticket creation", "Sentiment analysis", "Help desk sync", "Resolution tracking"],
        price: "₹28,000",
        dashboard: true,
      },
      {
        id: "faq-bot",
        name: "FAQ Automation Bot",
        tagline: "Instant answers.",
        description: "A simple but effective bot that handles your most common business questions instantly.",
        features: ["Keyword matching", "Quick replies", "Rich media answers", "Link redirection"],
        price: "₹10,000",
        dashboard: true,
      }
    ],
  },
  {
    id: "leads",
    label: "Lead Capture",
    shortDescription: "End-to-end funnels and scoring systems that capture every lead, recover missed calls, and route them to your CRM instantly.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    icon: <UserCheck size={16} />,
    accent: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    glow: "shadow-[0_0_60px_-20px_rgba(59,130,246,0.4)]",
    gradientFrom: "from-blue-500/10",
    services: [
      {
        id: "ai-lead-qual-sys",
        name: "AI Lead Qualification System",
        tagline: "High-quality leads only.",
        description: "A comprehensive system to qualify leads through multiple touchpoints using AI.",
        features: ["Scoring algorithms", "Verification logic", "Profiling", "Priority routing"],
        price: "₹25,000",
        popular: true,
        dashboard: true,
      },
      {
        id: "lead-funnel",
        name: "Lead Capture Funnel",
        tagline: "Structured conversion.",
        description: "End-to-end funnel design from landing page to lead capture and automated initial response.",
        features: ["Optimized forms", "Incentive delivery", "Tracking setup", "Conversion audit"],
        price: "₹30,000",
        dashboard: true,
      },
      {
        id: "missed-call-recov",
        name: "Missed Call Recovery System",
        tagline: "Capture every call.",
        description: "A multi-touch system (Call/SMS/WhatsApp) to recover missed inbound business calls.",
        features: ["Instant alert", "Multi-stage follow-up", "Outcome tracking", "Lead assignment"],
        price: "₹20,000",
        dashboard: true,
      },
      {
        id: "speed-to-lead",
        name: "Speed-to-Lead Automation",
        tagline: "Response in seconds.",
        description: "Automation that ensures a human or AI agent engages a new lead within 60 seconds of inquiry.",
        features: ["Trigger optimization", "Instant notification", "Auto-call bridge", "Response monitoring"],
        price: "₹15,000",
        dashboard: true,
      },
      {
        id: "crm-sync",
        name: "CRM Sync & Lead Routing",
        tagline: "Organized pipeline.",
        description: "Connect all lead sources to your CRM and route them to the right team members automatically.",
        features: ["API integrations", "Round-robin routing", "Data cleaning", "Real-time sync"],
        price: "₹18,000",
        dashboard: true,
      },
      {
        id: "lead-scoring",
        name: "Lead Scoring System",
        tagline: "Identify hot prospects.",
        description: "Implement behavior-based scoring to tell your sales team exactly who to call first.",
        features: ["Action tracking", "Custom weights", "Decay logic", "Hot lead alerts"],
        price: "₹12,000",
        dashboard: true,
      },
      {
        id: "booking-automation",
        name: "Booking & Calendar Automation",
        tagline: "Self-service scheduling.",
        description: "Complete calendar automation that handles availability, booking, and reminders.",
        features: ["Multi-calendar sync", "Buffer management", "Confirmation flows", "Payment on booking"],
        price: "₹15,000",
        dashboard: true,
      },
      {
        id: "sales-followup",
        name: "Sales Follow-up Pipeline",
        tagline: "Close more deals.",
        description: "A structured automated pipeline that pushes prospects towards a final sales decision.",
        features: ["Pipeline stages", "Task automation", "Drip sequences", "Revenue tracking"],
        price: "₹22,000",
        dashboard: true,
      }
    ],
  },
  {
    id: "web",
    label: "Web Services",
    shortDescription: "High-performance websites, custom portals, and conversion-optimized landing pages engineered to establish authority and drive sales.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    icon: <Globe size={16} />,
    accent: "text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30",
    glow: "shadow-[0_0_60px_-20px_rgba(6,182,212,0.4)]",
    gradientFrom: "from-cyan-500/10",
    services: [
      {
        id: "biz-site",
        name: "Business Website",
        tagline: "Premium digital presence.",
        description: "Performance-first business website built to establish authority and convert visitors.",
        features: ["Cinematic design", "Sub-second load", "SEO optimized", "Mobile first"],
        price: "₹65,000",
        popular: true,
        dashboard: true,
      },
      {
        id: "landing-page",
        name: "High-Converting Landing Page",
        tagline: "Campaign performance.",
        description: "Single-purpose pages engineered for maximum conversion from paid or social traffic.",
        features: ["CRO layout", "Copywriting", "A/B ready", "Fast deploy"],
        price: "₹25,000",
        dashboard: true,
      },
      {
        id: "redesign",
        name: "Website Redesign",
        tagline: "Digital overhaul.",
        description: "Transform your dated site into a modern, fast, and high-converting asset.",
        features: ["UX audit", "Performance fix", "Modern stack", "Content refresh"],
        price: "₹75,000",
        dashboard: true,
      },
      {
        id: "web-pipeline",
        name: "Website + Lead Pipeline",
        tagline: "Integrated revenue.",
        description: "Full website connected to an automated lead qualification and follow-up engine.",
        features: ["Funnel design", "CRM wiring", "Auto-responder", "Tracked forms"],
        price: "₹1,10,000",
        dashboard: true,
      },
      {
        id: "booking-portal",
        name: "Booking Website / Appointment Portal",
        tagline: "Specialized for services.",
        description: "Websites focused entirely on appointment booking and client management.",
        features: ["Portal access", "Service menus", "Staff management", "Secure payments"],
        price: "₹85,000",
        dashboard: true,
      },
      {
        id: "ecom-store",
        name: "E-commerce Store",
        tagline: "Sell products online.",
        description: "Optimized storefront with inventory management and secure checkout.",
        features: ["Product catalog", "Order management", "Shipping sync", "Payment setup"],
        price: "₹95,000",
        dashboard: true,
      },
      {
        id: "custom-dashboard",
        name: "Custom Web Dashboard",
        tagline: "Visualize your data.",
        description: "Internal or client-facing dashboards to track metrics and operations.",
        features: ["API data sync", "Custom charts", "User roles", "Export tools"],
        price: "Custom",
        dashboard: true,
      },
      {
        id: "custom-portal",
        name: "Custom Web Portal",
        tagline: "Client interaction hub.",
        description: "Secure portals for clients to access files, manage accounts, or interact with your business.",
        features: ["Secure login", "File management", "Account settings", "Support access"],
        price: "Custom",
        dashboard: true,
      }
    ],
  },
  {
    id: "business-automation",
    label: "Business Automation",
    shortDescription: "Eliminate manual data entry and connect your tools into seamless workflows. Automate reporting, invoicing, and team operations.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    icon: <Settings size={16} />,
    accent: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    glow: "shadow-[0_0_60px_-20px_rgba(245,158,11,0.4)]",
    gradientFrom: "from-amber-500/10",
    services: [
      {
        id: "workflow-auto",
        name: "Workflow Automation",
        tagline: "Connect your apps.",
        description: "Eliminate manual data entry by connecting your tools into seamless workflows.",
        features: ["Tool integration", "Error handling", "Process mapping", "Scalability"],
        price: "₹30,000",
        popular: true,
        dashboard: true,
      },
      {
        id: "internal-ops",
        name: "Internal Operations Automation",
        tagline: "Streamline your team.",
        description: "Automate internal approvals, reports, and task assignments for maximum efficiency.",
        features: ["Approval flows", "Task generation", "Team alerts", "SOP automation"],
        price: "₹40,000",
        dashboard: true,
      },
      {
        id: "invoice-reminder",
        name: "Invoice & Payment Reminder Automation",
        tagline: "Get paid faster.",
        description: "Hands-free payment collection systems with intelligent escalation.",
        features: ["Auto-dispatch", "Smart reminders", "Escalation logic", "Payment tracking"],
        price: "₹16,000",
        dashboard: true,
      },
      {
        id: "onboarding-auto",
        name: "Customer Onboarding Automation",
        tagline: "Perfect first impression.",
        description: "Automate the entire welcome sequence, file requests, and setup for new clients.",
        features: ["Welcome flows", "Asset collection", "Setup checklists", "Client portal sync"],
        price: "₹25,000",
        dashboard: true,
      },
      {
        id: "reporting-auto",
        name: "Reporting Automation",
        tagline: "Data-driven decisions.",
        description: "Automatically pull data from all sources into clear, beautiful weekly or monthly reports.",
        features: ["Scheduled reports", "Data aggregation", "Visual charts", "Slack/Email delivery"],
        price: "₹20,000",
        dashboard: true,
      },
      {
        id: "custom-agent-workflow",
        name: "Custom AI Agent Workflow",
        tagline: "Bespoke AI logic.",
        description: "Specialized AI agents designed to handle specific complex internal business tasks.",
        features: ["Custom prompts", "Tool use capability", "Iterative logic", "Integration focus"],
        price: "Custom",
        dashboard: true,
      },
      {
        id: "n8n-make-setup",
        name: "n8n / Make Automation Setup",
        tagline: "Advanced infrastructure.",
        description: "Professional setup of self-hosted n8n or Make.com for your business automation needs.",
        features: ["Platform setup", "Security hardening", "Resource optimization", "Admin training"],
        price: "₹35,000",
        dashboard: true,
      },
      {
        id: "crm-auto",
        name: "CRM Automation",
        tagline: "Smart CRM management.",
        description: "Automate data entry, lead cleanup, and pipeline updates within your CRM.",
        features: ["Data enrichment", "Lead rotation", "Stage triggers", "Task cleanup"],
        price: "₹22,000",
        dashboard: true,
      },
      {
        id: "doc-contract-auto",
        name: "Document / Contract Automation",
        tagline: "Faster legal cycles.",
        description: "Generate, send, and track contracts and business documents automatically.",
        features: ["Template creation", "e-Signature sync", "Storage automation", "Tracking alerts"],
        price: "₹25,000",
        dashboard: true,
      },
      {
        id: "team-notif",
        name: "Team Notification Automation",
        tagline: "Keep team aligned.",
        description: "Smart notifications that cut through the noise and alert your team to critical events.",
        features: ["Slack/Teams sync", "Priority filtering", "Actionable alerts", "Custom triggers"],
        price: "₹12,000",
        dashboard: true,
      }
    ],
  },
  {
    id: "growth",
    label: "SEO & Growth",
    shortDescription: "Technical SEO setup and AI search optimization to rank your business on Google and AI platforms like Perplexity and Gemini.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    icon: <TrendingUp size={16} />,
    accent: "text-indigo-400",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/30",
    glow: "shadow-[0_0_60px_-20px_rgba(99,102,241,0.4)]",
    gradientFrom: "from-indigo-500/10",
    services: [
      {
        id: "seo-foundation",
        name: "SEO Foundation Setup",
        tagline: "Get discovered.",
        description: "Technical SEO setup and content strategy to rank your business on Google.",
        features: ["Keyword research", "On-page SEO", "Sitemap setup", "Index request"],
        price: "₹45,000",
        popular: true,
        dashboard: true,
      },
      {
        id: "geo-optimization",
        name: "GEO / AI Search Optimization",
        tagline: "Future-proof search.",
        description: "Optimize your brand to appear in AI search results like Perplexity, ChatGPT, and Gemini.",
        features: ["LLM mention strategy", "Schema markup", "Source validation", "Brand authority"],
        price: "₹50,000",
        dashboard: true,
      },
      {
        id: "local-seo",
        name: "Local SEO Setup",
        tagline: "Dominate your area.",
        description: "Specialized optimization to rank in the Google Map Pack and local search queries.",
        features: ["Citation building", "Local keywords", "Review strategy", "Geo-tagging"],
        price: "₹25,000",
        dashboard: true,
      },
      {
        id: "conv-audit",
        name: "Conversion & Website Audit",
        tagline: "Analyze friction.",
        description: "Deep audit of your digital assets to identify why visitors aren't converting.",
        features: ["UX analysis", "Heatmaps", "Copy audit", "Tech audit"],
        price: "₹15,000",
        dashboard: false,
      },
      {
        id: "biz-auto-audit",
        name: "Business Automation Audit",
        tagline: "Operational deep-dive.",
        description: "Mapping of operational leaks and ROI fixes for your entire business workflow.",
        features: ["Process mapping", "Cost analysis", "ROI roadmap", "Tech review"],
        price: "₹20,000",
        dashboard: true,
      },
      {
        id: "funnel-audit",
        name: "Funnel Audit",
        tagline: "Optimize every step.",
        description: "Audit of your advertising and sales funnels to improve efficiency and reduce CAC.",
        features: ["Drop-off analysis", "Message market fit", "Offer audit", "Channel review"],
        price: "₹18,000",
        dashboard: true,
      },
      {
        id: "gbp-opt",
        name: "Google Business Profile Optimization",
        tagline: "Visible local presence.",
        description: "Full setup and optimization of your GMB profile for maximum local visibility.",
        features: ["Profile completion", "Category selection", "Photo optimization", "Post setup"],
        price: "₹12,000",
        dashboard: true,
      },
      {
        id: "review-gen",
        name: "Review Generation Automation",
        tagline: "Build social proof.",
        description: "Automated systems to request, collect, and showcase positive reviews from happy clients.",
        features: ["Request timing", "Platform routing", "Negative filtering", "Widget display"],
        price: "₹15,000",
        dashboard: true,
      }
    ],
  },
  {
    id: "creative",
    label: "Creative & Content",
    shortDescription: "Professional video production, motion graphics, and AI-assisted content creation for ads, social media, and brand storytelling.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    icon: <Video size={16} />,
    accent: "text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/30",
    glow: "shadow-[0_0_60px_-20px_rgba(249,115,22,0.4)]",
    gradientFrom: "from-orange-500/10",
    services: [
      {
        id: "video-editing",
        name: "Video Editing",
        tagline: "Pro video production.",
        description: "Professional editing for reels, ads, YouTube videos, testimonials, brand videos, and social media content.",
        features: ["Color grading", "Sound design", "Text overlays", "Unlimited stock assets"],
        price: "₹25,000",
        popular: true,
        dashboard: true,
      },
      {
        id: "reel-editing",
        name: "Short-Form Reel Editing",
        tagline: "Viral fast-paced reels.",
        description: "Fast-paced reels for Instagram, YouTube Shorts, and LinkedIn content designed for high engagement.",
        features: ["Viral styles", "Captions", "Trending music", "Fast turnaround"],
        price: "₹15,000",
        dashboard: true,
      },
      {
        id: "long-form-editing",
        name: "Long-Form Video Editing",
        tagline: "Podcasts & webinars.",
        description: "Editing for podcasts, YouTube videos, webinars, tutorials, and founder-led content.",
        features: ["Multi-cam sync", "Noise removal", "Chapter markers", "Content cuts"],
        price: "₹45,000",
        dashboard: true,
      },
      {
        id: "motion-graphics",
        name: "Motion Graphics",
        tagline: "Animated visuals.",
        description: "Animated graphics, transitions, explainer visuals, title sequences, UI animations, and brand motion assets.",
        features: ["2D/3D animation", "Lower thirds", "Intro/Outros", "UI previews"],
        price: "₹35,000",
        dashboard: true,
      },
      {
        id: "explainer-videos",
        name: "2D Explainer Videos",
        tagline: "Simplify your offer.",
        description: "Animated explainers for services, products, offers, onboarding, and landing pages.",
        features: ["Scriptwriting", "Voiceover", "Custom illustration", "Full animation"],
        price: "₹65,000",
        dashboard: true,
      },
      {
        id: "brand-promo",
        name: "Brand Promo Videos",
        tagline: "High-impact storytelling.",
        description: "High-impact promotional videos for websites, ads, launch campaigns, and social media.",
        features: ["Cinematic style", "Emotional hooks", "Stock curation", "Call-to-action focus"],
        price: "₹85,000",
        dashboard: true,
      },
      {
        id: "ai-content",
        name: "AI Content Creation",
        tagline: "AI-powered engagement.",
        description: "AI-assisted content for posts, scripts, captions, blogs, ads, carousels, and campaign ideas.",
        features: ["Custom personas", "Daily ideation", "SEO copy", "Platform adaptation"],
        price: "₹20,000",
        dashboard: true,
      },
      {
        id: "ai-ad-creative",
        name: "AI Ad Creative Generation",
        tagline: "Testing at scale.",
        description: "AI-assisted ad concepts, image/video variations, hooks, scripts, and creative testing assets.",
        features: ["Multi-variant gen", "Visual hooks", "Ad script engine", "Data-driven creative"],
        price: "₹30,000",
        dashboard: true,
      },
      {
        id: "social-content-sys",
        name: "Social Media Content System",
        tagline: "Monthly content engine.",
        description: "Monthly content planning, post ideas, scripts, captions, design direction, and publishing-ready content.",
        features: ["Content calendar", "Strategy docs", "Team handoff", "Batch production"],
        price: "₹45,000",
        dashboard: true,
      },
      {
        id: "personal-brand",
        name: "Founder / Personal Brand Content",
        tagline: "Authority building.",
        description: "Content strategy and editing for founders, coaches, consultants, and agency owners.",
        features: ["Ghostwriting", "Video coaching", "Brand tone setup", "Distribution strategy"],
        price: "₹60,000",
        dashboard: true,
      },
      {
        id: "repurposing-sys",
        name: "Content Repurposing System",
        tagline: "One source, many assets.",
        description: "Turn one long video, podcast, or webinar into reels, posts, carousels, newsletters, and blogs.",
        features: ["Content chopping", "Format adaptation", "Cross-post automation", "Efficiency engine"],
        price: "₹35,000",
        dashboard: true,
      },
      {
        id: "avatar-content",
        name: "AI Avatar / Voiceover Content",
        tagline: "AI spokesperson.",
        description: "AI-generated spokesperson videos, voiceovers, multilingual content variants, and narration assets.",
        features: ["Custom avatars", "Voice cloning", "Lip-sync setup", "Multilingual scale"],
        price: "₹40,000",
        dashboard: true,
      }
    ],
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

function ServicesPageInner() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(() => {
    const requestedCategory = searchParams.get("category");
    return CATEGORIES.some((category) => category.id === requestedCategory)
      ? requestedCategory!
      : "voice";
  });
  const category = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-violet-500/30 font-sans overflow-x-hidden">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-violet-600/10 to-transparent blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4 font-medium">
            Huygen Studios
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.05em] mb-6 leading-[0.95] bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Built for Scale.<br />Designed for Impact.
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Every service ships with a{" "}
            <span className="text-white/70 inline-flex items-center gap-1.5">
              <LayoutDashboard size={14} className="inline" />
              client dashboard
            </span>{" "}
            so you control and monitor your systems directly.
          </p>
        </motion.div>

        {/* Apple-style Interactive Hero */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full mb-24 items-center lg:items-start">
          
          {/* Left: Interactive Pills */}
          <div className="flex flex-col gap-3 w-full lg:w-[340px] shrink-0 z-20">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <motion.div
                  key={cat.id}
                  layout
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ borderRadius: isActive ? 24 : 9999 }}
                  className={`overflow-hidden cursor-pointer backdrop-blur-xl border transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive 
                      ? 'bg-[#1c1c1e] border-white/10 p-6 shadow-2xl w-full' 
                      : 'bg-[#1c1c1e]/80 hover:bg-[#2c2c2e] border-white/5 pl-2 pr-5 py-2 w-max flex items-center gap-3'
                  }`}
                >
                  {isActive ? (
                    <motion.div
                      layout="position"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      <p className="text-[15px] text-[#86868b] leading-relaxed">
                        <strong className="text-white font-semibold">{cat.label}.</strong> {cat.shortDescription}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div layout="position" className="flex items-center gap-3 w-full">
                      <div className="w-7 h-7 rounded-full border border-[#424245] flex items-center justify-center bg-white/[0.02]">
                        <div className={`${cat.accent} opacity-80`}>
                          {cat.icon}
                        </div>
                      </div>
                      <span className="text-[15px] font-medium text-white/90 whitespace-nowrap">{cat.label}</span>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Right: Changing Image Area */}
          <div className="w-full flex-1 h-[400px] lg:h-[600px] relative rounded-[32px] overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/50">
            <AnimatePresence mode="wait">
              <motion.img
                key={category.image}
                src={category.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                alt={category.label}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-10 left-10 right-10 z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>{category.label}</h2>
              <div className="flex items-center gap-4">
                <p className="text-white/80 max-w-lg text-sm md:text-base font-medium">{category.services.length} specialized services available.</p>
                <div className="h-px bg-white/20 flex-1 max-w-[100px]" />
              </div>
            </div>
          </div>
        </div>




        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 flex flex-col items-center text-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent mb-8" />
          <p className="text-white/30 text-sm mb-3">
            Ready to build your operating layer?
          </p>
          <a
            href="https://wa.me/919262102440?text=Hey%20Huygen%20Studios%2C%20I%20want%20to%20start%20a%20project!"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#f63a39] to-[#7c4e9b] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start a project
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </section>
      <StickyBottomMenu />
    </main>
  );
}

export default function ServicesPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <ServicesPageInner />
    </React.Suspense>
  );
}
