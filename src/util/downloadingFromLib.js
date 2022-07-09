import productsJSON from './products.json';

export const downloadFromLib = (currentCategory) => {
    if (!productsJSON[currentCategory]) {
        alert('Нет данных с продуктами');
        return;
    }

    const items = productsJSON[currentCategory];

    items.forEach(item => {
        addIngredient({
            ...item,
            imageURL: '#',
            category: currentCategory,
            kcal: +item.kcal,
            squirrels: +item.squirrels,
            fats: +item.fats,
            carbohydrates: +item.carbohydrates,
        }, currentCategory);
    })
}