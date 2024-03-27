"use client"
// Main homepage component.
import { React, useContext, useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/heroSection';
import Footer from "@/components/footer";
import FeaturesSection from '@/components/featuresSection';
import HowItWorksComponent from '@/components/howItWorks';
import AboutUsComponent from '@/components/aboutUs';
import { AuthContext } from '@/components/auth/AuthContext';
import { useRouter } from 'next/navigation';


const HomePage = () => {

  const { isLoggedIn } = useContext(AuthContext);
  const [ isClient, setIsClient ] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  })

  const handleGetRoastedClick = () => {
    if (isClient && isLoggedIn == true) {
      router.push("/c");
    } else {
      router.push("/auth/signin");
    }
  }

  return (
    <>
      <section className="hero-bg mt-[-9px] pb-10 overflow-hidden">
        <div className='hero min-h-min h-max w-screen relative bg-opacity-8'>
          <Navbar home={true} />
          <HeroSection />
        </div>
      </section>
      <section id='features' className='max-w-[1000px] mx-auto'>
        <FeaturesSection />
      </section>
      <section id='about'>
        <AboutUsComponent />
      </section>
      <section id='how-it-works'>
        <HowItWorksComponent />
      </section>
      <section className="max-w-[600px] mx-auto my-20 px-6 md:px-0 text-center md:text-left">
        <h1 className="text-[30px]">Ready to add a touch of humor to your coding adventures?</h1>
        <p className="text-center text-[20px] py-5">
          Join Roast My Code today and let our AI roasting bot turn your code 
          reviews into a delightful experience!
        </p>
        <div className="max-w-max mx-auto flex flex-row gap-5">
          {isClient && isLoggedIn == false && <button className="bg-blue-700 text-white mx-auto py-3 px-5 rounded-xl">Sign Up</button>}
          <button 
            className="bg-red-600 text-white mx-auto py-3 px-5 rounded-xl"
            onClick={handleGetRoastedClick}
          >
            Get Roasted!
          </button>
        </div>
      </section>
      <section className="bg-gray-100">
        <Footer />
      </section>
    </>
  );
};

export default HomePage;
