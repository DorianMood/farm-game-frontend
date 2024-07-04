export const getBeds = () => {
    return [
        {
            "id": "9638d24a-d489-4c82-b540-fdc17dedbb87",
            "index": 1,
            "plantedAt": null,
            "crop": null
        },
        {
            "id": "34928b35-5d7f-4a0d-b136-1856c37f470f",
            "index": 2,
            "plantedAt": new Date().toISOString(),
            "crop": "Carrot"
        },
        {
            "id": "b6d4ee17-9c4e-4625-a138-d9b4678d0972",
            "index": 3,
            "plantedAt": null,
            "crop": null
        },
        {
            "id": "c3dadcdf-99cf-4542-87ab-7863f0af4663",
            "index": 6,
            "plantedAt": null,
            "crop": null
        },
        {
            "id": "55f3bb5b-4fb8-4264-b53b-f013e2f69a24",
            "index": 7,
            "plantedAt": null,
            "crop": null
        },
        {
            "id": "5f02ab0c-c999-4c64-8536-b43e6d4a897f",
            "index": 8,
            "plantedAt": null,
            "crop": null
        },
        {
            "id": "171088db-fcc6-4c2e-b240-7ff200aae933",
            "index": 9,
            "plantedAt": null,
            "crop": null
        },
        {
            "id": "dc26b22e-4783-4f8d-8f9f-bb96171bac9c",
            "index": 5,
            "plantedAt": "2024-06-24T19:52:02.831Z",
            "crop": "Flower"
        },
        {
            "id": "d8994611-d444-4aa1-ada8-c5720358bb2f",
            "index": 0,
            "plantedAt": "2024-06-24T19:53:25.367Z",
            "crop": "Potato"
        },
        {
            "id": "4e165e89-406b-47d0-bcdd-a34c324ab679",
            "index": 4,
            "plantedAt": "2024-06-24T19:59:40.229Z",
            "crop": "Flower"
        }
    ]
}

export const getBedsHarvest = () => {
    return [
        {
            "id": "505d3dcb-b1b4-444e-aa55-405c0f12e5f4",
            "index": 1,
            "plantedAt": "2024-06-24T19:53:25.367Z",
            "crop": "Carrot"
        }
    ]
}

export const postPlant = () => {
    return 'ok'
}