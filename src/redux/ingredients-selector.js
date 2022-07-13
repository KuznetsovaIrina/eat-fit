import { createSelector } from "reselect";

export const getAllIngredients = (state) => {
    return state.ingredients.allIngredients;
}

export const getAllDishes = (state) => {
    return state.dishes.dishes;
}

export const getAllIngredientsWithDefaultWeight = createSelector(
    getAllIngredients,
    ingredients => ingredients.map(i => ({...i, weight: 100}))
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
                weight: 100,
            })),
            ...ingredients
        ]
    }
);