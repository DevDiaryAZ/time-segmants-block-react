import React, { useState, useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as styleVars from '../../../styles/_variables.module.scss';

interface MarkProps {
  elem: {
    id: number;
    number: number;
    title: string;
  };
  angle: number;
  isActive: boolean;
  onClick: () => void;
  circleAngle: number;
}

export const Mark: React.FC<MarkProps> = React.memo(
  ({ elem, angle, isActive, onClick, circleAngle }) => {
    const [hoverNumber, setHoverNumber] = useState<any>(null);
    const markRef = useRef<HTMLDivElement>(null);
    const numContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const handleMouseEnter = (number: number) => {
      setHoverNumber(number);
    };

    const handleMouseLeave = (number: number) => {
      if (hoverNumber === number) {
        setHoverNumber(null);

        if (numContainerRef.current) {
          gsap.to(numContainerRef.current, {
            duration: 0.5,
            opacity: 1,
            scale: 1,
            backgroundColor: styleVars.whiteColor,
          });
        }
      }
    };

    useEffect(() => {
      const timeline = gsap.timeline();
      timeline.to(markRef.current, {
        duration: 1.2,
        rotation: -circleAngle,
        overwrite: 'auto',
      });

      if (isActive) {
        timeline.to(textRef.current, { opacity: 1 });
      } else {
        timeline.to(textRef.current, { opacity: 0 });
      }
    }, [elem, angle, isActive, onClick, circleAngle]);

    useEffect(() => {
      const isVisible = isActive || hoverNumber !== null;

      const timeline = gsap.timeline();
      if (isVisible) {
        gsap.to(numContainerRef.current, {
          opacity: 1,
        });
        gsap.to(numContainerRef.current, {
          duration: 0.5,
          scale: 1,
          backgroundColor: styleVars.whiteColor,
        });
      } else {
        timeline.to(numContainerRef.current, {
          duration: 0.5,
          backgroundColor: styleVars.primaryColor,
          stagger: 0,
        });

        timeline.to(markRef.current, { duration: 0.5, backgroundColor: styleVars.primaryColor }, 0);

        timeline.to(
          numContainerRef.current,
          {
            duration: 0.5,
            transform: 'translate(0) scale(0.1, 0.1)',
          },
          0,
        );
        timeline.to(
          textRef.current,
          {
            opacity: 0,
          },
          0,
        );

        timeline.to(numContainerRef.current, {
          duration: 0.5,
          opacity: 0,
        });
      }

      return () => {
        timeline.kill();
      };
    }, [isActive, hoverNumber]);

    return (
      <div
        ref={markRef}
        className={isActive ? 'mark active' : 'mark'}
        style={{
          transform: `rotate(${angle}deg) translate(264px) rotate(${-(angle + circleAngle)}deg)`,
        }}
        onClick={onClick}
        onMouseEnter={() => handleMouseEnter(elem.number)}
        onMouseLeave={() => handleMouseLeave(elem.number)}>
        <div
          ref={numContainerRef}
          className="mark__num-container"
          style={{
            scale: 0.1,
            opacity: 0,
            backgroundColor: styleVars.primaryColor,
            display: 'block',
          }}>
          <span className="mark__num">{elem.number}</span>
          <span ref={textRef} className="mark__text" style={{ opacity: 1 }}>
            {elem.title}
          </span>
        </div>
      </div>
    );
  },
);
