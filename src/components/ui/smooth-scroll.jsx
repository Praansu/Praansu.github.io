import { useEffect } from 'react';
import Lenis from 'lenis'

export function SmoothScroll({
    children
}) {
    useEffect(() => {
        const lenis = new Lenis()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Remove loading class
        document.body.classList.remove('loading');

        return () => {
            lenis.destroy()
        };
    }, [])

    return <>{children}</>
}

export default SmoothScroll
