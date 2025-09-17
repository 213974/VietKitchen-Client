import { useEffect, type RefObject } from 'react';

// Defines the types of events this hook will listen for.
type Event = MouseEvent | TouchEvent;

/**
 * A custom hook that triggers a callback when a user clicks or touches outside of a specified element.
 * This is useful for closing modals, dropdowns, or popovers.
 * @param ref A React ref object attached to the element to monitor.
 * @param handler The callback function to execute when a click outside occurs.
 */
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Get the DOM element from the ref.
      const el = ref?.current;

      // Do nothing if the element doesn't exist or if the click was inside the element.
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      // If the click was outside, call the provided handler.
      handler(event);
    };

    // Add event listeners for both mouse and touch events.
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup function to remove the event listeners when the component unmounts.
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Re-run the effect if the ref or handler function changes.
};