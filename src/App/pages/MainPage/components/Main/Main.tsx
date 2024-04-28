import { Card, Group, Progress, Text } from '@mantine/core';
import styles from './Main.module.scss';
import { useEffect, useState } from 'react';
import a1 from '../../../../../assets/achivments/1.png';
import a2 from '../../../../../assets/achivments/2.png';
import a3 from '../../../../../assets/achivments/3.png';
import a4 from '../../../../../assets/achivments/4.png';
import a5 from '../../../../../assets/achivments/5.png';
import a6 from '../../../../../assets/achivments/6.png';
import a7 from '../../../../../assets/achivments/7.png';
import a8 from '../../../../../assets/achivments/8.png';
import { getAchievements } from 'api/user/index';
import { setAchievementImage, setAchievementStatus } from 'store/AchievementSlice/AchievementSlice';
import { useDispatch } from 'react-redux';
// import { get } from 'http';

const Main = () => {
  const achivments = [
    {
      name: 'Новичок',
      value: 1000,
      icon: a1,
    },
    {
      name: 'Экономный',
      value: 2000,
      icon: a2,
    },
    {
      name: 'Работяга',
      value: 5000,
      icon: a3,
    },
    {
      name: 'Бывалый',
      value: 10000,
      icon: a4,
    },
    {
      name: 'Пример бизнесмена',
      value: 25000,
      icon: a5,
    },
    {
      name: 'Леприкон',
      value: 50000,
      icon: a6,
    },
    {
      name: 'Богатей',
      value: 100000,
      icon: a7,
    },
    {
      name: 'Транжира',
      value: 500000,
      icon: a8,
    },
    {
      name: 'Миллионер',
      value: 1000000,
      icon: 'IconCoin',
    },
  ];

  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    getAchievements().then((response) => {
      console.log(response);
      setValue(response.ransomAmount);
      countAchivment(response.ransomAmount);
      dispatch(setAchievementImage(currnetAchivment.icon ));
      dispatch(setAchievementStatus(currnetAchivment.name));
      console.log(currnetAchivment)
    //   dispatch(setAchievement({ image: currnetAchivment.icon, status: currnetAchivment.name }));

      console.log(currnetAchivment.value);
      //   console.log((value / currnetAchivment.value) * 100);
    });
  }, []);

  const [currnetAchivment, setCurrnetAchivment] = useState(achivments[0]);
  const [nextAchivment, setNextAchivment] = useState(achivments[1]);
  //   let value = 10000;

  const countAchivment = (value: number) => {
    for (let i = 0; i < achivments.length; i++) {
      if (value < achivments[i].value) {
        setCurrnetAchivment(achivments[i]);
        setNextAchivment(achivments[i + 1]);
        break;
      }
    }
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
        {/* <currnetAchivment.icon /> */}
        <img src={currnetAchivment.icon} />
      </Card>
      <Text fz="md" tt="uppercase" fw={700} >
        {currnetAchivment.name}
        </Text>
      <Card withBorder radius="md" className={styles.card}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Сумма выкупа
        </Text>
        <Text fz="lg" fw={500}>
           {value} /  {currnetAchivment.value} Руб.
        </Text>
        <Progress value={(value / currnetAchivment.value) * 100} mt="md" size="lg" radius="xl" />
      </Card>
      <Card withBorder radius="md" className={styles.card}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Следуюещее достижение: {nextAchivment.value} руб.
        </Text>
      </Card>
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Достижения
      </Text>

      <Card withBorder radius="md" className={styles.card}>
        {achivments.map((achivment) => (
          <Group
            key={achivment.name}
            style={value >= achivment.value ? { opacity: 1 } : { opacity: 0.5 }}
            className={styles.achivment}
          >
            <img src={achivment.icon} style={{ width: 50, height: 50 }} />
            <Text>{achivment.name}</Text>
          </Group>
        ))}
      </Card>
    </div>
  );
};

export default Main;
