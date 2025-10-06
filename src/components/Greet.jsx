import { animate, text, createScope, stagger } from "animejs";
import { useEffect, useRef } from 'react';

export default function Greet() {
    const root = useRef(null);
    const scope = useRef(null);
    const greetRef = useRef(null);
    
    useEffect(() => {
        const { chars } = text.splitText(greetRef.current, {
            chars: { wrap: 'span' }
        });

        chars.forEach(c => {
            c.style.display = 'inline-block';
            c.style.verticalAlign = 'middle';
            if (c.textContent.trim() === '') {
                c.style.marginRight = '0.11em';
            } else {
                c.style.marginRight = '0.11em';
            }
        });


        scope.current = createScope({ root }).add( self => {
            animate(chars, {
                y: [
                    { to: ['100%', '0%'], },
                    { delay: 750, ease: 'in(3)' }
                ],
                opacity: [
                    { to: ['0%', '100%'] },
                    { delay: 750, ease: 'in(3)' }
                ],
                duration: 750,
                ease: 'out(3)',
                delay: stagger(50),
                loop: false,
            });

        });
        
        return () => scope.current.revert();
    }, []);

    return (
        <div ref={root}>
            <p ref={greetRef}>I'm</p>
        </div>
    );
}