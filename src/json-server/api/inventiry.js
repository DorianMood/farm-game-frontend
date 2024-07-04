export const getInventory = () => {
    return {
        "items": [
            {
                "amount": 2,
                "farmProduct": {
                    "price": 2,
                    "sellMultiplier": 0.8,
                    "type": "Animal",
                    "animal": {
                        "type": "Pig",
                        "harvestTimeout": 3600000,
                        "name": "Свинья",
                        "description": "Свинья это неприхотливое сельскохозяйственное животное. Чаще всего свиньи выращиваются для производства мяса, а также кожи."
                    }
                }
            },
            {
                "amount": 5,
                "farmProduct": {
                    "price": 5,
                    "sellMultiplier": 0.8,
                    "type": "Seed",
                    "seed": {
                        "crop": {
                            "type": "Carrot",
                            "harvestTimeout": 3600000,
                            "name": "Морковь",
                            "description": "морковь это сельскохозяйственное растение. Описание моркови."
                        }
                    }
                }
            },
            {
                "amount": 10,
                "farmProduct": {
                    "price": 10,
                    "sellMultiplier": 0.8,
                    "type": "Seed",
                    "seed": {
                        "crop": {
                            "type": "Beet",
                            "harvestTimeout": 3600000,
                            "name": "Свекла",
                            "description": "Свекла это сельскохозяйственное растение. Описание свеклы."
                        }
                    }
                }
            },
            {
                "amount": 10,
                "farmProduct": {
                    "price": 10,
                    "sellMultiplier": 0.8,
                    "type": "Crop",
                    "crop": {
                        "type": "Beet",
                        "harvestTimeout": 3600000,
                        "name": "Свекла",
                        "description": "Свекла это сельскохозяйственное растение. Описание свеклы."
                    }
                }
                }
        ]
    }
}