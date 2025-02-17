export function lootbox(timeInMinutes: number) {
    // Cap the time at 3 hours (180 minutes)
    const maxTime = 180;
    timeInMinutes = Math.min(timeInMinutes, maxTime);

    // Define loot tiers
    const lootTiers = [
        { tier: "No Loot", weight: 20 }, // Chance for no loot at all
        { tier: "Common", weight: 40 },
        { tier: "Uncommon", weight: 30 },
        { tier: "Rare", weight: 15 },
        { tier: "Epic", weight: 4 },
        { tier: "Legendary", weight: 1 }
    ];

    // Scale weights based on time (increments of 15 minutes)
    const increment = 15;
    const scalingFactor = Math.floor(timeInMinutes / increment);

    // Adjust weights (favor better loot with more time)
    const adjustedWeights = lootTiers.map((loot, index) => {
        // Increase the weight for loot types other than "No Loot" with time
        if (loot.tier !== "No Loot") {
            return {
                ...loot,
                weight: loot.weight + scalingFactor * (lootTiers.length - index - 1)
            };
        }
        return loot; // "No Loot" stays with its base weight
    });

    // Calculate total weight for random selection
    const totalWeight = adjustedWeights.reduce((sum, loot) => sum + loot.weight, 0);

    // Randomly select loot based on adjusted weights
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const loot of adjustedWeights) {
        cumulativeWeight += loot.weight;
        if (random <= cumulativeWeight) {
            return loot.tier;
        }
    }
}
