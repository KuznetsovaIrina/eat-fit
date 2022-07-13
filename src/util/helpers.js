export const USER_CATEGORY_INGREDIENTS = 'user';

export const objToArray = (object) => {
    return Object.keys(object).map(id => ({...object[id], id }))
}