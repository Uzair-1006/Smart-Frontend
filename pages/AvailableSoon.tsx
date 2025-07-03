import Footer from '@/Components/Footer'
import Water from '@/Components/Water'
import Link from 'next/link'
import React from 'react'

const AvailableSoon = () => {
  return (
    <section className='mt-40'>
      <Water/>
      <p className="mb-2">
            <Link href="/" className="text-lg font-bold hover:underline">Back to Home</Link>
      </p>
    </section>
  )
}

export default AvailableSoon