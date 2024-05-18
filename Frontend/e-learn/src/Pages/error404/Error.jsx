import React, { useEffect, useRef } from 'react';
import classes from './Error.module.css';

const Error = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.pageX - window.innerWidth / 2;
            const y = e.pageY - window.innerHeight / 2;

            if (titleRef.current) {
                titleRef.current.style.setProperty('--x', `${x}px`);
                titleRef.current.style.setProperty('--y', `${y}px`);
            }
        };

        const handleMouseMoveShadow = (e) => {
            const x = e.pageX - window.innerWidth / 2;
            const y = e.pageY - window.innerHeight / 2;

            const rad = Math.atan2(y, x).toFixed(2);
            const length = Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 10);

            const x_shadow = Math.round(length * Math.cos(rad));
            const y_shadow = Math.round(length * Math.sin(rad));

            if (titleRef.current) {
                titleRef.current.style.setProperty('--x-shadow', `${-x_shadow}px`);
                titleRef.current.style.setProperty('--y-shadow', `${-y_shadow}px`);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        titleRef.current.addEventListener('mousemove', handleMouseMoveShadow);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            titleRef.current.removeEventListener('mousemove', handleMouseMoveShadow);
        };
    }, []); // Empty dependency array to run effect only once

    return (
        <section className={classes.error_section}>
            <p className={classes.error_section_subtitle}>Thanks. You just broke it all !</p>
            <h1 ref={titleRef} className={classes.error_title}>
                <p>404</p>
                404
            </h1>
            <a href="#" className={classes.btn}>get me out of here</a>
        </section>
    );
};

export default Error;
