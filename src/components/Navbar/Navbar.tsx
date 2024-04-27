import logo from 'assets/logo.png';
import { Button, Group, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import styles from './Navbar.module.scss';
import { IconLogout } from '@tabler/icons-react';

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