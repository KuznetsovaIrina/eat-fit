import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import styles from './../../assets/styles/modules/Dishes.module.scss';
import { useForm } from 'react-hook-form';
import CaloriesField from '../CaloriesField';
import { ControllerInput } from '../../util/controllers';
import { rules } from './../../util/helpers'

const FormANewIngredient = ({
    addIngredient,
    setVisible,
    visible
}) => {
    const { handleSubmit, reset, control } = useForm();

    const onSubmit = (formData) => {
        addIngredient(formData)
            .then(m => message.success(m))
            .catch(e => message.error('Что-то пошло не так'));
        reset();
        setVisible(false);
    }

    const close = () => {
        setVisible(false);
    }

    return (
        <Modal
            title="Добавить новый ингредиент"
            visible={visible}
            onCancel={close}
            footer={false}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.newIngredientForm}>
                <label className={styles.labelNewIngredient}>
                    Добавить новый Ингредиент <br />
                    <small>После успешного добавления, выберите его из списка</small>
                </label>
                <ControllerInput
                    control={control}
                    name='title'
                    rules={rules.required}
                    placeholder='Название'
                />
                <CaloriesField
                    control={control}
                    hiddenLabels={true}
                />
                <Button htmlType='submit' icon={<PlusOutlined />} type='primary'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default FormANewIngredient;