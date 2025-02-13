"use client"
import React, { useEffect } from 'react';
import "../splashStyle.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter hook

export default function Splash() {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Set a timeout to redirect after 7 seconds (or adjust the time as needed)
    const timer = setTimeout(() => {
      router.push('/home'); // Redirect to /home
    }, 5000); // 7000ms = 7 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [router]);

  return (
    <section className="welcome">
      <span id="splash-overlay" className="splash"></span>
      <div className="welcome">
        <span id="welcome" className="z-depth-4"></span>
      </div>
      <div id="welcome_logo">
        <Image src="/quanta.png" alt="dot95" height={300} width={300} />
      </div>
    </section>
  );
}
