import { isAuthenticated, loginUser, logoutUser } from "./api/auth.js";
import { getUser, postUser } from "./api/user.js";
import { activateInventoryItem, getInventory } from "./api/inventory.js";
import { getBeds, postBedsHarvest, postPlant } from "./api/beds.js";
import { getBarns, postBarnsHarvest, postStart } from "./api/barns.js";
import { getAnimals } from "./api/animals.js";
import { getTasks, postTask } from "./api/tasks.js";
import { getSurveys } from "./api/surveys.js";
import {
  getProducts,
  postPurchaseProduct,
  postSellProduct,
} from "./api/products.js";
import { getRating } from "./api/rating.js";

export const routes = [
  {
    method: "POST",
    url: "/auth/login",
    handler: loginUser,
  },
  {
    method: "POST",
    url: "/auth/logout",
    handler: logoutUser,
  },
  {
    method: "GET",
    url: "/auth/authenticated",
    handler: isAuthenticated,
  },

  {
    method: "GET",
    url: "/users",
    handler: getUser,
  },
  {
    method: "POST",
    url: "/users",
    handler: postUser,
  },
  {
    method: "GET",
    url: "/inventory",
    handler: getInventory,
  },
  {
    method: "POST",
    url: "/inventory/activate",
    handler: activateInventoryItem,
  },
  {
    method: "GET",
    url: "/beds",
    handler: getBeds,
  },
  {
    method: "POST",
    url: "/beds/harvest",
    handler: postBedsHarvest,
  },
  {
    method: "POST",
    url: "/beds/plant",
    handler: postPlant,
  },
  {
    method: "GET",
    url: "/animals",
    handler: getAnimals,
  },
  {
    method: "GET",
    url: "/barns",
    handler: getBarns,
  },
  {
    method: "POST",
    url: "/barns/harvest",
    handler: postBarnsHarvest,
  },
  {
    method: "POST",
    url: "/animals/start",
    handler: postStart,
  },
  {
    method: "GET",
    url: "/tasks",
    handler: getTasks,
  },
  {
    method: "POST",
    url: "/tasks/complete",
    handler: postTask,
  },
  {
    method: "GET",
    url: "/surveys",
    handler: getSurveys,
  },
  {
    method: "GET",
    url: "/products",
    handler: getProducts,
  },
  {
    method: "POST",
    url: "/products/purchase",
    handler: postPurchaseProduct,
  },
  {
    method: "POST",
    url: "/products/sell",
    handler: postSellProduct,
  },
  {
    method: "GET",
    url: "/users/rating",
    handler: getRating,
  },
];

