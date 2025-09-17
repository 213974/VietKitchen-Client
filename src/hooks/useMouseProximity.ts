import { useState, useEffect } from 'react';

// Defines the configurable options for the hook.
interface UseMouseProximityProps {
  threshold?: number;
  corner?: 'bottom-left'; // Can be expanded to other corners in the future
}

/**
 * A custom hook to detect if the user's mouse is within a certain distance of a viewport corner.
 * This is useful for creating proximity-based UI interactions, like a button that appears on hover.
 * The hook does nothing on touch-only devices where 'mousemove' events do not fire.
 * @param {UseMouseProximityProps} props - The configuration options for the hook.
 * @returns {boolean} `true` if the mouse is within the threshold, otherwise `false`.
 */
export const useMouseProximity = ({ threshold = 150, corner = 'bottom-left' }: UseMouseProximityProps = {}): boolean => {
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    // Event handler for mouse movement.
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerHeight } = window;
      
      let distance = Infinity;

      // Calculate the Euclidean distance from the cursor to the bottom-left corner.
      if (corner === 'bottom-left') {
        const dx = clientX;
        const dy = clientY - innerHeight;
        distance = Math.sqrt(dx * dx + dy * dy);
      }

      // Update the state based on whether the distance is within the threshold.
      setIsClose(distance < threshold);
    };

    // Event handler for when the mouse leaves the browser window.
    const handleMouseLeave = () => {
      setIsClose(false);
    };

    // Attach event listeners.
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function to remove listeners when the component unmounts.
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [threshold, corner]); // Re-run effect if props change.

  return isClose;
};