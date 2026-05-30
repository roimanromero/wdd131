/**
 * main.js — Horses: Majesty of the Plains
 * Handles: wind chill calculation, footer year & last modified date.
 */

// ── Static weather values (metric) ─────────────────────────────────────────
const TEMPERATURE  = 28;   // °C  — sunny savanna day
const WIND_SPEED   = 12;   // km/h

/**
 * calculateWindChill
 * Canadian/metric wind chill formula (Environment Canada).
 * Valid for: temperature ≤ 10 °C  AND  wind speed > 4.8 km/h
 * @param {number} temp  Temperature in °C
 * @param {number} wind  Wind speed in km/h
 * @returns {string} Wind chill in °C (one decimal) as a string
 */
function calculateWindChill(temp, wind) {
  return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
}

// ── Wind Chill display ──────────────────────────────────────────────────────
const windChillEl = document.getElementById('wind-chill');

if (TEMPERATURE <= 10 && WIND_SPEED > 4.8) {
  const chill = calculateWindChill(TEMPERATURE, WIND_SPEED);
  windChillEl.textContent = `${chill} °C`;
} else {
  windChillEl.textContent = 'N/A';
}

// ── Footer: current year ────────────────────────────────────────────────────
document.getElementById('footer-year').textContent =
  `©${new Date().getFullYear()}`;

// ── Footer: last modified date ──────────────────────────────────────────────
document.getElementById('last-modified').textContent =
  document.lastModified;
