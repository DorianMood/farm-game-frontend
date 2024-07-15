export const getInventory = () => {
    return {
        items: [
            {
                amount: 12,
                inventoryItem: {
                    id: '605d3dcb-b1b4-444e-aa55-405c0f12e5f4',
                    name: "Морковь",
                    description: "Морковь это сельскохозяйственное растение. Описание моркови.",
                    price: 12,
                    sellMultiplier: 0.8,
                    category: "Seed",
                    seed: {
                        type: "CarrotSeed",
                        harvestTimeout: 2,
                    },
                },
            },
            {
                amount: 2,
                inventoryItem: {
                    id: '805d3dcb-b1b4-444e-aa55-405c0f12e5f4',
                    name: "Свекла",
                    description: "Свекла это сельскохозяйственное растение. Описание свеклы.",
                    price: 22,
                    sellMultiplier: 0.8,
                    category: "Seed",
                    seed: {
                        type: "BeetSeed",
                        harvestTimeout: 22,
                    },
                },
            },
            {
                amount: 2,
                inventoryItem: {
                    id: '905d3dcb-b1b4-444e-aa55-405c0f12e5f4',
                    name: "Свинья",
                    description: "Свинья это неприхотливое сельскохозяйственное животное. Чаще всего свиньи выращиваются для производства мяса, а также кожи.",
                    price: 10,
                    sellMultiplier: 0.8,
                    category: "Animal",
                    animal: {
                        type: "Pig",
                        harvestTimeout: 36000000,
                    },
                },
            },
        ],
    }
}