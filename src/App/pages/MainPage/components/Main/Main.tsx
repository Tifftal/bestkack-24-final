import { Card, Group, Progress, Text, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import a1 from 'assets/achivments/1.png';
import a2 from 'assets/achivments/2.png';
import a3 from 'assets/achivments/3.png';
import a4 from 'assets/achivments/4.png';
import a5 from 'assets/achivments/5.png';
import a6 from 'assets/achivments/6.png';
import a7 from 'assets/achivments/7.png';
import a8 from 'assets/achivments/8.png';
import a9 from 'assets/achivments/9.png';
import { getAchievements } from 'api/user/index';
import { useDispatch } from 'react-redux';
import { setAchievement } from 'store/AchievementSlice/AchievementSlice';

import styles from './Main.module.scss';

interface Achivement {
  name: string;
  value: number;
  icon: string;
}

const Main = () => {
  const achivments = [
    {
      id: 1,
      name: 'Новичок',
      value: 1000,
      icon: a1,
    },
    {
      id: 2,
      name: 'Экономный',
      value: 2000,
      icon: a2,
    },
    {
      id: 3,
      name: 'Работяга',
      value: 5000,
      icon: a3,
    },
    {
      id: 4,
      name: 'Бывалый',
      value: 10000,
      icon: a4,
    },
    {
      id: 5,
      name: 'Пример бизнесмена',
      value: 25000,
      icon: a5,
    },
    {
      id: 6,
      name: 'Леприкон',
      value: 50000,
      icon: a6,
    },
    {
      id: 7,
      name: 'Богатей',
      value: 100000,
      icon: a7,
    },
    {
      id: 8,
      name: 'Транжира',
      value: 500000,
      icon: a8,
    },
    {
      id: 9,
      name: 'Миллионер',
      value: 1000000,
      icon: a9,
    },
  ];

  const [value, setValue] = useState(0);
  const [currentAchivment, setCurrentAchivment] = useState<Achivement | null>(null);
  const [nextAchivment, setNextAchivment] = useState<Achivement | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getAchievements().then((response) => {
      setValue(response.ransomAmount);
      countAchivment(response.ransomAmount);
    });
  }, []);

  const countAchivment = (value: number) => {
    for (let i = 0; i < achivments.length; i++) {
      if (value < achivments[i].value) {
        setCurrentAchivment(achivments[i]);
        setNextAchivment(achivments[i + 1] || null);
        dispatch(setAchievement(achivments[i - 1] || null))
        return;
      }
    }
    setCurrentAchivment(achivments[achivments.length - 1]);
    setNextAchivment(null);
  };


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
      className={styles.main}
    >
      <Card
        style={{ background: 'linear-gradient(90deg, #FFC107 0%, #FF8C00 100%)' }}
        withBorder
        radius="md"
        className={styles.card}
      >
        <Image width='100%' height='100%' src={currentAchivment?.icon} />
      </Card>
      <Text fz="md" tt="uppercase" fw={600} styles={{ root: { display: 'flex', flexDirection: 'row', gap: 10 } }}>
        {
          (currentAchivment?.value !== undefined && value < currentAchivment?.value) ?
            <Text c='gray' fw={500}>Следующий ранг</Text>
            : null
        }

        {currentAchivment?.name}
      </Text>
      <Card withBorder radius="md" className={styles.card}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Сумма выкупа
        </Text>
        <Text fz="lg" fw={500}>
          {
            currentAchivment?.value !== undefined && value < currentAchivment?.value ?
              `${value} /  ${currentAchivment?.value} Руб.`
              : `${value} Руб.`
          }
        </Text>
        {
          currentAchivment !== undefined && currentAchivment !== null ?
            <Progress value={(value / currentAchivment.value) * 100} mt="md" size="lg" radius="xl" />
            : <Progress value={100} mt="md" size="lg" radius="xl" />
        }

      </Card>
      <Card withBorder radius="md" className={styles.card}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          {
            nextAchivment === null ?
              "Вы достигли наивысшего ранга!"
              : `Следуюещее достижение: ${nextAchivment.value} руб.`
          }
        </Text>
      </Card>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Достижения
      </Text>

      <Card withBorder radius="md" className={styles.card}>
        {
          achivments.map((achivment) => (
            <Group
              key={achivment.name}
              style={value >= achivment.value ? { opacity: 1 } : { opacity: 0.5 }}
              className={styles.achivment}
            >
              <img src={achivment.icon} style={{ width: 50, height: 50 }} />
              <Text>{achivment.name}</Text>
            </Group>
          ))
        }
      </Card>
    </div>
  );
};

export default Main;
