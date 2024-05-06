import React from 'react'
import LikeCard from "../../components/LikeCard/LikeCard.jsx"
function Like() {
  return (
    <section className='font-body flex flex-col items-center min-h-[90vh] pb-20'>
        <h2 className='py-6 font-medium text-2xl text-slate-600'>My Wishlist</h2>
        <LikeCard />
    </section>
  )
}

export default Like