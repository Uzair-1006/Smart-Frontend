This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
// import React, { useState } from 'react';
// import "../app/globals.css";
// import Image from 'next/image';

// const Products = () => {
//   const [showFullContent, setShowFullContent] = useState(false);

//   const handleToggleContent = () => {
//     setShowFullContent(!showFullContent);
//   };

//   const limitedsipContent = `Sipon Mango Juice - A Taste of Pure Delight

//   Quench your thirst and indulge in the refreshing taste of Sipon Mango Juice, made from the finest, sun-ripened mangoes. Sipon Mango Juice captures the essence of tropical mangoes in every bottle, delivering a burst of flavor that’s both sweet and tangy. Why Choose Sipon Mango Juice? Rich Flavor: Sipon Mango Juice offers a rich and authentic mango taste, perfect for any time of the day. Natural Goodness: Made with high-quality mangoes, this juice is packed with natural vitamins and antioxidants, making it a healthy choice for you and your family...`;
  

//   const fullsipContent = `Sipon Mango Juice - A Taste of Pure Delight

// Quench your thirst and indulge in the refreshing taste of Sipon Mango Juice, made from the finest, sun-ripened mangoes. Sipon Mango Juice captures the essence of tropical mangoes in every bottle, delivering a burst of flavor that’s both sweet and tangy.

// Why Choose Sipon Mango Juice?

// Rich Flavor: Sipon Mango Juice offers a rich and authentic mango taste, perfect for any time of the day.
// Natural Goodness: Made with high-quality mangoes, this juice is packed with natural vitamins and antioxidants, making it a healthy choice for you and your family.
// Versatile Enjoyment: Enjoy Sipon Mango Juice on its own, mix it into smoothies, or use it as a base for cocktails and mocktails. It’s a versatile beverage that adds a tropical twist to any drink.

// Perfect for Every Occasion:
// Whether you're cooling down on a hot summer day, hosting a party, or just enjoying a quiet moment, Sipon Mango Juice is the perfect companion. Its vibrant color and delicious taste will brighten up your day and leave you craving more.

// Experience the Taste of Summer:
// With Sipon Mango Juice, you can enjoy the taste of summer all year round. Each sip is like biting into a juicy, ripe mango, offering a refreshing escape from the ordinary.

// Available in Multiple Sizes:
// Sipon Mango Juice is available in convenient sizes, from single-serving bottles to larger family packs, ensuring you have the perfect amount for any occasion.`;


//   return (
//     <section className="p-3 m-3">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center text-xl font-bold mb-4">Our Products</h1>
//             <div className="border-2 p-3 flex items-center">
//               <div className="flex flex-col justify-center">
//                 <h3 className="font-semibold ml-2 text-lg mb-2">Sipon Products</h3>
//                 <div className='flex'>
//                   <Image 
//                     src="/Sipon-Logo.png" 
//                     width={300} 
//                     height={300} 
//                     alt="Sipon Logo" 
//                     className="pb-2 pl-2"
//                   />
//                   <p className='ml-4'>
//                     {showFullContent ? fullsipContent : limitedsipContent}
//                   </p>
//                 </div>
//                 <button 
//                   onClick={handleToggleContent} 
//                   className="ml-4 mt-2 text-blue-500 hover:underline"
//                 >
//                   {showFullContent ? "Show Less" : "Read More"}
//                 </button>
//                 </div>
//               <div className="flex flex-col justify-center">
//                 <h3 className="font-semibold ml-2 text-lg mb-2">Bindu Products</h3>
//                 <div className='flex'>
//                   <Image 
//                   src="/Bindu-logo.png"
//                   width={300}
//                   height={300}
//                   alt=''
//                   />
//                 </div>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Products;
