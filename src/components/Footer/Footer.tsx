import { Tabs, Text } from '@mantine/core';
import { IconServer, IconDiscount, IconTrendingUp, IconCoffee, IconFileCheck } from '@tabler/icons-react';
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
                        value="analys"
                    >

                        <IconTrendingUp style={{ width: 25, height: 25 }} />
                        <Text fw={600} size='10px' mt='5px'>Анализ</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="sale"
                    >
                        <IconDiscount style={{ width: 25, height: 25 }} />
                        <Text fw={600} size='10px' mt='5px'>Акции</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="service"
                    >
                        <IconServer style={{ width: 25, height: 25 }} />
                        <Text fw={600} size='10px' mt='5px'>Сервисы</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="coffee"
                    >
                        <IconCoffee style={{ width: 25, height: 25 }} />
                        <Text fw={600} size='10px' mt='5px'>Кофе</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="offers"
                    >
                        <IconFileCheck style={{ width: 25, height: 25 }} />
                        <Text fw={600} size='10px' mt='5px'>Предложения</Text>
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </div >
    )
}

export default Footer;