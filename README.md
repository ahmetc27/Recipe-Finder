# Recipe Finder
A command line tool that searches recipes by name. It loads recipes from the DummyJSON API and shows only the recipes that match your search term.

## Features
- Loads 50 recipes from the DummyJSON API
- Searches recipes by name (case-insensitive)
- Shows cuisine, difficulty, total time and rating for each recipe
- Handles server and connection errors
- Shows a hint when no search term is given

## Tech Stack
- TypeScript
- Node.js
- DummyJSON API

## Requirements
- Node.js 24 or newer

## Installation

``` bash
git clone https://github.com/ahmetc27/Recipe-Finder.git
cd Recipe-Finder
npm install
```

## Usage

```bash
node recipe-finder.ts pizza
```

```
50 recipes loaded
Classic Margherita Pizza (Italian, Easy) - 35 min - rating 4.6
Italian Margherita Pizza (Italian, Easy) - 32 min - rating 4.7
2 recipes found
```