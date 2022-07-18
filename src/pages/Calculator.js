import React from 'react';
import styles from './../assets/styles/modules/Calculator.module.scss';
import { connect } from 'react-redux';
import { updateUserInfo } from './../redux/calculator-reducer';
import Form from './../components/calculator/Form'

const Calculator = ({
    userData,
    updateUserInfo
}) => {
    return (
        <>
        <h1>Расчет нормы КБЖУ</h1>
        <div className={styles.calculator}>
            <div className={styles.big}>
                <Form
                    data={userData}
                    update={updateUserInfo}
                />
            </div>
            <div className={styles.small}>
                <ul className={styles.result}>
                   <li>Калорий: {userData.norm && userData.norm.kcal}</li>
                   <li>Белков, г: {userData.norm && userData.norm.squirrels}</li>
                   <li>Жиров, г: {userData.norm && userData.norm.fats}</li>
                   <li>Углеводов, г: {userData.norm && userData.norm.carbohydrates}</li>
                </ul>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    userData: state.calculator.data,
});

export default connect(mapStateToProps, { updateUserInfo })(Calculator);;