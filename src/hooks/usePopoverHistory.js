import { useEffect, useRef } from 'react';

/**
 * Hook to manage browser history for popovers
 * When a popover opens, it pushes a history state
 * When user presses back button/gesture, it closes the popover instead of navigating away
 */
const usePopoverHistory = (isOpen, onClose, enabled = true) => {
  const historyPushed = useRef(false);
  const isClosing = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handlePopState = (event) => {
      // If popover is open and we get a popstate event, close the popover
      if (isOpen && !isClosing.current) {
        event.preventDefault();
        isClosing.current = true;
        onClose();
      }
    };

    if (isOpen && !historyPushed.current) {
      // Push a history state when popover opens
      window.history.pushState(
        { popoverOpen: true },
        '',
        window.location.href
      );
      historyPushed.current = true;
      isClosing.current = false;

      // Listen for back button/gesture
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // When popover closes normally (not via back button), clean up history
    if (!isOpen && historyPushed.current && !isClosing.current) {
      // Go back to remove the popover state from history
      window.history.back();
    }

    // Reset flags when popover closes
    if (!isOpen) {
      historyPushed.current = false;
      isClosing.current = false;
    }
  }, [isOpen, enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (enabled && historyPushed.current && !isClosing.current) {
        // Clean up history if component unmounts with popover open
        try {
          window.history.back();
        } catch (e) {
          // Ignore errors if history manipulation fails
        }
      }
    };
  }, [enabled]);
};

export default usePopoverHistory;