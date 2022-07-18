import { createSelector } from "reselect";
import { formatNumber, HUNDRED_GRAMS } from "../util/helpers";

export const getAllIngredients = (state) => {
    return state.ingredients.allIngredients;
}

export const getUserIngredients = (state) => {
    return state.ingredients.userIngredients;
}

export const getAllDishes = (state) => {
    return state.dishes.dishes;
}

export const getAllMeals = (state) => {
    return state.menu.meals;
}

export const getCurentDate = (state) => {
    return state.menu.currentDate;
}

export const getMealsToday = createSelector(
    getAllMeals,
    getCurentDate,
    (meals, currentDate) => {
        return meals.filter(m => m.date === currentDate);
    }
);

export const getTotalToday = createSelector(
    getMealsToday,
    meals => {
        const total = meals
            .reduce((prev, current) => {
                return {
                    k: current.total ? prev.k + +current.total.kcal : prev.k,
                    s: current.total ? prev.s + +current.total.squirrels : prev.s,
                    f: current.total ? prev.f + +current.total.fats : prev.f,
                    c: current.total ? prev.c + +current.total.carbohydrates : prev.c,
                }
            }, { k: 0, s: 0, f: 0, c: 0 });
        
        return {
            kcal: formatNumber(total.k),
            squirrels: formatNumber(total.s),
            fats: formatNumber(total.f),
            carbohydrates: formatNumber(total.c),
        }
    }
);

export const getAllIngredientsWithDefaultWeight = createSelector(
    getAllIngredients,
    getUserIngredients,
    (ingredients, userIngredients) => {
        const i = ingredients.map(i => ({...i, weight: HUNDRED_GRAMS}));
        const u = userIngredients.map(i => ({...i, weight: HUNDRED_GRAMS}));
        return [...u, ...i];
    }
);

export const getAllIngredientsWithDishes = createSelector(
    getAllDishes,
    getAllIngredientsWithDefaultWeight,
    (dishes, ingredients) => {
        return [
            ...dishes.map(d => ({
                id: d.id,
                title: d.title,
                kcal: d.hundredGrams.kcal,
                squirrels: d.hundredGrams.squirrels,
                fats: d.hundredGrams.fats,
                carbohydrates: d.hundredGrams.carbohydrates,
                weight: HUNDRED_GRAMS,
            })),
            ...ingredients
        ]
    }
);