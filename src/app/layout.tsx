import "./../styles/globals.css";
import { Inter } from "next/font/google";

export const metadata = {
    title: "Boost Your Website's Performance with Image Optimization",
    description: "Supercharge loading speeds with optimized images, delivering a seamless user experience.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
