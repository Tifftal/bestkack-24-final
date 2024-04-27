import { Tabs, Text } from '@mantine/core';
import { IconServer, IconDiscount, IconCategory, IconShoppingBag, IconCoffee, IconHome, IconQrcode, IconShoppingCart } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import { setChosenLink } from 'store/NavigateSlice/NavigationSlice';
import { selectNavigationState } from 'store/NavigateSlice/navigationSelector';
import styles from './Footer.module.scss';

const Footer = () => {
    const dispatch = useDispatch();
    const chosenLink = useSelector(selectNavigationState);

    return (
        <div className={styles.footer}>
            <Tabs
                variant="unstyled"
                classNames={styles}
                value={chosenLink}
                onChange={(value: any) => dispatch(setChosenLink(value))}
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
                        <IconShoppingCart style={{width: 20, height: 20}} />
                        <Text fw={600} size='9px' mt='5px'>Магазин</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="product"
                    >
                        <IconShoppingBag style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Продукт дня</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="other"
                    >
                        <IconCategory style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Другое</Text>
                    </Tabs.Tab>
                    {/* <Tabs.Tab
                        value="sale"
                    >
                        <IconDiscount style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Акции</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="service"
                    >
                        <IconServer style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Сервисы</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="coffee"
                    >
                        <IconCoffee style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Кофе</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="offers"
                    >
                        <IconFileCheck style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Предложения</Text>
                    </Tabs.Tab> */}
                </Tabs.List>
            </Tabs>
        </div >
    )
}

export default Footer;