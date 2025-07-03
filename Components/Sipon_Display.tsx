import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { SIPON_PRODUCTS } from '@/constants';
import Link from 'next/link';

const BeveragePricing = () => {
  const mango250 = SIPON_PRODUCTS[0];
  const mango500 = SIPON_PRODUCTS[1];
  const mango2L = SIPON_PRODUCTS[4];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id='Prices' className="bg-gradient-to-b from-blue-50 to-cyan-100 py-16 relative">
      <div className="absolute inset-0 bg-yellow-500 opacity-5 pattern-dots pattern-yellow-500 pattern-size-4 pattern-opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-extrabold text-blue-600 bg-white/80 inline-block px-8 py-2 rounded-full shadow-md transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            Our Sipon Beverage Selection
          </h2>
          <p className={`mt-4 text-lg text-gray-600 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Choose your favorite Mango drink
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mango 250 ml */}
          <div
            className={`p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 bg-gradient-to-br from-yellow-500 to-amber-600 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-yellow-400/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 relative z-10">
              <div className="transition-transform duration-700 hover:scale-105 flex justify-center">
                <Image src={mango250.icon} alt={mango250.title} width={200} height={150} className="object-contain" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-4">{mango250.title}</h3>
              <p className="mt-2 text-gray-600">{mango250.description}</p>
              <p className="mt-4 text-2xl font-bold text-blue-600">{mango250.price}</p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-700">Made with real mangoes</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-700">{mango250.psRate}</span>
                </li>
              </ul>

              <Link href="/smart-shopping" passHref>
                <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-102 group">
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                    Buy Now
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Mango 500 ml */}
          <div
            className={`p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 bg-gradient-to-br from-amber-500 to-orange-600 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-orange-400/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s' }}></div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 relative z-10">
              <div className="transition-transform duration-700 hover:scale-105 flex justify-center">
                <Image src={mango500.icon} alt={mango500.title} width={200} height={150} className="object-contain" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-4">{mango500.title}</h3>
              <p className="mt-2 text-gray-600">{mango500.description}</p>
              <p className="mt-4 text-2xl font-bold text-blue-600">{mango500.price}</p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-700">Made with real mangoes</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-700">{mango500.psRate}</span>
                </li>
              </ul>

              <Link href="/smart-shopping" passHref>
                <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-102 group">
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                    Buy Now
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Mango 2.0L */}
          <div
            className={`p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s' }}></div>
            <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-red-400/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 relative z-10">
              <div className="transition-transform duration-700 hover:scale-105 flex justify-center">
                <Image src={mango2L.icon} alt={mango2L.title} width={200} height={150} className="object-contain" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-4">{mango2L.title}</h3>
              <p className="mt-2 text-gray-600">{mango2L.description}</p>
              <p className="mt-4 text-2xl font-bold text-blue-600">{mango2L.price}</p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-700">Made with real mangoes</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-700">{mango2L.psRate}</span>
                </li>
              </ul>

              <Link href="/smart-shopping" passHref>
                <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-102 group">
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                    Buy Now
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeveragePricing;
