import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show on devices with a fine pointer (mouse/trackpad), not touch
        if (window.matchMedia('(pointer: fine)').matches) {
            setIsVisible(true);
        }

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Allow default behavior for inputs/textareas
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea') {
                setIsHovering(false);
                return;
            }

            // Check if hovering over clickable elements
            const isClickable = target.closest('a, button, [role="button"], .cursor-pointer');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-400 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
            />
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-emerald-400 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 4 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.1
                }}
            />
        </>
    );
};

export default CustomCursor;
