import { useForm, isNotEmpty, hasLength } from '@mantine/form';
import { Button, Group, TextInput, PinInput } from '@mantine/core';

import styles from './RegistrationPage.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register_validate, register } from 'api/user';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/UserSlice/UserSlice';

interface FormValues {
    login: string;
    name: string;
    middleName: string;
    surname: string;
    phone: string;
}

const RegistrationPage = () => {
    const [isPin, setIsPin] = useState(false);
    const [pinCode, setPinCode] = useState('');
    const [formVal, setFormVal] = useState<FormValues>({
        login: '',
        name: '',
        middleName: '',
        surname: '',
        phone: '',
    });

    const navigate = useNavigate();

    const dispath = useDispatch();

    const handleFormSubmit = async (values: any) => {
        try {
            const response = await register_validate(
                values.login,
                values.name,
                values.middleName,
                values.surname,
                values.phone,
            )

            if (response.status === 200) {
                setIsPin(true);
                setFormVal({
                    login: values.login,
                    name: values.name,
                    middleName: values.middleName,
                    surname: values.surname,
                    phone: values.phone,
                })
            }
        }

        catch (error) {
            console.error(error)
        }
    };

    const Registrate = async () => {
        try {
            const response = await register(
                formVal.login,
                formVal.name,
                formVal.middleName,
                formVal.surname,
                formVal.phone,
                pinCode
            )

            if (response.data.jwtTokens) {
                localStorage.setItem('atoken', response.data.jwtTokens.access);
                localStorage.setItem('rtoken', response.data.jwtTokens.refresh);
            }

            dispath(setUser(response.data));
            navigate('/');
        }

        catch (error) {
            console.error(error)
        }
    }

    const handlePinInputChange = (value: string) => {
        setPinCode(value);
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            surname: '',
            middleName: '',
            login: '',
            phone: '+7',
        },

        validate: {
            name: isNotEmpty('Введите имя'),
            surname: isNotEmpty('Введите фамилию'),
            login: hasLength({ min: 6 }, 'Логин должен содержать не менее 6 символов'),
            phone: (value) => (value.length === 12 ? null : 'Некорректный номер телефона'),
        },
    });

    return (
        <div className={styles.registration}>
            <form onSubmit={form.onSubmit((values) => { handleFormSubmit(values) })}>
                <TextInput
                    label="Введите Ваше имя"
                    placeholder="Иван"
                    withAsterisk
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Введите Вашу фамилию"
                    placeholder="Иванов"
                    withAsterisk
                    mt="md"
                    key={form.key('surname')}
                    {...form.getInputProps('surname')}
                />
                <TextInput
                    label="Введите Ваше отчество"
                    placeholder="Иванович"
                    mt="md"
                    key={form.key('middleName')}
                    {...form.getInputProps('middleName')}
                />
                <TextInput
                    label="Придумайте логин"
                    placeholder="Ivan177"
                    withAsterisk
                    mt="md"
                    key={form.key('login')}
                    {...form.getInputProps('login')}
                />
                <TextInput
                    label="Введите номер телефона"
                    placeholder="999-111-11-11"
                    withAsterisk
                    mt="md"
                    key={form.key('phone')}
                    {...form.getInputProps('phone')}
                />

                <Group justify="flex-end" mt="md" styles={{ root: { display: !isPin ? 'flex' : 'none' } }}>
                    <Button type="submit">Получить код</Button>
                </Group>
                <Group
                    justify="center"
                    mt="md"
                    styles={{ root: { display: isPin ? 'flex' : 'none' } }}
                >
                    <PinInput
                        value={pinCode}
                        onChange={handlePinInputChange}
                    />
                    <Button onClick={Registrate}>Зарегистрироваться</Button>
                </Group>
            </form>
        </div>
    )
}

export default RegistrationPage;