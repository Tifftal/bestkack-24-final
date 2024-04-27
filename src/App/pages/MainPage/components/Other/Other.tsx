import { Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, useMantineTheme } from '@mantine/core';
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
  IconBriefcase,
  IconHomeCog,
  IconCoffee,
  IconUsersGroup,
} from '@tabler/icons-react';

import OtherCard from './components/OtherCard';

import classes from './Other.module.css';

const Other = () => {
  const mockdata = [
    { title: 'Акции', icon: IconBriefcase, color: 'teal',
        description: [
            'Лукойл приглашает вас в мир выгодных предложений! У нас всегда что-то особенное: скидки, бонусы, подарки. Оставайтесь в курсе наших акций и экономьте с Лукойл!',
            'Удваивайте радость с акциями Лукойл! Специально для наших клиентов мы подготовили уникальные предложения, чтобы делать вашу жизнь ярче и выгоднее!'
        ]
     },
    { title: 'Сервисы', icon: IconHomeCog, color: 'teal',
        description: [
            'Лукойл - это не только топливо, но и удобные сервисы! От мойки и автосервиса до кафе и магазинов. Мы заботимся о вашем комфорте и удобстве в пути!',
            'Отличное обслуживание - это наша гордость! Приезжайте в Лукойл и оцените высокий уровень сервиса: быстрое обслуживание, качественные услуги и дружелюбный персонал!'
        ]
     },
    { title: 'Кофейный абонемент', icon: IconCoffee, color: 'cyan',
        description: [
            'Приветствуем вас в мире ароматного кофе с Лукойл! С нашим кофейным абонементом вы можете наслаждаться вкусом любимого напитка каждый день и экономить при этом!',
            'Бодрость в движении с кофейным абонементом от Лукойл! Получайте свой ежедневный заряд энергии вместе с нами и наслаждайтесь каждым глотком на вашем пути!'
        ]
     },
    { title: 'Предложения партнеров', icon: IconUsersGroup, color: 'cyan',
        description: [
            'Партнеры Лукойл - ваш путь к дополнительным преимуществам! С нашими предложениями от партнеров вы можете получить еще больше скидок, бонусов и подарков!',
            'Объединяем усилия для вашего удобства! Наши партнеры предлагают эксклюзивные условия для клиентов Лукойл. Получайте больше, платите меньше с нашими партнерскими предложениями!'
        ]
     },
  ];


  const items = mockdata.map((item) => (
    <OtherCard
      key={item.title}
      title={item.title}
      Icon={item.icon}
      color={item.color}
      description={item.description}
    />
  ));

  return (
    <Card radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text 
            size="xl" 
            weight={700}
        className={classes.title}>Другое</Text>
      </Group>
      <div
        className={classes.grid}
       >
        {items}
      </div>
    </Card>
  );
};

export default Other;
