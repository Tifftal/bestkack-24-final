import { Tabs, Text } from '@mantine/core';
import { IconServer, IconDiscount, IconTrendingUp, IconCoffee, IconFileCheck } from '@tabler/icons-react';

import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Tabs variant="unstyled" defaultValue="settings" classNames={styles}>
                <Tabs.List grow>
                    <Tabs.Tab
                        value="settings"
                    >
                        <IconTrendingUp style={{ width: 25, height: 25 }} />
                        <Text fw={600} size='10px' mt='5px'>Анализ</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="messages"
                    >
                        <IconDiscount style={{ width: 25, height: 25 }} />
                        <Text fw={600} size='10px' mt='5px'>Акции</Text>
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="gallery"
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