import IntroSection from "../components/IntroHeader";
import Backdrop from "../components/Backdrop";
import { Inter } from "next/font/google";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main className={`mx-auto container text-center px-6 ${inter.className}`}>
            <Header />
            <IntroSection />
            <Backdrop />
        </main>
    );
}
