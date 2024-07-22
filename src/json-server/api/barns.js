export const getBarns = () => {
  return [
    {
      id: "318f7128-3e0f-4a73-96c3-37e287ee7365",
      index: 1,
      startedAt: null,
      animal: null,
    },
    {
      id: "b7f2ebe4-469c-4f54-97a8-d2e1cce3d0e9",
      index: 2,
      startedAt: null,
      animal: null,
    },
    {
      id: "0539f640-9c43-4c3a-880b-89d540522a3e",
      index: 3,
      startedAt: null,
      animal: null,
    },
    {
      id: "7a10303d-064c-4c2a-8778-593deffc75aa",
      index: 0,
      startedAt: "2024-07-20T15:26:25.112Z",
      animal: {
        id: "bc391e18-139f-48c6-8426-fc2edb8ae5b6",
        type: "PigAnimal",
        harvestTimeout: 86400000,
      },
    },
  ];
};

export const postBarnsHarvest = () => {
  return [
    {
      id: "505d3dcb-b1b4-444e-aa55-405c0f12e5f4",
      index: 1,
      plantedAt: "2024-06-24T19:53:25.367Z",
      crop: "Carrot",
    },
  ];
};

export const postStart = () => {
  return "ok";
};

