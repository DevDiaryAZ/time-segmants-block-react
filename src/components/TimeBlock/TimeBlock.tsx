import React, { useState, useCallback, useEffect, useRef, useReducer } from 'react';
import { Slider } from '../Slider/Slider';
import { Mark } from './Mark/Mark';
import { Years } from '../Years/Years';
import { formatNumber, getStyleNumber } from '../../utils/helpers';
import { gsap } from 'gsap';
import * as styleVars from '../../styles/_variables.module.scss';

interface Slide {
  year: number;
  text: string;
}

interface DataElement {
  id: number;
  number: number;
  title: string;
  years: number[];
  slides: Slide[];
}

interface State {
  activeElement: DataElement;
  isMobile: boolean;
  isTablet: boolean;
}

type Action =
  | { type: 'SET_ACTIVE_ELEMENT'; payload: DataElement }
  | { type: 'SET_MOBILE'; payload: boolean }
  | { type: 'SET_TABLET'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ACTIVE_ELEMENT':
      return { ...state, activeElement: action.payload };
    case 'SET_MOBILE':
      return { ...state, isMobile: action.payload };
    case 'SET_TABLET':
      return { ...state, isTablet: action.payload };
    default:
      return state;
  }
};

interface TimeBlockProps {
  data: DataElement[];
}

export const TimeBlock: React.FC<TimeBlockProps> = ({ data }) => {
  const initialState: State = {
    activeElement: data[0],
    isMobile: window.innerWidth <= getStyleNumber(styleVars.breakpointMobile),
    isTablet: window.innerWidth <= getStyleNumber(styleVars.breakpointTablet),
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeElement, isMobile, isTablet } = state;
  const [markAngles, setMarkAngles] = useState<number[]>([]);
  const rotationRef = useRef(0);

  const handleClick = useCallback(
    (number: number, index: number) => {
      const targetAngle = calculateTargetAngle(index);

      gsap.to('.circle', {
        rotation: rotationRef.current - targetAngle,
        duration: 1.2,
      });

      rotationRef.current -= targetAngle;

      dispatch({ type: 'SET_ACTIVE_ELEMENT', payload: data.find((el) => el.number === number)! });
    },
    [activeElement, data],
  );

  const calculateTargetAngle = (index: number): number => {
    const anglePerMark = 360 / data.length;
    let targetAngle = (index - (activeElement.id - 1)) * anglePerMark;

    if (Math.abs(targetAngle) > 180) {
      targetAngle = targetAngle > 0 ? targetAngle - 360 : targetAngle + 360;
    }

    return targetAngle;
  };

  const changeYears = (direction: 'next' | 'prev') => {
    const newElementNumber = activeElement.number + (direction === 'next' ? 1 : -1);
    handleClick(newElementNumber, newElementNumber - 1);
  };

  const updateMarkAngles = () => {
    const activeIndex = activeElement.id - 1;
    const angles = new Array(data.length).fill(1);

    // Генерируем углы, начиная с активного элемента
    let j = 0;
    for (let i = activeIndex; i < data.length; i++) {
      angles[i] = (360 / data.length) * j - 60;
      j++;
    }

    for (let i = 0; i < activeIndex; i++) {
      angles[i] = (360 / data.length) * j - 60;
      j++;
    }

    setMarkAngles(angles);
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: 'SET_MOBILE',
        payload: window.innerWidth <= getStyleNumber(styleVars.breakpointMobile),
      });
      dispatch({
        type: 'SET_TABLET',
        payload: window.innerWidth <= getStyleNumber(styleVars.breakpointTablet),
      });

      updateMarkAngles();
    };

    window.addEventListener('resize', handleResize);
    updateMarkAngles();

    if (isMobile || isTablet) {
      // убираем угол поворота на адаптиве
      rotationRef.current = 0;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, isTablet]);

  return (
    <section className="container">
      <div className="wrapper">
        <div className="time-block">
          <div className="title-wrapper title-line">
            <div className="h1">Исторические даты</div>
          </div>
          {!isTablet && (
            <>
              <div className="middle-vertical-line"></div>
              <div className="middle-horizont-line"></div>
              <div className="circle">
                {data.map((elem, index) => {
                  const angle = markAngles[index];
                  const isActive = elem.number === activeElement.number;

                  return (
                    <Mark
                      key={elem.id}
                      elem={elem}
                      angle={angle}
                      isActive={isActive}
                      onClick={() => handleClick(elem.number, index)}
                      circleAngle={rotationRef.current}
                    />
                  );
                })}
              </div>
            </>
          )}
          <Years years={activeElement.years} />
        </div>
        <div className="sliders-block">
          <div className="controls">
            <div className="count__wrapper">
              <span className="count">{formatNumber(activeElement.number)}</span>/
              <span className="count">{formatNumber(data.length)}</span>
            </div>
            <div className="button__wrapper">
              <button
                className="button__arrow button__arrow--prev"
                onClick={() => changeYears('prev')}
                disabled={activeElement.number === 1}
              />
              <button
                className="button__arrow button__arrow--next"
                onClick={() => changeYears('next')}
                disabled={activeElement.number === data.length}
              />
            </div>
          </div>
          <Slider slides={activeElement.slides} isMobile={isMobile} isTablet={isTablet} />
        </div>
      </div>
    </section>
  );
};
