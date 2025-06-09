document.getElementById("searchBtn").addEventListener("click", searchCharacter);

async function searchCharacter() {
  const query = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a character name to search.</p>";
    return;
  }

  try {
    const response = await fetch(
      `/api/people?search=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const matchingCharacters = data.filter((character) =>
      character.name.toLowerCase().includes(query)
    );

    if (matchingCharacters.length === 0) {
      resultsDiv.innerHTML = "<p>No matching characters found.</p>";
      return;
    }

    resultsDiv.classList.add("character-grid");

    matchingCharacters.forEach((character) => {
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character-card");

      characterDiv.innerHTML = `
        <h3>${character.name}</h3>
        <p><strong>Height:</strong> ${character.height} cm</p>
        <p><strong>Mass:</strong> ${character.mass} kg</p>
        <p><strong>Hair Color:</strong> ${character.hair_color}</p>
        <p><strong>Skin Color:</strong> ${character.skin_color}</p>
        <p><strong>Eye Color:</strong> ${character.eye_color}</p>
        <p><strong>Birth Year:</strong> ${character.birth_year}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
      `;

      resultsDiv.appendChild(characterDiv);
    });
  } catch (error) {
    console.error("Fetch error:", error);
    resultsDiv.innerHTML =
      "<p>Something went wrong. Try again or check the console.</p>";
  }
}
