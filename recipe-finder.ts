export {};

type Recipe = {
    id: number,
    name: string,
    cuisine: string,
    difficulty: string,
    prepTimeMinutes: number,
    cookTimeMinutes: number,
    rating: number
}

async function loadRecipes(): Promise<Recipe[]> {
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
//console.log(recipes);
console.log(`${recipes.length} recipes loaded`);

const searchTerm = process.argv[2];

function matchSearch(recipe: Recipe): boolean {
    const lowerName = recipe.name.toLowerCase();
    const lowerTerm = searchTerm.toLowerCase();
    const isMatch = lowerName.includes(lowerTerm);
    return isMatch;
}

const results = recipes.filter(matchSearch);

if (results.length !== 0) {
    for (const recipe of results) {
        const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
        console.log(`${recipe.name} (${recipe.cuisine}, ${recipe.difficulty}) - ${totalMinutes} min - rating ${recipe.rating}`);
    }
    console.log(`${results.length} recipes found`);
} else {
    console.log(`No recipes found for "${searchTerm}"`);
}