import { TextInput, Button, Group, PinInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, loginValidate } from 'api/user/index';
import { addNotification } from 'store/NotificationSlice/NotificationSlice';
import { setUser } from 'store/UserSlice/UserSlice';

import styles from './LoginPage.module.scss';
import { da } from 'date-fns/locale';

const LoginPage = () => {
    const [isPin, setIsPin] = useState<boolean>(false);
    const [pinCode, setPinCode] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleFormSubmit = async (values: any) => {
        try {
            // 1
            const { status } = await loginValidate(
                values.phone,
            )

            if (status === 200) {
                setIsPin(true);
                setPhone(values.phone);
            }
        } catch ({ response }) {
            const { data, status } = response;

            if (status === 409 && data.message.startsWith("Номер телефона")) {
                navigate('/registration')
            }

            dispatch(addNotification({
                title: 'Ошибка',
                status: status || undefined,
                description: data?.message || 'Произошла ошибка при авторизации',
                isOpen: true,
            }))
        }
    };

    const Login = async () => {
        // 2
        try {
            const { data, status } = await login(
                phone,
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
            phone: '+7',
            termsOfService: false,
        },

        validate: {
            phone: (value) => (value.length === 12 ? null : 'Некорректный номер телефона'),
        },
    });

    return (
        <form onSubmit={form.onSubmit(values => handleFormSubmit(values))} className={styles.form}>
            <div className={styles['form-input']}>
                <Text size="26px" fw={700} c='black' lh={1.3}>Введите номер телефона</Text>
                <Text size="sm" c="dimmed">Чтобы войти или зарегистрироваться</Text>
                <TextInput
                    mt={15}
                    placeholder="999-111-11-11"
                    key={form.key('phone')}
                    {...form.getInputProps('phone')}
                />
            </div>
            <Group styles={{ root: { display: !isPin ? 'flex' : 'none' } }} justify="center" mt="md">
                <Button type="submit" fullWidth>Получить код</Button>
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
                <Button onClick={Login}>Войти</Button>
            </Group>
        </form >
    );
}

export default LoginPage;