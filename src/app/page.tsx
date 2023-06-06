import IntroSection from "../components/IntroHeader";
import Backdrop from "../components/Backdrop";
export default function Home() {
    return (
            <main className="mx-auto container text-center px-6">
                <IntroSection />
                <Backdrop />
            </main>
    );
}
