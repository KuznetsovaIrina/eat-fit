import { createSelector } from "reselect";

export const getAllIngredients = (state) => {
    return state.ingredients.allIngredients;
}

export const getAllIngredientsWithDefaultWeight = createSelector(
    getAllIngredients,
    ingredients => ingredients.map(i => ({...i, weight: 100}))
);