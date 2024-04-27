import { TextInput, Button, Group, PinInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
    const [isPin, setIsPin] = useState(false);
    const [pinCode, setPinCode] = useState('');

    const handleFormSubmit = (values: any) => {
        console.log(values);
        setIsPin(true);
    };

    const Login = () => {
        console.log(pinCode)
    }

    const handlePinInputChange = (value: string) => {
        setPinCode(value);
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            phone: '',
            termsOfService: false,
        },

        validate: {
            phone: (value) => (value.length === 10 ? null : 'Некорректный номер телефона'),
        },
    });

    return (
        <form onSubmit={form.onSubmit(values => handleFormSubmit(values))}>
            <TextInput
                styles={{ input: { fontSize: 'var(--mantine-font-size-md))' } }}
                leftSectionPointerEvents="none"
                leftSection="+7"
                label="Номер телефона"
                placeholder="999-111-11-11"
                key={form.key('phone')}
                {...form.getInputProps('phone')}
            />
            <Group styles={{ root: { display: !isPin ? 'block' : 'none' } }} justify="center" mt="md">
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
                <Button onClick={() => Login()}>Войти</Button>
            </Group>
        </form>
    );
}

export default LoginPage;