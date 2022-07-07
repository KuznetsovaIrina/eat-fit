import React, { useState } from 'react';
import { Radio, Button, InputNumber, Select } from 'antd';
import styles from './../assets/styles/modules/calculator.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { calculationNorm, genders, targets, activityFactors, getActivityFactorByValue } from './../util/calculator';
import { GENDER_MALE, GENDER_FEMALE, TARGET_RESET, TARGET_SUPPORT } from './../util/calculator';
import { connect } from 'react-redux';
import { updateUserInfo } from './../redux/calculator-reducer';
const { Option } = Select;


const Calculator = ({userData, updateUserInfo}) => {
    const { handleSubmit, control } = useForm({ defaultValues: userData.info });
    const [norm, setNorm] = useState(userData.norm || {calories: 0, squirrels: 0, fats: 0, carbohydrates: 0});

    const onSubmit = data => {
        const res = calculationNorm(
            data.gender,
            data.weight,
            data.growth,
            data.age,
            data.activity,
            data.target
        );

        setNorm(res);
        updateUserInfo(data, res);
    }

    return (
        <>
        <h1>Расчет нормы КБЖУ</h1>
        <div className={styles.calculator}>
            <div className={styles.big}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.box}>
                        <label className={styles.label}>Ваш пол</label>
                        <Controller
                            control={control}
                            name='gender'
                            shouldUnregister={true}
                            defaultValue={GENDER_FEMALE}
                            render={({
                                field: { name, value, onChange },
                                formState: { errors }
                            }) => (
                                <>
                                <Radio.Group value={value} onChange={onChange} size="large">
                                    <Radio.Button value={GENDER_FEMALE}>{genders[GENDER_FEMALE]}</Radio.Button>
                                    <Radio.Button value={GENDER_MALE}>{genders[GENDER_MALE]}</Radio.Button>
                                </Radio.Group>
                                {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.box}>
                            <label className={styles.label}>Возраст</label>
                            <Controller
                                control={control}
                                shouldUnregister={true}
                                name='age'
                                rules={{
                                    required: 'Это поле обязательно'
                                }}
                                render={({
                                    field: { name, value, onChange },
                                    formState: { errors }
                                }) => (
                                    <>
                                    <InputNumber value={value} onChange={onChange} min={1} style={{width: '100%'}} />
                                    {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                    </>
                                )}
                            />
                        </div>
                        <div className={styles.box}>
                            <label className={styles.label}>Рост, см</label>
                            <Controller
                                control={control}
                                shouldUnregister={true}
                                name='growth'
                                rules={{
                                    required: 'Это поле обязательно'
                                }}
                                render={({
                                    field: { name, value, onChange },
                                    formState: { errors }
                                }) => (
                                    <>
                                    <InputNumber value={value} onChange={onChange} min={1} style={{width: '100%'}} />
                                    {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                    </>
                                )}
                            />
                        </div>
                        <div className={styles.box}>
                            <label className={styles.label}>Вес, кг</label>
                            <Controller
                                control={control}
                                shouldUnregister={true}
                                name='weight'
                                rules={{
                                    required: 'Это поле обязательно'
                                }}
                                render={({
                                    field: { name, value, onChange },
                                    formState: { errors }
                                }) => (
                                    <>
                                    <InputNumber value={value} onChange={onChange} min={1} style={{width: '100%'}} />
                                    {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className={styles.box}>
                        <label className={styles.label}>Образ жизни</label>
                        <Controller
                            control={control}
                            shouldUnregister={true}
                            name='activity'
                            rules={{
                                required: 'Это поле обязательно'
                            }}
                            render={({
                                field: { name, value, onChange },
                                formState: { errors }
                            }) => (
                                <>
                                <Select value={value} onChange={onChange} style={{width:'100%'}}>
                                    {activityFactors.map(factor =>
                                        <Option key={factor.value} value={factor.value}>
                                            {getActivityFactorByValue(factor.value).text}
                                        </Option>)
                                    }
                                </Select>
                                {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div className={styles.box}>
                        <label className={styles.label}>Цель</label>
                        <Controller
                            control={control}
                            shouldUnregister={true}
                            name='target'
                            defaultValue={TARGET_SUPPORT}
                            rules={{
                                required: 'Это поле обязательно'
                            }}
                            render={({
                                field: { name, value, onChange },
                                formState: { errors }
                            }) => (
                                <>
                                <Radio.Group value={value} onChange={onChange} defaultValue='support' size="large">
                                    <Radio.Button value={TARGET_RESET}>{targets[TARGET_RESET]}</Radio.Button>
                                    <Radio.Button value={TARGET_SUPPORT}>{targets[TARGET_SUPPORT]}</Radio.Button>
                                </Radio.Group>
                                {errors[name] && <span className={styles.error}>{errors[name].message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div className={styles.submit}>
                        <Button htmlType='submit' className={styles.button} type='primary' size='large'>Рассчитать</Button>
                    </div>
                </form>
            </div>
            <div className={styles.small}>
                <ul className={styles.result}>
                   <li>Норма Калорий: {norm.calories}</li>
                   <li>Белков, г: {norm.squirrels}</li>
                   <li>Жиров, г: {norm.fats}</li>
                   <li>Углеводов, г: {norm.carbohydrates}</li>
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