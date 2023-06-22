import Uploader from "./Uploader";

const IntroHeader = () => {
    return (
        <header className="flex justify-center flex-col item-center mx-auto min-h-screen">
            <div>
                <h1 className="font-extrabold lg:max-w-[25ch] m-auto  text-2xl sm:text-4xl lg:text-5xl text-center tracking-tight leading-tight">
                    Boost Your Website's Performance with Image Optimization
                </h1>
                <p className="tracking-tight leading-tight text-md pt-5">
                    Supercharge loading speeds with optimized images, delivering
                    a seamless user experience.
                </p>
            </div>
            <div className="pt-5">
                <Uploader />
            </div>
        </header>
    );
};

export default IntroHeader;
