import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Offer = () => {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  

  return (
    <section 
      id='Offers' 
      className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-cyan-100 py-10"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center p-10 border-8 border-yellow-500 rounded-lg bg-white bg-opacity-90 shadow-2xl scale-105 mb-10"
      >
        <motion.h1 
          initial={{ scale: 0.8 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-5xl font-extrabold text-yellow-600 mb-4 animate-pulse"
        >
          Limited Time Offer!
        </motion.h1>
        <p className="text-2xl font-semibold text-red-600 mb-4">Hurry Up! Offer Ends In:</p>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="text-3xl font-bold text-red-500 mb-6"
        >
          {formatTime(timeLeft)}
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.3 }}
        >
          <Image 
            src="/1ltr-bint.png" 
            alt="1L Bindu Bottle" 
            width={220} 
            height={220} 
            className="mx-auto mb-6"
          />
        </motion.div>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          transition={{ duration: 0.3 }}
          className="px-10 py-4 bg-yellow-500 text-white text-xl font-bold rounded-full hover:bg-yellow-600 transition-colors duration-300 shadow-lg"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Offer;