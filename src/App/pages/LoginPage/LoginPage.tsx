import { TextInput, Button, Group, PinInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, login_validate, test_one, test_three, test_two } from 'api/user/index';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/UserSlice/UserSlice';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
    const [isPin, setIsPin] = useState<boolean>(false);
    const [pinCode, setPinCode] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const navigate = useNavigate();

    const dispath = useDispatch();

    const handleFormSubmit = async (values: any) => {
        console.log(values);
        try {
            const response = await login_validate(
                values.phone,
            )

            if (response.status === 200) {
                setIsPin(true);
                setPhone(values.phone);
            }
        }

        catch (error) {
            console.error(error)
        }
    };

    const Login = async () => {
        try {
            const response = await login(
                phone,
                pinCode
            )

            if (response.data.jwtTokens) {
                localStorage.setItem('atoken', response.data.jwtTokens.access);
                localStorage.setItem('rtoken', response.data.jwtTokens.refresh);
            }

            dispath(setUser(response.data));
            navigate('/');
            console.log(response)
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
            phone: '+7',
            termsOfService: false,
        },

        validate: {
            phone: (value) => (value.length === 12 ? null : 'Некорректный номер телефона'),
        },
    });

    const TestError = async () => {
        try {
            const response = await test_three()
            console.log(response)
        }
        catch (error) {
            console.error(error)
        }
    }

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
            <Button onClick={TestError}>TEST ERROR</Button>
        </form >
    );
}

export default LoginPage;