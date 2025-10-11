# Custom Hooks

This directory contains all the custom React hooks created for the Viet Kitchen application. The purpose of these hooks is to encapsulate and reuse stateful logic, making components cleaner and more focused on their presentation.

## Naming Convention

All hooks follow the standard React convention of being prefixed with the word `use` (e.g., `useStoreInfo`).

## Available Hooks

-   **`useAuth.ts`**: A simple hook to access the current Supabase authentication session, user, and loading state from the `AuthContext`.
-   **`useClickOutside.ts`**: A utility hook that triggers a callback function when a click or touch event occurs outside of a specified element. Useful for closing modals and dropdowns.
-   **`useCookieConsent.ts`**: Manages all state and logic related to the cookie consent banner, user preferences, and localStorage persistence.
-   **`useDashboardStats.ts`**: Fetches aggregate data from Supabase (e.g., total gallery image count) for display on the admin dashboard.
-   **`useGallery.ts`**: A comprehensive hook that previously handled API interactions for a gallery feature. It is currently not in use but is structured for future gallery management.
-   **`useMouseProximity.ts`**: A utility hook to detect if the user's mouse cursor is close to a specific corner of the viewport.
-   **`useResponsive.ts`**: Determines the current viewport size (mobile, tablet, or desktop) based on predefined breakpoints to enable responsive rendering.
-   **`useScrollPosition.ts`**: Tracks the window's vertical scroll position and returns a boolean indicating if it has passed a certain threshold, along with the scroll percentage.
-   **`useStoreInfo.ts`**: Fetches and manages global store information like hours, phone number, and the active theme from Supabase. It includes real-time updates using Supabase's subscription feature.