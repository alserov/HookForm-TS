import './App.css'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IOption, IShippingField} from "./interfaces/interfaces.ts";
import {useEffect} from "react";
import ReactSelect from 'react-select'

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

function App() {
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
    const onSubmit: SubmitHandler<IShippingField> = (data) => {
        alert(`Name ${data.name}`)
        reset()
        console.log(`Your country is ${data.address.country}`)
    }

    useEffect(() => {
        const subscription = watch((value, {name, type}) => console.log(value, name, type))
        return () => subscription.unsubscribe()
    }, [watch])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...(register('name', {required: 'Name is required field'}))}
                    type="text" placeholder={'Name'}/>
                {errors?.name && (
                    <div>{errors.name.message}</div>
                )}
                <input
                    {...(register('email',
                        {
                            required: 'Email is required field',
                            pattern: {
                                message: 'Please enter valid email',
                                value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
                            }
                        }))}
                    placeholder={"Email"}
                    type="text"/>
                {errors?.email && (
                    <div>{errors.email.message}
                    </div>
                )}

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

                <button>Send</button>
                <button onClick={() => {
                    setValue('name', 'Max')
                    setValue('email', 'Bebroid')
                }}>Fill data
                </button>
            </form>
        </div>
    )
}

export default App
