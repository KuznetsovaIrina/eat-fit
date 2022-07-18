export const GENDER_MALE = 'male';
export const GENDER_FEMALE = 'female';
export const TARGET_RESET = 'reset';
export const TARGET_SUPPORT = 'support';

export const genders = {
    [GENDER_MALE]: 'Мужской',
    [GENDER_FEMALE]: 'Женский'
}

const caloriesToGrams = {
    squirrels: 4,
    fats: 9,
    carbohydrates: 4
}

const bjuRatioPercentage = {
    squirrels: 30,
    fats: 30,
    carbohydrates: 40
}

export const targets = {
    [TARGET_RESET]: 'Сбросить вес',
    [TARGET_SUPPORT]: 'Поддерживать вес'
}

export const activityFactors = [
    {
        value: 1.2,
        text: 'почти нет активности, сидячий образ жизни, человек не занимается спортом'
    },
    {
        value: 1.375,
        text: 'слабая активность. Это сидячий образ жизни и немного спорта — до трех малоинтенсивных тренировок в неделю'
    },
    {
        value: 1.55,
        text: 'средняя активность. Чтобы выбрать этот коэффициент, человек должен тренироваться три-четыре раза в неделю, тренировки должны быть интенсивными, но не тяжелыми'
    },
    {
        value: 1.7,
        text: 'высокая активность. Это ежедневные занятия спортом или ежедневная работа, связанная с большим количеством перемещений и ручного труда, например — занятие сельским хозяйством'
    },
    {
        value: 1.9,
        text: 'экстремальная активность. Это скорее для профессиональных спортсменов и людей, активно трудящихся: работа с тяжестями и т.д.'
    }
]

export const getActivityFactorByValue = value => activityFactors.find(factor => factor.value === value);

const calculationWomenNorm = (weight, growth, age, activity) => (447.6 + (9.2 * weight) + (3.1 * growth) - (4.3 * age)) * activity
const calculationManNorm = (weight, growth, age, activity) => (88.36 + (13.4 * weight) + (4.8 * growth) - (5.7 * age)) * activity;
const normWithResetWeight = (norm, percent) => norm - (norm / 100 * percent);
const getSquirrels = norm => Math.round(norm * (bjuRatioPercentage.squirrels / 100) / caloriesToGrams.squirrels);
const getFats = norm => Math.round(norm * (bjuRatioPercentage.fats / 100) / caloriesToGrams.fats);
const getCarbohydrates = norm => Math.round(norm * (bjuRatioPercentage.carbohydrates / 100) / caloriesToGrams.carbohydrates);

export const calculationNorm = (gender, weight, growth, age, activity, target) => {
    let norm;
        
    if (gender === GENDER_FEMALE) {
        norm = calculationWomenNorm(weight, growth, age, +activity);
    } else {
        norm = calculationManNorm(weight, growth, age, +activity);
    }

    let squirrels = getSquirrels(norm);
    let fats = getFats(norm);
    let carbohydrates = getCarbohydrates(norm);

    if (target === TARGET_RESET) {
        norm = normWithResetWeight(norm, 15);
        squirrels = getSquirrels(norm);
        fats = getFats(norm);
        carbohydrates = getCarbohydrates(norm);
    }

    return {
        kcal: Math.round(norm),
        squirrels,
        fats,
        carbohydrates
    }
}