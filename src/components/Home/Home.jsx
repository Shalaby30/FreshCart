import React, { useContext, useEffect } from 'react';
import Mainslider from '../MainSlider/Mainslider';
import CategorySlider from '../CategorySlider/CategorySlider';
import RecentProducts from '../RecentProducts/RecentProducts';
import { Helmet } from 'react-helmet';
import { WishlistContext } from '../../Context/WishlistContext';

export default function Home() {
  const { getWishlist } = useContext(WishlistContext);

  useEffect(() => {
    getWishlist(); 
  }, [getWishlist]);

  return (
    <>
      <Mainslider/>
      <CategorySlider />
      <RecentProducts />
      <Helmet>
        <title>Home</title>
      </Helmet>
    </>
  );
}
