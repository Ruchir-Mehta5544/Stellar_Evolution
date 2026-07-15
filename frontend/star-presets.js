/**
 * star-presets.js
 * ----------------------------------------------------------------------
 * Baseline parameters for the star-category preset buttons.
 *
 * Field keys match the input element ids in index.html exactly
 * (#mass, #radius, #central-temperature, #central-pressure, #hydrogen,
 * #helium, #metals), so star-presets-ui.js can apply them with a
 * single document.getElementById(key).value = value loop — no mapping
 * layer, nothing that can drift out of sync with the form.
 *
 * All four presets were run through backend/stellar_evolution/solver.py
 * and evolution.py directly (not guessed) to confirm they pass
 * SimulationConfig.validate(), don't crash the RK4 integrator, and
 * produce the expected phase label + end-of-life temperature /
 * luminosity / radius when the timeline slider is scrubbed to the end.
 *
 * SCOPE NOTE: only main-sequence-and-beyond stars are covered here.
 * White dwarfs and neutron stars are degenerate-matter remnants; this
 * solver uses an ideal-gas-plus-radiation equation of state with no
 * degeneracy pressure (see the README's "Scientific Scope" section), so
 * no combination of central_temperature/central_pressure represents
 * them correctly yet. Worth adding once the team implements a
 * degenerate EOS branch — flagged rather than faked.
 *
 * IMPORTANT: /evolution's visible star (color, size, HR position, phase
 * label) is generated from mass_solar and the timeline slider position
 * alone — see _stellar_scaling() in evolution.py. central_temperature,
 * central_pressure, and composition only feed the separate
 * structure_summary, which the current frontend doesn't render. So mass
 * is the one field that actually changes what's on screen. The Red
 * Giant / Blue Giant presets look like an ordinary young star at
 * timeline position 0 — their defining trait only shows up once the
 * slider is dragged forward.
 * ----------------------------------------------------------------------
 */
window.StarPresets = {
  redDwarf: {
    label: "Red Dwarf",
    color: "#ff6b4a",
    description:
      "Small, cool, and dim. Never leaves the main sequence within the age of the universe — drag the timeline and watch it barely change.",
    fields: {
      mass: 0.3,
      radius: 0.6,
      "central-temperature": 5.0e6,
      "central-pressure": 4.0e16,
      hydrogen: 0.75,
      helium: 0.23,
      metals: 0.02,
    },
  },
  yellowDwarf: {
    label: "Yellow Dwarf",
    color: "#ffd76b",
    description:
      "A Sun-like star. Drag the timeline to its end to watch it swell into a red giant, just as the real Sun eventually will.",
    fields: {
      mass: 1.0,
      radius: 1.0,
      "central-temperature": 1.55e7,
      "central-pressure": 2.45e17,
      hydrogen: 0.7,
      helium: 0.28,
      metals: 0.02,
    },
  },
  blueGiant: {
    label: "Blue Giant",
    color: "#7ec8ff",
    description:
      "Massive, extremely hot, and short-lived — burns through its fuel in a few million years instead of billions.",
    fields: {
      mass: 20.0,
      radius: 15.0,
      "central-temperature": 5.0e7,
      "central-pressure": 6.0e16,
      hydrogen: 0.7,
      helium: 0.28,
      metals: 0.02,
    },
  },
  redGiant: {
    label: "Red Giant",
    color: "#ff8c5a",
    description:
      "A star a bit more massive than the Sun, set up to reach the red-giant branch sooner. Drag the timeline forward to see it swell and cool.",
    fields: {
      mass: 2.0,
      radius: 4.0,
      "central-temperature": 2.0e7,
      "central-pressure": 2.0e17,
      hydrogen: 0.7,
      helium: 0.28,
      metals: 0.02,
    },
  },
};
