import { Button, Group, TextInput, PinInput } from '@mantine/core';
import { useForm, isNotEmpty, hasLength } from '@mantine/form';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerValidate, register, login } from 'api/user';
import { addNotification } from 'store/NotificationSlice/NotificationSlice';
import { setUser } from 'store/UserSlice/UserSlice';
import styles from './RegistrationPage.module.scss';
import { set } from 'date-fns';

interface FormValues {
    login: string;
    name: string;
    middleName: string;
    surname: string;
    phone: string;
}

const RegistrationPage: React.FC = () => {
    const [isPin, setIsPin] = useState(false);
    const [pinCode, setPinCode] = useState('');
    const [error, setError] = useState(false);
    const [formVal, setFormVal] = useState<FormValues>({
        login: '',
        name: '',
        middleName: '',
        surname: '',
        phone: '',
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleFormSubmit = async (values: any) => {
        setError(false);
        try {
            const { status } = await registerValidate(
                values.login,
                values.name,
                values.middleName,
                values.surname,
                values.phone,
            )

            if (status === 200) {
                setIsPin(true);
                setFormVal({
                    login: values.login,
                    name: values.name,
                    middleName: values.middleName,
                    surname: values.surname,
                    phone: values.phone,
                })
            }
        } catch ({ response }) {
            const { data, status } = response;
            console.log(data, status);
            if (data?.message == `User with username ${values.login} exists`) {
                setError(true);
            }
            if(data?.message === 'Phone number exists') {
                setError(false);
                navigate('/login');
            }
            dispatch(addNotification({
                title: 'Ошибка',
                status: status || undefined,
                description: data?.message || 'Произошла ошибка при авторизации',
                isOpen: true,
            }))
        }
    };

    const Registrate = async () => {
        try {
            const { data, status } = await register(
                formVal.login,
                formVal.name,
                formVal.middleName,
                formVal.surname,
                formVal.phone,
                pinCode
            )

            if (status === 200 && data.jwtTokens) {
                localStorage.setItem('atoken', data.jwtTokens.access);
                localStorage.setItem('rtoken', data.jwtTokens.refresh);
            }

            dispatch(setUser(data));
            navigate('/');
        } catch ({ response }) {
            const { data, status } = response;

            dispatch(addNotification({
                title: 'Ошибка',
                status: status || undefined,
                description: data?.message || 'Произошла ошибка при авторизации',
                isOpen: true,
            }))
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

                {error && <p className={styles.error}>Пользователь с таким логином уже существует</p>}

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