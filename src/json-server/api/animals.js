export const getAnimals = () => {
  return [
    {
      id: "6b190a4d-0680-45ed-9f80-839cbf866eb1",
      amount: 1,
      inventoryItem: {
        id: "4d11dcda-0f2d-426e-980c-3233446bb2c5",
        createdAt: "2024-07-19T13:36:07.352Z",
        updatedAt: "2024-07-19T13:36:07.352Z",
        deletedAt: null,
        name: "Корова",
        description:
          "Особая ценность молочной коровы как сельскохозяйственного животного зависит от ее способности потреблять и переваривать большое количество грубых кормов и превращать их в молоко и мясо, особенно хорошо усвояемые человеком.",
        price: 300,
        sellMultiplier: 0.8,
        category: "Animal",
        animal: {
          id: "7b1b8900-51cb-48d5-8c78-eee810af4fd2",
          type: "CowAnimal",
          harvestTimeout: 64800000,
        },
        seed: null,
        animalProduct: null,
        seedProduct: null,
        promoCode: null,
      },
    },
  ];
};

export const getAnimalsHarvest = () => {
  return [
    {
      id: "505d3dcb-b1b4-444e-aa55-405c0f12e5f4",
      index: 1,
      startTime: "2024-06-24T19:53:25.367Z",
      animal: "PigAnimal",
    },
  ];
};

export const postAnimal = () => {
  return "ok";
};
