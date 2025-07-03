import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BINDU_PRODUCTS } from '@/constants';

const BinduProducts = () => {
  const selectedProducts = [0, 5, 4].map(index => BINDU_PRODUCTS[index]);

  return (
    <section id='Prices' className="bg-gradient-to-b from-blue-50 to-cyan-100 py-16 relative">
      <div className="absolute inset-0 bg-green-500 opacity-5 pattern-dots pattern-green-500 pattern-size-4 pattern-opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-600 bg-white/80 inline-block px-8 py-2 rounded-full shadow-md">
            Our Bindu Beverage Selection
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose your favorite Bindu drink
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedProducts.map((product, index) => (
            <div key={index} className="p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden opacity-100 translate-y-0">              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 relative z-10">
                <div className="transition-transform duration-700 hover:scale-105 flex justify-center">
                  <Image src={product.icon || '/placeholder.png'} alt='' width={200} height={200} className="object-contain w-[150px] h-[150px] mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{product.title}</h3>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <p className="mt-4 text-2xl font-bold text-blue-600">{product.price}</p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="ml-3 text-gray-700">Refreshing jeera flavor</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="ml-3 text-gray-700">{product.psRate}</span>
                  </li>
                </ul>

                {/* Buy Now Button linking to /smart-shopping */}
                <Link href="/smart-shopping" passHref>
                  <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-102 group">
                    <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">Buy Now</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BinduProducts;
