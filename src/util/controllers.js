import { InputNumber, Input } from 'antd';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';
const { Option } = Select;
const { TextArea } = Input;

const styles = {
    error: {
        color: 'red',
        fontSize: '12px'
    }
}

export const ControllerInputNumber = ({ control, name, rules = {}, placeholder = '' }) => {
    return (
        <Controller
            control={control}
            shouldUnregister={true}
            name={name}
            rules={rules}
            render={({
                field: { name, value, onChange },
                formState: { errors }
            }) => (
                <>
                    <InputNumber placeholder={placeholder} value={value} onChange={onChange} min={0} style={{ width: '100%' }} />
                    {errors[name] && <span style={styles.error}>{errors[name].message}</span>}
                </>
            )}
        />
    )
}

export const ControllerInput = ({ control, name, rules = {}, placeholder = '' }) => {
    return (
        <Controller
            control={control}
            shouldUnregister={true}
            name={name}
            rules={rules}
            render={({
                field: { name, value, onChange },
                formState: { errors }
            }) => (
                <>
                    <Input placeholder={placeholder} value={value} onChange={onChange} />
                    {errors[name] && <span style={styles.error}>{errors[name].message}</span>}
                </>
            )}
        />
    )
}

export const ControllerSelect = ({ control, name, rules = {}, placeholder = '', options, dropdown  }) => {
    return (
        <Controller
            control={control}
            shouldUnregister={true}
            name={name}
            rules={rules}
            render={({
                field: { value, onChange },
                formState: { errors }
            }) => (
                <>
                    <Select
                        value={value}
                        onChange={onChange}
                        style={{ width: '100%' }}
                        placeholder={placeholder}
                        dropdownRender={dropdown}
                    >
                        {options.map((option) => (
                            <Option key={option.id} value={option.id}>
                                {option.title}
                            </Option>
                        ))}
                    </Select>
                    {errors[name] && <span style={styles.error}>{errors[name].message}</span>}
                </>
            )}
        />
    )
}

export const ControllerTextArea = ({ control, name, rules = {}, placeholder = '' }) => {
    return (
        <Controller
            control={control}
            shouldUnregister={true}
            name={name}
            rules={rules}
            render={({
                field: { name, value, onChange },
                formState: { errors }
            }) => (
                <>
                    <TextArea autoSize placeholder={placeholder} value={value} onChange={onChange} />
                    {errors[name] && <span style={styles.error}>{errors[name].message}</span>}
                </>
            )}
        />
    )
}