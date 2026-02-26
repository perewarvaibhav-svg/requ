import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AgriSaathi AI — Intelligent Farming Copilot",
    description:
        "AI-powered governance and financial assistant for Indian farmers. Find schemes, analyze contracts, track market prices, and automate applications with LLM intelligence.",
    keywords: [
        "AgriSaathi",
        "AI farming assistant",
        "government schemes",
        "agricultural loans",
        "market prices",
        "crop advisory",
        "PM-KISAN",
        "farmer technology",
    ],
    openGraph: {
        title: "AgriSaathi AI — Intelligent Farming Copilot",
        description:
            "A unified AI layer between farmers and government + financial systems.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Bebas+Neue&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
