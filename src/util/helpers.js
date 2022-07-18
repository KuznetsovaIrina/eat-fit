import moment from 'moment';

export const USER_CATEGORY_INGREDIENTS = 'user';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_SHOW_FORMAT = 'DD.MM.YYYY';
export const TABLE_THEME_LIGHT = 'light';
export const TABLE_THEME_DARK = 'dark';
export const HUNDRED_GRAMS = 100;

export const calculateTotalWeight = (amount, startWeight, totalWeight) => amount / startWeight * totalWeight;
export const formatNumber = (number) => parseFloat(number).toFixed(2);
export const formatDate = (date, format = DATE_FORMAT) => moment(date).format(format);
export const addDays = (date, days) => moment(date).add(days, 'days');
export const subtractDays = (date, days) => moment(date).subtract(days, 'days');
export const getToday = () => moment();
export const objToArray = (object) => Object.keys(object).map(id => ({...object[id], id }));

export const rules = {
    required: {required: 'Это поле обязательно'},
}