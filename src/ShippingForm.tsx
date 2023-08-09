import {Controller, useForm} from "react-hook-form";
import {IOption, IShippingField} from "./interfaces/interfaces.ts";
import ReactSelect from "react-select";


const options: IOption[] = [{
    value: 'ukr',
    label: 'Ukraine'
}, {
    value: 'usa',
    label: 'USA'
}, {
    value: 'china',
    label: 'China'
}]

const getValue = (value: string) => {
    value ? options.find(option => option.value === value) : ''
}

export const ShippingForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        getValues,
        getFieldState,
        watch,
        setValue,
        control
    } = useForm<IShippingField>({defaultValues: {email: 'test@mail.com'}, mode: 'onChange'})

    return (
        <form>
            <h1>Enter your info</h1>
            <div>
                <input type="text" placeholder={'Email'}  {...(register('email',
                    {
                        required: 'Email is required field',
                        pattern: {
                            message: 'Please enter valid email',
                            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
                        }
                    }))}/>
                {errors.email && (
                    <div>{errors.email.message}</div>
                )}
                <input
                    {...(register('name', {required: 'Name is required field'}))}
                    type="text" placeholder={'Name'}/>
                {errors?.name && (
                    <div>{errors.name.message}</div>
                )}
            </div>

            <Controller control={control}
                        name={'address.country'}
                        rules={{
                            required: 'Country is required'
                        }}
                        render={({field: {onChange, value}, fieldState: {error}}) => <ReactSelect
                            placeholder={'Countries'}
                            value={getValue(value)}
                            onChange={(newValue) => onChange((newValue as IOption).value)}
                            options={options}/>}/>
            {errors.address?.country && (
                <div>{errors.address.country.message}</div>
            )}

            <button>Submit</button>
        </form>
    )
}