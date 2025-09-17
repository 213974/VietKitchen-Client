# Custom Hooks

This directory contains all the custom React hooks created for the Viet Kitchen application. The purpose of these hooks is to encapsulate and reuse stateful logic, making components cleaner and more focused on their presentation.

## Naming Convention

All hooks follow the standard React convention of being prefixed with the word `use` (e.g., `useStoreInfo`).

## Available Hooks

-   **`useAuth.ts`**: Checks for the presence of an admin JWT in `localStorage` to determine the current authentication status.
-   **`useClickOutside.ts`**: A utility hook that triggers a callback function when a click or touch event occurs outside of a specified element.
-   **`useCookieConsent.ts`**: Manages all state and logic related to the cookie consent banner and user preferences.
-   **`useDashboardStats.ts`**: Fetches aggregate data (e.g., item counts) for display on the admin dashboard.
-   **`useGallery.ts`**: Handles all state and API interactions for the gallery, including fetching, creating, and deleting images and categories.
-   **`useMenuItems.ts`**: Fetches and manages the state for the list of menu items.
-   **`useMouseProximity.ts`**: A utility hook to detect if the user's mouse cursor is close to a specific corner of the viewport.
-   **`useResponsive.ts`**: Determines the current viewport size (mobile, tablet, or desktop) based on predefined breakpoints.
-   **`useScrollPosition.ts`**: Tracks the window's vertical scroll position and returns a boolean indicating if it has passed a certain threshold.
-   **`useStoreInfo.ts`**: Fetches and manages global store information like hours, phone number, and the active theme, including real-time updates via WebSockets.