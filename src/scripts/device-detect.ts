/**
 * Device detection utilities for the ruler tool.
 * Detects screen type, orientation, touch capability, and viewport size.
 */

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
}

export function detectDevice(): DeviceInfo {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const devicePixelRatio = window.devicePixelRatio || 1;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isLandscape = viewportWidth > viewportHeight;

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
  const isDesktop = viewportWidth >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    isLandscape,
    isPortrait: !isLandscape,
    screenWidth,
    screenHeight,
    viewportWidth,
    viewportHeight,
    devicePixelRatio,
  };
}

export function onOrientationChange(callback: (device: DeviceInfo) => void): () => void {
  const handler = () => {
    // Small delay to let the viewport settle after orientation change
    setTimeout(() => {
      callback(detectDevice());
    }, 100);
  };

  window.addEventListener('resize', handler);

  if (screen.orientation) {
    screen.orientation.addEventListener('change', handler);
  }

  return () => {
    window.removeEventListener('resize', handler);
    if (screen.orientation) {
      screen.orientation.removeEventListener('change', handler);
    }
  };
}
