import { Tabs, Text } from '@mantine/core';
import { IconServer, IconDiscount, IconTrendingUp, IconCoffee, IconFileCheck, IconHome, IconQrcode } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Footer.module.scss';
import { setChosenLink } from 'store/NavigateSlice/NavigationSlice';
import { selectNavigationState } from 'store/NavigateSlice/navigationSelector';

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
                        value="analys"
                    >
                        <IconTrendingUp style={{ width: 20, height: 20 }} />
                        <Text fw={600} size='9px' mt='5px'>Анализ</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
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
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </div >
    )
}

export default Footer;