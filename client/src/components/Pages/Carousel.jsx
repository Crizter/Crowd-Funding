import React from 'react';
import fundmeImage from '../../assets/fundmeImage.png';

function Carousel() {
  return (
    <>
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* Item 1 */}
          <div className=" duration-700 ease-in-out" data-carousel-item>
            <img
              src= {fundmeImage}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
        </div>
     
      </div>
    </>
  );
}

export default Carousel;
