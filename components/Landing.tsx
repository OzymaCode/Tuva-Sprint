import Image from "next/image";
import Button from "./Button";

const Landing = () => {
  return (
    <section className="sticky top-0 flex h-screen items-center justify-around">
      <div className="md:ml-5">
        <h1 className="text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Fitness
          </span>
          <span className="block">From Flexibility</span>
          <span className="block">Powered By Will</span>
        </h1>
        <div className="space-x-8 pt-5">
          <Button title="Buy Now" />
          <a href="" className="link">
            Learn More
          </a>
        </div>
      </div>
      <div className="relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[650px]">
        <Image
          src="/shoe4.jpg"
          alt="shoe photograph"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
};

export default Landing;
