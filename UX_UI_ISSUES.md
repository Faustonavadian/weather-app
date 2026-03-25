# UX/UI Issues & Proposed Solutions

Identified by live inspection of the app on 2026-03-25.

---

## Issue 1 — Suggestions dropdown is clipped (Bug)

**Status:** To fix

**What happens:** When the user types a city name, the autocomplete dropdown is cut off by the card boundary. Only the first suggestion is visible, even though up to 6 are returned.

**Root cause:** `.app-shell` has `overflow: hidden` in `App.css` (line 15), which clips all absolutely-positioned children including `.suggestions-box`.

**Proposed fix:** Remove `overflow: hidden` from `.app-shell`. The `::before` pseudo-element that creates the blurred gradient glow uses `inset: -35%` — at low opacity and with `blur(72px)` it will softly bleed outside the card, which enhances the glassmorphism aesthetic rather than harming it. No structural changes to the HTML needed.

---

## Issue 2 — Geolocation error persists after a successful search (Bug)

**Status:** To fix

**What happens:** After geolocation is denied, the error "Location access was denied. Search for a city to continue." remains visible even after the user finds weather for a city by searching.

**Root cause:** `errorMessage` is only cleared inside `searchWeatherByCity` via `setErrorMessage("")`, but the error set by the geolocation failure callback lingers in state. Once `weather` is set, the error message should no longer be shown alongside the weather card.

**Proposed fix:** In `App.jsx`, conditionally render the error only when there is no weather loaded yet, i.e. change the condition to `{errorMessage && !weather && ...}`. This way the error disappears once the first successful weather result arrives.

---

## Issue 3 — Weather icon is too small (Visual)

**Status:** To fix

**What happens:** The weather emoji icon (☀️, 🌤️, etc.) renders at `3.1rem`, which is too small relative to the large temperature number. It gets lost visually and doesn't convey the weather condition with enough impact.

**Proposed fix:** Increase `.weather-icon` `font-size` from `3.1rem` to `4.5rem` and add a subtle `drop-shadow` filter for depth.

---

## Issue 4 — No clear button on the search input (UX)

**Status:** To fix

**What happens:** Once a city name fills the input, there's no easy way to clear it and start fresh. The user has to manually select all text and delete it.

**Proposed fix:** Render a `×` clear button inside `.search-input-wrap` when `city` is non-empty. Clicking it resets `city`, `weather`, `errorMessage`, and hides suggestions.

---

## Issue 5 — No °C / °F toggle (Feature)

**Status:** To fix

**What happens:** Temperature is always shown in °C. There is no way for users who prefer Fahrenheit to switch units.

**Proposed fix:** Add a `unit` state (`"C"` | `"F"`) with a small toggle button next to the temperature in `WeatherCard`. Convert temperature client-side: `°F = (°C × 9/5) + 32`.

---

## Issue 6 — Missing "Feels like" temperature (Feature)

**Status:** To fix

**What happens:** The weather card only shows Wind, Humidity, and Precipitation. "Feels like" (apparent temperature) is a key metric users expect.

**Root cause:** The Open-Meteo API returns `apparent_temperature` but it is not currently requested or displayed.

**Proposed fix:** Add `apparent_temperature` to the API call in `weatherService.js`. Pass it through the weather data shape and display it as a 4th metric card (or below the main temperature).

---

## Issue 7 — Background gradient too subtle per weather condition (Visual)

**Status:** To fix

**What happens:** The background gradient changes between weather conditions but the difference is barely perceptible. Clear sky in New York looks almost identical to cloudy London.

**Proposed fix:** Increase the `opacity` of the `::before` pseudo-element from `0.3` to `0.55` and ensure `backgroundService.js` has clearly distinct gradients for major weather groups (sunny, cloudy, rainy, snowy, stormy). Also apply the gradient directly to `document.body` with a smooth CSS transition for the full-page effect.

---

## Issue 8 — Subtitle is generic marketing copy (Polish)

**Status:** To fix

**What happens:** "Real-time weather with smart city search" is always shown and is not useful once the user has loaded weather data.

**Proposed fix:** Hide the subtitle once `weather` is loaded. Replace it with the local time of the searched city or a "Last updated" timestamp.
