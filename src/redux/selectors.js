import { createSelector } from "reselect";

export const getAllIngredients = (state) => {
    return state.ingredients.allIngredients;
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
                if (current.total) {
                    return {
                        kcal: prev.kcal + +current.total.kcal,
                        squirrels: prev.squirrels + +current.total.squirrels,
                        fats: prev.fats + +current.total.fats,
                        carbohydrates: prev.carbohydrates + +current.total.carbohydrates,
                    }
                } else {
                    return {
                        kcal: prev.kcal,
                        squirrels: prev.squirrels,
                        fats: prev.fats,
                        carbohydrates: prev.carbohydrates
                    }     
                }
            }, {
                kcal: 0,
                squirrels: 0,
                fats: 0,
                carbohydrates: 0
            });
        
        return {
            kcal: parseFloat(total.kcal).toFixed(2),
            squirrels: parseFloat(total.squirrels).toFixed(2),
            fats: parseFloat(total.fats).toFixed(2),
            carbohydrates: parseFloat(total.carbohydrates).toFixed(2),
        }
    }
);

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