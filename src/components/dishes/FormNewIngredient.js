import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './../../assets/styles/modules/Dishes.module.scss';
import { useForm } from 'react-hook-form';
import CaloriesField from './../CaloriesField';
import { ControllerInput } from '../../util/controllers';

const FormANewIngredient = ({
    addIngredient
}) => {
    const { handleSubmit, reset, control } = useForm();

    const onSubmit = (formData) => {
        addIngredient(formData);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.newIngredientForm}>
            <label className={styles.labelNewIngredient}>
                Добавить новый Ингредиент <br />
                <small>После успешного добавления, выберите его из списка</small>
            </label>
            <div>
                <div>
                    <ControllerInput
                        control={control}
                        name='title'
                        rules={{ required: 'Это поле обязательно' }}
                        placeholder='Название'
                    />
                </div>
                <CaloriesField
                    control={control}
                    hiddenLabels={true}
                />
                <Button htmlType='submit' icon={<PlusOutlined />} size='small' type='link'>Добавить</Button>
            </div>
        </form>
    )
}

export default FormANewIngredient;