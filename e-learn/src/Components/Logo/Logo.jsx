import classes from './Logo.module.css';
import { useState, useEffect } from 'react';

export default function Logo({ open }) {
    const [isMobile, setIsMobile] = useState(false); // State to track screen size

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <>
            {(isMobile) && (
                <img
                    className={classes.logo_responsive}
                    src="./src/assets/Untitled-4.png"
                    alt="Responsive Logo"
                />
            )}
        </>
    );
}
