/**
 * Ruler rendering engine.
 * Generates an accurate SVG ruler based on calibration factor and available space.
 */

import { getCurrentPxPerMm } from './calibration';
import { detectDevice, type DeviceInfo } from './device-detect';

export interface RulerConfig {
  orientation: 'horizontal' | 'vertical';
  maxCm: number;
  pxPerMm: number;
}

/**
 * Calculate optimal ruler configuration based on device and container.
 */
export function calculateRulerConfig(
  containerWidth: number,
  containerHeight: number,
  device: DeviceInfo,
  forceOrientation?: 'horizontal' | 'vertical'
): RulerConfig {
  const pxPerMm = getCurrentPxPerMm();
  
  let orientation: 'horizontal' | 'vertical';
  if (forceOrientation) {
    orientation = forceOrientation;
  } else if (device.isMobile && device.isPortrait) {
    orientation = 'vertical';
  } else {
    orientation = 'horizontal';
  }

  const availablePx = orientation === 'horizontal' ? containerWidth : containerHeight;
  const availableMm = availablePx / pxPerMm;
  
  // Round down to nearest cm
  let maxCm = Math.floor(availableMm / 10);
  
  // Clamp between 5 and 50
  maxCm = Math.max(5, Math.min(50, maxCm));

  return { orientation, maxCm, pxPerMm };
}

/**
 * Generate SVG ruler markup.
 */
export function generateRulerSVG(config: RulerConfig): string {
  const { orientation, maxCm, pxPerMm } = config;
  const totalMm = maxCm * 10;
  const totalPx = totalMm * pxPerMm;
  
  const isHorizontal = orientation === 'horizontal';
  const rulerThickness = 80; // px
  const padding = 0;
  
  const svgWidth = isHorizontal ? totalPx + padding : rulerThickness;
  const svgHeight = isHorizontal ? rulerThickness : totalPx + padding;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" 
    width="${svgWidth}" height="${svgHeight}" 
    viewBox="0 0 ${svgWidth} ${svgHeight}"
    role="img" aria-label="Linijka ${maxCm} cm"
    style="display:block;">`;

  // Background
  svg += `<rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" 
    fill="#FFFFFF" rx="6" ry="6" stroke="#E5E7EB" stroke-width="1"/>`;

  // Ruler body with subtle gradient
  if (isHorizontal) {
    svg += `<defs>
      <linearGradient id="rulerGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FAFAFA"/>
        <stop offset="100%" stop-color="#F0F0F0"/>
      </linearGradient>
    </defs>`;
    svg += `<rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" 
      fill="url(#rulerGrad)" rx="6" ry="6" stroke="#D1D5DB" stroke-width="1.5"/>`;
  } else {
    svg += `<defs>
      <linearGradient id="rulerGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#FAFAFA"/>
        <stop offset="100%" stop-color="#F0F0F0"/>
      </linearGradient>
    </defs>`;
    svg += `<rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" 
      fill="url(#rulerGrad)" rx="6" ry="6" stroke="#D1D5DB" stroke-width="1.5"/>`;
  }

  // Draw tick marks
  for (let mm = 0; mm <= totalMm; mm++) {
    const pos = mm * pxPerMm;
    
    let tickLength: number;
    let strokeWidth: number;
    let color: string;

    if (mm % 10 === 0) {
      // Centimeter mark
      tickLength = 36;
      strokeWidth = 1.8;
      color = '#1A1A2E';
    } else if (mm % 5 === 0) {
      // Half-centimeter mark
      tickLength = 24;
      strokeWidth = 1.2;
      color = '#4A4A5A';
    } else {
      // Millimeter mark
      tickLength = 14;
      strokeWidth = 0.8;
      color = '#9CA3AF';
    }

    if (isHorizontal) {
      svg += `<line x1="${pos}" y1="0" x2="${pos}" y2="${tickLength}" 
        stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
    } else {
      svg += `<line x1="0" y1="${pos}" x2="${tickLength}" y2="${pos}" 
        stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round"/>`;
    }

    // Centimeter number
    if (mm % 10 === 0) {
      const cmNum = mm / 10;
      if (isHorizontal) {
        svg += `<text x="${pos}" y="${tickLength + 18}" 
          text-anchor="middle" 
          font-family="Inter, sans-serif" 
          font-size="14" 
          font-weight="600" 
          fill="#1A1A2E">${cmNum}</text>`;
      } else {
        svg += `<text x="${tickLength + 14}" y="${pos + 5}" 
          text-anchor="start" 
          font-family="Inter, sans-serif" 
          font-size="14" 
          font-weight="600" 
          fill="#1A1A2E">${cmNum}</text>`;
      }
    }
  }

  // Unit label
  if (isHorizontal) {
    svg += `<text x="${svgWidth - 10}" y="${svgHeight - 8}" 
      text-anchor="end" 
      font-family="Inter, sans-serif" 
      font-size="11" 
      font-weight="500" 
      fill="#9CA3AF">cm / mm</text>`;
  } else {
    svg += `<text x="${svgWidth - 6}" y="${svgHeight - 10}" 
      text-anchor="end" 
      font-family="Inter, sans-serif" 
      font-size="11" 
      font-weight="500" 
      fill="#9CA3AF" 
      writing-mode="tb">cm / mm</text>`;
  }

  svg += '</svg>';
  return svg;
}

/**
 * Initialize the ruler in a container element.
 */
export function initRuler(
  container: HTMLElement,
  forceOrientation?: 'horizontal' | 'vertical'
): void {
  const device = detectDevice();
  const rect = container.getBoundingClientRect();
  
  const config = calculateRulerConfig(
    rect.width,
    Math.min(rect.height || 500, window.innerHeight * 0.7),
    device,
    forceOrientation
  );

  container.innerHTML = generateRulerSVG(config);
  
  // Set data attributes for external use
  container.dataset.orientation = config.orientation;
  container.dataset.maxCm = String(config.maxCm);
}

/**
 * Generate a printable ruler SVG at exactly the right size for print (96 DPI).
 * For print, 1mm = 96/25.4 ≈ 3.7795 CSS px (browser standard at 100% scale).
 */
export function generatePrintRulerSVG(lengthCm: number): string {
  const pxPerMm = 96 / 25.4;
  const config: RulerConfig = {
    orientation: 'horizontal',
    maxCm: lengthCm,
    pxPerMm,
  };
  return generateRulerSVG(config);
}
