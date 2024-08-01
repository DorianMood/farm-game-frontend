export const getInventory = () => {
  return {
    id: "d6ac0e56-8dd6-4d96-befa-084f37ca6364",
    items: [
      {
        id: "4421df63-9698-42f0-bff9-1e372dae5c02",
        amount: 1,
        inventoryItem: {
          id: "303a0978-e991-4d67-aafc-c66975d80c78",
          createdAt: "2024-07-19T13:36:07.352Z",
          updatedAt: "2024-07-19T13:36:07.352Z",
          deletedAt: null,
          name: "Корова",
          description:
            "Особая ценность молочной коровы как сельскохозяйственного животного зависит от ее способности потреблять и переваривать большое количество грубых кормов и превращать их в молоко и мясо, особенно хорошо усвояемые человеком.",
          price: 30,
          sellMultiplier: 0.8,
          category: "AnimalProduct",
          animal: null,
          seed: null,
          animalProduct: {
            id: "81685977-52ac-4afd-9cd5-4f5647cc1c87",
            type: "Cow",
          },
          seedProduct: null,
          promoCode: null,
        },
      },
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
      {
        id: "01c402ed-3367-4f05-8e04-8c0534ea6126",
        amount: 5,
        inventoryItem: {
          id: "2ee87c7a-91f4-4807-92c8-3ec2f923dd9d",
          createdAt: "2024-07-19T13:36:07.352Z",
          updatedAt: "2024-07-19T13:36:07.352Z",
          deletedAt: null,
          name: "Морковь",
          description:
            "Обычно в быту под словом «морковь» подразумевается широко распространённый корнеплод именно этого растения, который обычно относят к овощам.",
          price: 12,
          sellMultiplier: 1,
          category: "Seed",
          animal: null,
          seedProduct: null,
          animalProduct: null,
          seed: {
            id: "630d14a5-1dfd-4652-b954-67261db7490d",
            type: "CarrotSeed",
          },
          promoCode: null,
        },
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
    ],
  };
};

export const activateInventoryItem = () => {
  return "OK";
};
