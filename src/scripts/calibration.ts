/**
 * Calibration system for the online ruler.
 * Supports screen diagonal calibration and credit card reference calibration.
 * Persists calibration factor in localStorage.
 */

const STORAGE_KEY = 'linijka_calibration';

export interface CalibrationData {
  factor: number;        // CSS pixels per mm
  method: 'diagonal' | 'card' | 'default';
  timestamp: number;
}

/**
 * Get the default CSS pixels per mm based on the assumption of 96 DPI.
 * CSS spec: 1in = 96px, 1in = 25.4mm → 1mm ≈ 3.7795px
 */
export function getDefaultPxPerMm(): number {
  return 96 / 25.4; // ≈ 3.7795
}

/**
 * Load saved calibration from localStorage.
 */
export function loadCalibration(): CalibrationData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const data = JSON.parse(stored) as CalibrationData;
    if (data && typeof data.factor === 'number' && data.factor > 0) {
      return data;
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

/**
 * Save calibration to localStorage.
 */
export function saveCalibration(data: CalibrationData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage might be unavailable
  }
}

/**
 * Reset calibration (remove from localStorage).
 */
export function resetCalibration(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Get the current pixels-per-mm factor, using saved calibration if available.
 */
export function getCurrentPxPerMm(): number {
  const saved = loadCalibration();
  return saved ? saved.factor : getDefaultPxPerMm();
}

/**
 * Calibrate using screen diagonal size in inches.
 * 
 * Formula:
 * - Physical screen diagonal (inches) is known
 * - Screen resolution in physical pixels: screen.width * devicePixelRatio × screen.height * devicePixelRatio
 * - Calculate physical PPI from diagonal and resolution
 * - CSS PPI = Physical PPI / devicePixelRatio
 * - CSS px per mm = CSS PPI / 25.4
 */
export function calibrateByDiagonal(diagonalInches: number): CalibrationData {
  const dpr = window.devicePixelRatio || 1;
  const physicalWidth = window.screen.width * dpr;
  const physicalHeight = window.screen.height * dpr;
  const diagonalPx = Math.sqrt(physicalWidth ** 2 + physicalHeight ** 2);
  const physicalPPI = diagonalPx / diagonalInches;
  const cssPPI = physicalPPI / dpr;
  const pxPerMm = cssPPI / 25.4;

  const data: CalibrationData = {
    factor: pxPerMm,
    method: 'diagonal',
    timestamp: Date.now(),
  };

  saveCalibration(data);
  return data;
}

/**
 * Calibrate using a credit card reference.
 * The standard card width is 85.6mm.
 * The user adjusts a slider until the on-screen card matches their real card.
 * The slider value represents the current CSS pixel width of the card outline.
 * 
 * @param cardWidthPx - The CSS pixel width the user set for the 85.6mm card
 */
export function calibrateByCard(cardWidthPx: number): CalibrationData {
  const CARD_WIDTH_MM = 85.6;
  const pxPerMm = cardWidthPx / CARD_WIDTH_MM;

  const data: CalibrationData = {
    factor: pxPerMm,
    method: 'card',
    timestamp: Date.now(),
  };

  saveCalibration(data);
  return data;
}
