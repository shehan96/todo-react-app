import React, { useEffect, useState } from 'react';
import './LazyImage.css';
import { useIntersectionObserver } from '../../hooks';

/*
 * Image needs a ratio of 1:1 to fit the SVG placeholder.
 * This could be made configurable.
 */
export const LazyImage = ({ src, alt, color = '#F3F5F7' }) => {
  const { intersectionRef, isIntersected } = useIntersectionObserver();
  const url = isIntersected ? src : '';
  const [dimensions, setDimension] = useState({
    width: 0,
    height: 0,
  });

  const getDimentions = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject();
      img.src = url;
    });
  };

  useEffect(() => {
    if (url != '') {
      getDimentions(url)
        .then((img) => {
          setDimension({
            width: img.width,
            height: img.height,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isIntersected]);

  return (
    <div className='lazy-image'>
      <div
        ref={intersectionRef}
        className='lazy-image_image'
        style={{ backgroundImage: `url("${url}")` }}
        aria-label={alt}
      />
      <svg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
        <rect fill={color} height='1' width='1' />
      </svg>
    </div>
  );
};
