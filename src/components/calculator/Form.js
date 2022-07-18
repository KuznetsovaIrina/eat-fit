import React, { useState } from 'react';
import { Radio, Button, InputNumber, Select, Switch } from 'antd';
import styles from './../../assets/styles/modules/Calculator.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { genders, targets, activityFactors, getActivityFactorByValue } from './../../util/calculator';
import { GENDER_MALE, GENDER_FEMALE, TARGET_RESET, TARGET_SUPPORT } from './../../util/calculator';
import { rules } from './../../util/helpers';
import { calculationNorm } from './../../util/calculator';
import CaloriesField from './../CaloriesField';
const { Option } = Select;

const Form = ({
    data,
    update
}) => {
    const [ownNorm, setOwnNorm] = useState(data.info.ownNorm);
    console.log(data);
    const { handleSubmit, control } = useForm({ defaultValues: {...data.norm, ...data.info} });

    const onSubmit = formData => {
        console.log(formData);
        if (!ownNorm) {
            const test = calculationNorm(
                formData.gender,
                formData.weight,
                formData.growth,
                formData.age,
                formData.activity,
                formData.target,
            );
            update({...formData, ownNorm}, test);
        } else {
            update({ ownNorm }, {
                kcal: formData.kcal,
                carbohydrates: formData.carbohydrates,
                fats: formData.fats,
                squirrels: formData.squirrels
            });
        }
    }

    const onChange = (checked) => {
        setOwnNorm(checked);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
                <Switch checked={ownNorm} onChange={onChange} />
                Указать свою норму
            </div>

            {ownNorm &&
                <CaloriesField
                    control={control}
                />
            }

            {!ownNorm &&
                <>
                <div className={styles.box}>
                    <label className={styles.label}>Ваш пол</label>
                    <Controller
                        control={control}
                        name='gender'
                        shouldUnregister={false}
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
                            shouldUnregister={false}
                            name='age'
                            rules={rules.required}
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
                            shouldUnregister={false}
                            name='growth'
                            rules={rules.required}
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
                            shouldUnregister={false}
                            name='weight'
                            rules={rules.required}
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
                        shouldUnregister={false}
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
                        shouldUnregister={false}
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
                </>
            }
            <div className={styles.submit}>
                <Button htmlType='submit' className={styles.button} type='primary' size='large'>Рассчитать</Button>
            </div>
        </form>
    )
}

export default Form;