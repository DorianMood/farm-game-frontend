import {AxiosResponse} from "axios";

export const mockRest = (response: AxiosResponse) => {
    if (response.config.url === '/beds') {
        response.data = [
            {
                "id": "1269f736-fedd-403e-b26e-09c5be8ff42c",
                "index": 4,
                "plantedAt": "2024-07-22T11:52:15.948Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "BeetSeed",
                    "harvestTimeout": 300
                }
            },
            {
                "id": "384a6d8d-79fa-4b36-be7c-bfb40693274b",
                "index": 5,
                "plantedAt": "2024-07-22T11:52:15.948Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "FlowerSeed",
                    "harvestTimeout": 300
                }
            },
            {
                "id": "10a50b0c-1be7-4597-97be-27254275d02e",
                "index": 6,
                "plantedAt": "2024-07-22T11:52:15.948Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "CarrotSeed",
                    "harvestTimeout": 300
                }
            },
            {
                "id": "0b0c0d4e-d56a-49dc-b19c-07b7d4c895a0",
                "index": 7,
                "plantedAt": "2024-07-22T11:52:15.948Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "FlowerSeed",
                    "harvestTimeout": 300
                }
            },
            {
                "id": "e90131f6-6064-4537-b9d1-41905a5f7580",
                "index": 8,
                "plantedAt": "2024-07-22T11:52:15.948Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "PotatoSeed",
                    "harvestTimeout": 300
                }
            },
            {
                "id": "4dd797af-6dc9-46c3-82d5-245e961d34c1",
                "index": 9,
                "plantedAt": "2024-07-22T11:52:15.948Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "PotatoSeed",
                    "harvestTimeout": 300
                }
            },
            {
                "id": "70a51957-c9b5-40c0-87a3-9058657ad5c0",
                "index": 1,
                "plantedAt": null,
                "crop": null
            },
            {
                "id": "da7b3b29-33e1-4df2-8d7c-2f0bd1901270",
                "index": 0,
                "plantedAt": "2024-07-22T11:52:15.948Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "CarrotSeed",
                    "harvestTimeout": 300
                }
            },
            {
                "id": "22365d55-1ec4-4ae1-8d84-b3087bf52697",
                "index": 3,
                "plantedAt": "2024-07-22T11:52:21.872Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "CarrotSeed",
                    "harvestTimeout": 300
                }
            },
            {
                "id": "2ba3939b-b92a-4a7d-8419-f738a1b37ca9",
                "index": 2,
                "plantedAt": "2024-07-22T11:52:43.046Z",
                "crop": {
                    "id": "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
                    "type": "CarrotSeed",
                    "harvestTimeout": 300
                }
            }
        ]
    }
    if (response.config.url === '/inventory') {
        response.data = {
            "id": "7a622a19-a4cc-4c5f-937b-ae04381553c3",
            "items": [
                {
                    "id": "df4f0468-c214-4060-978e-1ee885d2164c",
                    "amount": 1,
                    "inventoryItem": {
                        "id": "13357075-e485-4db5-88b3-dddce7af285f",
                        "createdAt": "2024-07-23T15:07:35.406Z",
                        "updatedAt": "2024-07-23T15:07:35.406Z",
                        "deletedAt": null,
                        "name": "Луковицы цветов",
                        "description": "Растения выращивают для украшения парков, скверов, садов, различных помещений, для получения цветов на срезку. Одни растения выращивают в открытом грунте, другие — в теплицах, оранжереях, комнатах. Заниматься цветоводством люди начали в глубокой древности.",
                        "price": 50,
                        "sellMultiplier": 0.8,
                        "category": "Seed",
                        "animal": null,
                        "seed": {
                            "id": "641119a6-5503-47ac-9e5f-09a0a13f76a1",
                            "type": "FlowerSeed",
                            "harvestTimeout": 1500000
                        },
                        "animalProduct": null,
                        "seedProduct": null,
                        "promoCode": null
                    }
                },
                {
                    "id": "0bb6676d-b244-4a78-a7d8-81ffbaedcead",
                    "amount": 1,
                    "inventoryItem": {
                        "id": "14e82dcd-bdc1-4ad0-adf1-d62e75e7fd5b",
                        "createdAt": "2024-07-23T15:07:35.406Z",
                        "updatedAt": "2024-07-23T15:07:35.406Z",
                        "deletedAt": null,
                        "name": "Картофель под посадку",
                        "description": "Клубни картофеля являются важным пищевым продуктом. Плоды ядовиты в связи с содержанием в них соланина. С потребительской точки зрения картофель является овощем.",
                        "price": 30,
                        "sellMultiplier": 0.8,
                        "category": "Seed",
                        "animal": null,
                        "seed": {
                            "id": "4cde7cb7-144e-4d54-b314-b55d72f8e34b",
                            "type": "PotatoSeed",
                            "harvestTimeout": 900000
                        },
                        "animalProduct": null,
                        "seedProduct": null,
                        "promoCode": null
                    }
                },
                {
                    "id": "e8a219bd-304b-4cfa-9df7-13aa032bb19c",
                    "amount": 1,
                    "inventoryItem": {
                        "id": "2af6d50e-37ba-4af9-a9e8-b1184d9683d3",
                        "createdAt": "2024-07-23T15:07:35.406Z",
                        "updatedAt": "2024-07-23T15:07:35.406Z",
                        "deletedAt": null,
                        "name": "Семена пшеницы",
                        "description": "Получаемая из зёрен пшеницы мука используется при выпекании хлеба, изготовлении макаронных и кондитерских изделий. Пшеница также используется как кормовая культура, входит в некоторые рецепты приготовления пива и водки, а также виски.",
                        "price": 40,
                        "sellMultiplier": 0.8,
                        "category": "Seed",
                        "animal": null,
                        "seed": {
                            "id": "9f19d14c-98a1-415f-a5ed-44e2b466844c",
                            "type": "WheatSeed",
                            "harvestTimeout": 1200000
                        },
                        "animalProduct": null,
                        "seedProduct": null,
                        "promoCode": null
                    }
                },
                {
                    "id": "c968a5aa-8f2b-4133-a317-dfcadff0bde5",
                    "amount": 2,
                    "inventoryItem": {
                        "id": "6882f9a6-2c77-4282-911d-f8cdf100350c",
                        "createdAt": "2024-07-23T15:07:35.406Z",
                        "updatedAt": "2024-07-23T15:07:35.406Z",
                        "deletedAt": null,
                        "name": "Семена свеклы",
                        "description": "Сахарная свекла в Российской Федерации является основным источником получения одного из ценнейших продуктов питания – сахара. Доля свекловичного сахара в общем объеме производства составляет 65,5%. В процессе переработки сахарной свеклы, помимо сахара, получают мелассу и жом. В промышленности мелассу используют для производства органических кислот, дрожжей и спирта. В сельском хозяйстве она является ценной кормовой добавкой животным.",
                        "price": 20,
                        "sellMultiplier": 0.8,
                        "category": "Seed",
                        "animal": null,
                        "seed": {
                            "id": "b4a070f4-e7fb-477b-9a74-1fe56ad8c501",
                            "type": "BeetSeed",
                            "harvestTimeout": 600000
                        },
                        "animalProduct": null,
                        "seedProduct": null,
                        "promoCode": null
                    }
                },
                {
                    id: "01c402ed-3367-4f05-8e04-8c0534ea6999",
                    amount: 1,
                    inventoryItem: {
                        id: "01c402ed-3367-4f05-8e04-8c0534ea6990",
                        createdAt: "2024-07-19T13:36:07.352Z",
                        updatedAt: "2024-07-19T13:36:07.352Z",
                        deletedAt: null,
                        name: "Удобрение",
                        description:
                            "Обычно в быту под неплод",
                        price: 12,
                        sellMultiplier: 1,
                        category: "Fertilizer",
                        animal: null,
                        seedProduct: null,
                        animalProduct: null,
                        seed: null,
                        fertilizer: {
                            id: "01c402ed-3367-4f05-8e04-8c0534ea6988",
                        },
                        promoCode: null,
                    },
                },
                {
                    id: "01c402ed-3367-4f05-8e04-8c0534ea7999",
                    amount: 1,
                    inventoryItem: {
                        id: "01c402ed-3367-4f05-8e04-8c0534ea7690",
                        createdAt: "2024-07-19T13:36:07.352Z",
                        updatedAt: "2024-07-19T13:36:07.352Z",
                        deletedAt: null,
                        name: "Витамины",
                        description:
                            "Для животных",
                        price: 12,
                        sellMultiplier: 1,
                        category: "Vitamin",
                        animal: null,
                        seedProduct: null,
                        animalProduct: null,
                        seed: null,
                        vitamin: {
                            id: "01c402ed-3367-4f05-8e04-8c0534ea6588",
                        },
                        promoCode: null,
                    },
                },
            ]
        }
    }
    if (response.config.url === '/animals') {
        response.data = [];
    }
    if (response.config.url === '/tasks') {
        response.data = [
            {
                "id": "b47fa065-0f7c-4d96-ab19-a95372818a17",
                "completedAt": null,
                "task": {
                    "id": "9af63796-0eea-4280-9290-521adf54b5b9",
                    "type": "FinanceGenius",
                    "cost": 10
                }
            },
            ]
    }
    if (response.config.url === '/auth/authenticated') {
        response.data = true
    }
    if (response.config.url === '/barns') {
        response.data = [
            {
                "id": "bfac6cf1-b0ef-44c2-bd12-d12028bdec12",
                "index": 1,
                "startedAt": null,
                "animal": {
                    "id": "ee805a5f-7641-4c2a-bb27-2fba7b3ea881",
                    "type": "SheepAnimal",
                    "harvestTimeout": 43200000
                }
            },
            {
                "id": "1f740db1-e6e1-46b2-bc1b-3f61cb94e4b0",
                "index": 3,
                "startedAt": null,
                "animal": {
                    "id": "8694b4a8-ae80-4f29-931c-e4fb103cb64d",
                    "type": "PigAnimal",
                    "harvestTimeout": 86400000
                }
            },
            {
                "id": "122d9a3b-c21c-4b6e-bf8f-dd6cd48ece0a",
                "index": 2,
                "startedAt": "2024-08-01T08:37:55.509Z",
                "animal": {
                    "id": "ebdb43fe-63a0-41c1-8f59-c2f7ce989655",
                    "type": "CowAnimal",
                    "harvestTimeout": 64800000
                }
            },
            {
                "id": "45d04c1e-298b-47e9-a204-540f0979df09",
                "index": 0,
                "startedAt": "2024-08-01T08:45:56.788Z",
                "animal": {
                    "id": "b440a12f-9ad2-4983-b81f-ab8a06d8c8b6",
                    "type": "HenAnimal",
                    "harvestTimeout": 21600000
                }
            }
        ]
    }
    if (response.config.url === '/users') {
        response.data = {
            "id": "44ba5f13-89ec-4e02-8c56-f2a1355ca226",
            "createdAt": "2024-07-23T15:08:27.556Z",
            "updatedAt": "2024-07-23T18:04:48.415Z",
            "deletedAt": null,
            "username": "admin",
            "email": "admin@mail.ru",
            "ballance": 100,
            "rank": 1,
            "beds": [
                {
                    "id": "9cd1519e-dd8a-4b76-8e84-8160da88eaa7",
                    "index": 3,
                    "plantedAt": null
                },
                {
                    "id": "d6cc3f60-b5c9-4b45-b5ce-09b421f56e74",
                    "index": 4,
                    "plantedAt": null
                },
                {
                    "id": "a885d6a1-a13c-49ac-a1f8-b27f402df8e8",
                    "index": 5,
                    "plantedAt": null
                },
                {
                    "id": "157d1fa2-0569-4894-80f0-c26a374c843b",
                    "index": 6,
                    "plantedAt": null
                },
                {
                    "id": "468d3348-70f3-4bc6-8575-b25f5624d063",
                    "index": 7,
                    "plantedAt": null
                },
                {
                    "id": "24a24a7f-afe9-4646-8e00-1445d9be6959",
                    "index": 8,
                    "plantedAt": "2024-07-23T18:05:49.355Z"
                },
                {
                    "id": "9902b97c-fbd2-47bf-9fe4-e1d17769577a",
                    "index": 9,
                    "plantedAt": null
                },
                {
                    "id": "dbeba11c-9ab1-47bb-8a60-7c61b395fc20",
                    "index": 0,
                    "plantedAt": "2024-07-23T18:02:42.451Z"
                },
                {
                    "id": "3b695acb-54d9-451e-9826-f5a9586e77f7",
                    "index": 2,
                    "plantedAt": null,
                },
                {
                    "id": "c67394ec-f02e-406a-86ef-3a29d305272c",
                    "index": 1,
                    "plantedAt": "2024-07-23T18:06:22.579Z"
                }
            ],
            "tasks": [
                {
                    "id": "bf58b575-ecce-4591-943b-f3980a7bbf42",
                    "completedAt": null
                },
                {
                    "id": "a97cccd0-74cc-4370-b8e3-dea93655e222",
                    "completedAt": "2024-07-23T18:02:21.638Z"
                },
                {
                    "id": "55764dfd-8c3a-46db-8115-a51c0353e497",
                    "completedAt": "2024-07-23T18:02:42.311Z"
                }
            ]
        }
    }
    return response
}