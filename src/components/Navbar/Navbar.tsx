import logo from 'assets/logo.png';
import { ActionIcon, Button, Group, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';

import styles from './Navbar.module.scss';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.navbar}>
            <Group>
                <Image
                    radius="md"
                    h={35}
                    src={logo}
                />
                <ActionIcon variant="light" radius="xl" aria-label="Settings">
                    <IconUserCircle 
                    onClick={() => navigate('/profile')}
                    style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <Text fw={600} size='lg'>Варвара</Text>
            </Group>
            <Button
                variant='light'
                rightSection={<IconLogout size={18} />}
                onClick={() => navigate('/login')}
            >
                Выйти
            </Button>

        </div>
    )
}

export default Navbar;