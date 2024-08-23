import React from 'react'
import Mainslider from '../MainSlider/Mainslider'
import CategorySlider from '../CategorySlider/CategorySlider'
import RecentProducts from '../RecentProducts/RecentProducts'

export default function Home() {
  return (
    <>
    {/* <Mainslider/> */}
    <CategorySlider/>
    <RecentProducts/>
    </>
  )
}
