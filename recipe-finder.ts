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

function matchSearch(recipe: Recipe): boolean {
    const lowerName = recipe.name.toLowerCase();
    const lowerTerm = searchTerm.toLowerCase();
    const isMatch = lowerName.includes(lowerTerm);
    return isMatch;
}

function displayResults(recipes: Recipe[]): void {
    if (recipes.length > 0) {
        for (const recipe of recipes) {
            const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
            console.log(`${recipe.name} (${recipe.cuisine}, ${recipe.difficulty}) - ${totalMinutes} min - rating ${recipe.rating}`);
        }
        console.log(`${recipes.length} recipes found`);
    } else {
        console.log(`No recipes found for "${searchTerm}"`);
    }
}

function userInputExists(): boolean {
    if (process.argv.length < 3) {
        return false;
    }
    return true;
}

const searchTerm = process.argv[2];

if (userInputExists()) {
    const recipes = await loadRecipes();
    const results = recipes.filter(matchSearch);
    console.log(`${recipes.length} recipes loaded`);
    displayResults(results);
} else {
    console.log("Please enter a search term, e.g. node recipe-finder.ts pizza");
}

