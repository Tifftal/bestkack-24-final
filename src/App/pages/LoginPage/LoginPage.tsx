import { TextInput, Button, Group, PinInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [isPin, setIsPin] = useState(false);
    const [pinCode, setPinCode] = useState('');

    const navigate = useNavigate();

    const handleFormSubmit = (values: any) => {
        console.log(values);
        setIsPin(true);
    };

    const Login = () => {
        console.log(pinCode);
        navigate('/');
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