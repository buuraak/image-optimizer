import Image from "next/image";

export default function Backdrop() {
    return (
        <Image
            src="/backdrop.webp"
            alt="backdrop"
            width={1920}
            height={1080}
            sizes="100vw"
            className="absolute h-full w-full top-0 left-0 z-[-1] object-cover"
        />
    );
}
