import { Tabs, Text } from '@mantine/core';
import { IconCategory, IconShoppingBag, IconHome, IconQrcode, IconShoppingCart } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import { setChosenLink } from 'store/NavigateSlice/NavigationSlice';
import { selectNavigationState } from 'store/NavigateSlice/navigationSelector';
import { selectIsUserAdmin } from 'store/UserSlice/userSelector';
import styles from './Footer.module.scss';

const Footer = () => {
    const dispatch = useDispatch();
    const chosenLink = useSelector(selectNavigationState);
    const isUserAdmin = useSelector(selectIsUserAdmin);

    return (
        <div className={styles.footer}>
            <Tabs
                variant="unstyled"
                classNames={styles}
                value={chosenLink}
                onChange={(value: any) => dispatch(setChosenLink(value))}
                styles={{
                    tab: {
                        width: '50px'
                    }
                }}
            >
                <Tabs.List grow>
                    <Tabs.Tab
                        value="main"
                    >
                        <IconHome style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Главная</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="qr"
                    >
                        <IconQrcode style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>QR</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="shop"
                    >
                        <IconShoppingCart style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Магазин</Text>
                    </Tabs.Tab>
                    {isUserAdmin && (
                        <Tabs.Tab
                            value="product"
                        >
                            <IconShoppingBag style={{ width: 20, height: 20 }} />
                            <Text fw={600} size='9px' mt='5px'>Продукт дня</Text>
                        </Tabs.Tab>
                    )}
                    <Tabs.Tab
                        value="other"
                    >
                        <IconCategory style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Другое</Text>
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </div >
    )
}

export default Footer;