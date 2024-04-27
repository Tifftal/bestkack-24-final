import logo from 'assets/logo.png';
import { ActionIcon, Button, Group, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { selectUserState } from 'store/UserSlice/userSelector';

import styles from './Navbar.module.scss';

const Navbar = () => {
    const navigate = useNavigate();

    const user = useSelector(selectUserState);

    const Logout = () => {
        localStorage.removeItem('atoken');
        localStorage.removeItem('rtoken');
        navigate('/login');
    };

    return (
        <div className={styles.navbar}>
            <Group>
                <Image
                    radius="md"
                    h={35}
                    src={logo}
                />
                <ActionIcon variant="transparent" radius="xl" aria-label="Settings">
                    <IconUserCircle
                        onClick={() => navigate('/profile')}
                        style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <Text fw={600} size='lg'>{user.name}</Text>
            </Group>
            <Button
                variant='light'
                rightSection={<IconLogout size={18} />}
                onClick={Logout}
            >
                Выйти
            </Button>

        </div>
    )
}

export default Navbar;