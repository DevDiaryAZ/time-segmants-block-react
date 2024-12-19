import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import './Slider.scss';

interface Slide {
  year: number;
  text: string;
}

interface SliderProps {
  slides: Slide[];
  isMobile: boolean;
  isTablet: boolean;
}

export const Slider: React.FC<SliderProps> = React.memo(({ slides, isMobile, isTablet }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentSlides, setCurrentSlides] = useState<Slide[]>(slides);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    gsap.to(sliderRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentSlides(slides);
        swiperInstance?.slideTo(0); // Возвращаем слайдер на первый слайд
        swiperInstance?.update(); // Обновляем слайды
        // слайдер с новыми данными
        gsap.to(sliderRef.current, {
          opacity: 1,
          duration: 0.5,
        });
      },
    });
  }, [slides]);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();
    }
  }, [swiperInstance, isMobile, isTablet]);

  return (
    <div className="slider-wrapper">
      <div ref={sliderRef} style={{ opacity: 1, transition: 'opacity 0' }}>
        <div className="slider__border-top"></div>
        <Swiper
          slidesPerView={isTablet ? (isMobile ? 1.5 : 3) : 3}
          spaceBetween={isTablet ? 10 : 30}
          navigation={{
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          freeMode={true}
          modules={[Navigation, FreeMode, Pagination]}
          className="mySwiper"
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
          }}>
          {currentSlides.map((slide, index) => (
            <SwiperSlide key={`${slide.year}-${index}`}>
              <div className="slide__year">{slide.year}</div>
              <div className="slide__text">{slide.text}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="slider-prev swiper-button-prev"></div>
      <div className="slider-next swiper-button-next"></div>

      <div className="swiper-pagination"></div>
    </div>
  );
});
