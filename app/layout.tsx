import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Attendance Pro",
  description: "Smart Attendance Portal for Students & Lecturers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Material Symbols */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script dangerouslySetInnerHTML={{
            __html: `
                tailwind.config = {
                    darkMode: "class",
                    theme: {
                        extend: {
                            colors: {
                                "primary": "#0d7ff2",
                                "background-light": "#f5f7f8",
                                "background-dark": "#101922",
                            },
                            fontFamily: {
                                "display": ["Inter", "sans-serif"]
                            },
                            animation: {
                                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                                'scan': 'scan 2.5s infinite linear',
                                'shimmer': 'shimmer 1.5s infinite linear',
                            },
                            keyframes: {
                                scan: {
                                    '0%': { top: '10%', opacity: '0' },
                                    '10%': { opacity: '1' },
                                    '90%': { opacity: '1' },
                                    '100%': { top: '90%', opacity: '0' },
                                },
                                shimmer: {
                                    '0%': { transform: 'translateX(-100%)' },
                                    '100%': { transform: 'translateX(200%)' },
                                }
                            }
                        },
                    },
                }
            `
        }}></script>
        <style dangerouslySetInnerHTML={{
            __html: `
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
                .material-symbols-outlined.filled {
                    font-variation-settings: 'FILL' 1;
                }
                body {
                    background-color: #f5f7f8;
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `
        }}></style>
      </head>
      <body>{children}</body>
    </html>
  );
}
