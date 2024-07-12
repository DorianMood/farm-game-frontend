export const getProducts = () => {
    return {
        items: [
            {

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
            {

                id: '605d3dcb-b1b4-444e-aa55-405c0f12e5f7',
                name: "Промокод",
                description: "Получите скидку 20%",
                price: 1,
                sellMultiplier: 0.8,
                category: "PromoCode",
                promoCode: {
                   href: 'https://test.ru'
                },
            },
        ]
    }
}

export const postProduct = () => {
    return [
        {
            "id": "505d3dcb-b1b4-444e-aa55-405c0f12e5f4",
            "price": 100,
            "picture": "40",
            "content": "40"
        }
    ]
}