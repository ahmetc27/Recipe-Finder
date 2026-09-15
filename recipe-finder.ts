export {};

async function loadRecipes() {
    try {
        const response = await fetch("https://dummyjson.com/recipes?limit=50&select=name,cuisine,difficulty,prepTimeMinutes,cookTimeMinutes,rating");

        if (!response.ok) {
            console.log(`Could not load recipes: ${response.status}`);
            return [];
        }
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        if (error instanceof Error) {
            console.log("Could not connect:", error.message);
        }
        return [];
    }
}

const recipes = await loadRecipes();
console.log(`${recipes.length} recipes loaded`);