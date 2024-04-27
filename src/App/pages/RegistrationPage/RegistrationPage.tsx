import { useForm, isNotEmpty, isInRange } from '@mantine/form';
import { Button, Group, TextInput, PinInput } from '@mantine/core';

import styles from './RegistrationPage.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
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
            name: '',
            surname: '',
            middleName: '',
            login: '',
            phone: '+7',
        },

        validate: {
            name: isNotEmpty('Введите имя'),
            surname: isNotEmpty('Введите фамилию'),
            login: isInRange({ min: 6 }, 'Логин должен содержать не менее 6 символов'),
            phone: (value) => (value.length === 10 ? null : 'Некорректный номер телефона'),
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
                    <Button onClick={Login}>Зарегистрироваться</Button>
                </Group>
            </form>
        </div>
    )
}

export default RegistrationPage;