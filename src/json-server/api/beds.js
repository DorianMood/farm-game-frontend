export const getBeds = () => {
  return [
    {
      id: "1269f736-fedd-403e-b26e-09c5be8ff42c",
      index: 4,
      plantedAt: null,
      crop: null,
    },
    {
      id: "384a6d8d-79fa-4b36-be7c-bfb40693274b",
      index: 5,
      plantedAt: null,
      crop: null,
    },
    {
      id: "10a50b0c-1be7-4597-97be-27254275d02e",
      index: 6,
      plantedAt: null,
      crop: null,
    },
    {
      id: "0b0c0d4e-d56a-49dc-b19c-07b7d4c895a0",
      index: 7,
      plantedAt: null,
      crop: null,
    },
    {
      id: "e90131f6-6064-4537-b9d1-41905a5f7580",
      index: 8,
      plantedAt: null,
      crop: null,
    },
    {
      id: "4dd797af-6dc9-46c3-82d5-245e961d34c1",
      index: 9,
      plantedAt: null,
      crop: null,
    },
    {
      id: "70a51957-c9b5-40c0-87a3-9058657ad5c0",
      index: 1,
      plantedAt: new Date(),
      crop: null,
    },
    {
      id: "da7b3b29-33e1-4df2-8d7c-2f0bd1901270",
      index: 0,
      plantedAt: "2024-07-22T11:52:15.948Z",
      crop: {
        id: "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
        type: "CarrotSeed",
        harvestTimeout: 300,
      },
    },
    {
      id: "22365d55-1ec4-4ae1-8d84-b3087bf52697",
      index: 3,
      plantedAt: "2024-07-22T11:52:21.872Z",
      crop: {
        id: "706bdb08-1ab8-4d62-b570-6acbc6cacddc",
        type: "CarrotSeed",
        harvestTimeout: 300,
      },
    },
    {
      "id": "e8ffb4d8-b034-4cc3-87a9-678adaec27b2",
      "index": 2,
      "plantedAt": new Date(),
      "crop": {
        "id": "d26781e9-8904-4465-b4ac-90729d66c755",
        "type": "BeetSeed",
        "harvestTimeout": 600000
      }
    }
  ];
};

export const postBedsHarvest = () => {
  return "ok";
};

export const postPlant = () => {
  return "ok";
};

