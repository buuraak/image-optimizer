import IntroSection from "../components/IntroHeader";
import Backdrop from "../components/Backdrop";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`mx-auto container text-center px-6 ${inter.className}`}
        >
            <IntroSection />
            <Backdrop />
        </main>
    );
}
