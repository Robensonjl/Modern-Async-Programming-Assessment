const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

async function update(constellation) {
  try {
    const url = `${BASE_URL}/constellations/${constellation.id}`;
    const putUpdate = await axios.put(url, constellation);

    return putUpdate;
  } catch (error) {
    console.log(`Updating constellation (id: ${constellation.id}) failed.`);
  }
}

async function bulkImport(constellations) {
  try {
    if (!Array.isArray(constellations))
      throw newError("Inputted argument must be an array.");
    if (!constellations.every((constellation) => isValid(constellation)))
      throw newError("All constellations must include relevant fields.");

    const imported = constellations.map((constellation) => {
      return update(constellation);
    });
    return Promise.allSettled(imported);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { bulkImport, update };
