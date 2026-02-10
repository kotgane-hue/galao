
export const vibrate = (pattern: number | number[] = 10) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
        navigator.vibrate(pattern);
    } catch (e) {
        // Ignore errors on devices that don't support it or if context is blocked
    }
  }
};
