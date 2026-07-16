/**
 * star-presets-ui.js
 * ----------------------------------------------------------------------
 * Renders the star-category preset buttons and, on click, writes their
 * baseline values straight into the existing #mass / #radius /
 * #central-temperature / #central-pressure / #hydrogen / #helium /
 * #metals inputs already defined in index.html.
 *
 * Deliberately does not touch the run/submit flow: #simulation-form's
 * existing submit handler in app.js already reads these same input
 * values, so clicking a preset just pre-fills the form the user would
 * otherwise fill in by hand. Any field can still be edited afterward,
 * or the user can run the default as-is.
 *
 * Depends on: star-presets.js, loaded first (defines window.StarPresets)
 * Load order in index.html: star-presets.js, star-presets-ui.js, app.js
 * ----------------------------------------------------------------------
 */
(function () {
  "use strict";

  function applyPreset(preset) {
    Object.entries(preset.fields).forEach(function ([fieldId, value]) {
      const input = document.getElementById(fieldId);
      if (input) input.value = value;
    });
  }

  function buildButton(preset, container) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "preset-btn";
    btn.style.setProperty("--preset-color", preset.color);
    btn.title = preset.description;

    const swatch = document.createElement("span");
    swatch.className = "preset-btn__swatch";

    const label = document.createElement("span");
    label.textContent = preset.label;

    btn.appendChild(swatch);
    btn.appendChild(label);

    btn.addEventListener("click", function () {
      applyPreset(preset);
      container.querySelectorAll(".preset-btn").forEach(function (b) {
        b.classList.remove("preset-btn--active");
      });
      btn.classList.add("preset-btn--active");
      window.activePresetName = preset.label;
    });

    return btn;
  }

  // No DOMContentLoaded wrapper needed: this script tag sits at the
  // bottom of <body>, same as app.js, so #star-preset-row already
  // exists in the DOM by the time this runs.
  const container = document.getElementById("star-preset-row");
  if (container && window.StarPresets) {
    Object.keys(window.StarPresets).forEach(function (presetId) {
      container.appendChild(buildButton(window.StarPresets[presetId], container));
    });

    // Clear active preset if the user manually edits any input in the form
    const inputs = document.querySelectorAll("#simulation-form input");
    inputs.forEach(function (input) {
      input.addEventListener("input", function () {
        container.querySelectorAll(".preset-btn").forEach(function (btn) {
          btn.classList.remove("preset-btn--active");
        });
        window.activePresetName = null;
      });
    });
  }
})();
