import {isAuthenticated, loginUser, logoutUser} from "./api/auth.js";
import {getUser, postUser} from "./api/user.js";
import {getInventory} from "./api/inventiry.js";
import {getBeds, getBedsHarvest, postPlant} from "./api/beds.js";
import {getAnimals, getAnimalsHarvest, postAnimal} from "./api/animals.js";
import {getTasks, postTask} from "./api/tasks.js";
import {getSurveys} from "./api/surveys.js";
import {getProducts, postProduct} from "./api/products.js";

export const routes = [
    {
        method: 'POST',
        url: '/auth/login',
        handler: loginUser
    },
    {
        method: 'POST',
        url: '/auth/logout',
        handler: logoutUser
    },
    {
        method: 'GET',
        url: '/auth/authenticated',
        handler: isAuthenticated
    },

    {
        method: 'GET',
        url: '/users',
        handler: getUser,
    },
    {
        method: 'POST',
        url: '/users',
        handler: postUser,
    },
    {
        method: 'GET',
        url: '/inventory',
        handler: getInventory
    },
    {
        method: 'GET',
        url: '/beds',
        handler: getBeds
    },
    {
        method: 'POST',
        url: '/beds/harvest',
        handler: getBedsHarvest
    },
    {
        method: 'POST',
        url: '/beds/plant',
        handler: postPlant
    },
    {
        method: 'GET',
        url: '/animals',
        handler: getAnimals
    },
    {
        method: 'POST',
        url: '/animals/harvest',
        handler: getAnimalsHarvest
    },
    {
        method: 'POST',
        url: '/animals/start',
        handler: postAnimal
    },
    {
        method: 'GET',
        url: '/tasks',
        handler: getTasks
    },
    {
        method: 'POST',
        url: '/tasks/complete',
        handler: postTask
    },
    {
        method: 'GET',
        url: '/surveys',
        handler: getSurveys
    },
    {
        method: 'GET',
        url: '/products',
        handler: getProducts
    }, {
        method: 'POST',
        url: '/products/purchase',
        handler: postProduct
    }
]