import { Avatar, Button, Modal, TextInput, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconAt, IconPhoneCall, IconChessKing, } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserInitials, me, updateUser } from 'api/user/index';
import { addNotification } from 'store/NotificationSlice/NotificationSlice';
import { setUser } from 'store/UserSlice/UserSlice';
import { selectUserState } from 'store/UserSlice/userSelector';
import Orders from './components/Orders'
import { selectAchievementState } from 'store/AchievementSlice/achievementSelector';
import a1 from 'assets/achivments/1.png';
import a2 from 'assets/achivments/2.png';
import a3 from 'assets/achivments/3.png';
import a4 from 'assets/achivments/4.png';
import a5 from 'assets/achivments/5.png';
import a6 from 'assets/achivments/6.png';
import a7 from 'assets/achivments/7.png';
import a8 from 'assets/achivments/8.png';
import a9 from 'assets/achivments/9.png';

import classes from './ProfilePage.module.scss';

const ProfilePage = () => {
  const achievements = [
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

  const user = useSelector(selectUserState);
  const achievement = useSelector(selectAchievementState);

  const dispatch = useDispatch();

  const [opened, { open, close }] = useDisclosure();

  useEffect(() => {
    me().then((response) => {
      dispatch(setUser(response.data));
    })
      .catch(({ response }) => {
        const { data, status } = response;

        dispatch(addNotification({
          title: 'Ошибка',
          status: status || undefined,
          description: data?.message || 'Произошла ошибка при авторизации',
          isOpen: true,
        }))
      })
  }, []);

  const handleEdit = (values: UserInitials) => {
    updateUser(values).then((response) => {
      dispatch(setUser(response.data));
    });
  };

  const profileForm = useForm({
    initialValues: {
      name: '',
      surname: '',
      middleName: '',
    },
    validate: {
      name: (value: string) => value.trim().length > 0,
      surname: (value: string) => value.trim().length > 0,
      middleName: (value: string) => value.trim().length > 0,
    },
  });

  return (
    <div style={{ padding: '30px 20px' }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Group wrap="nowrap" styles={{ root: { padding: 0, justifyContent: 'space-between' } }}>
          <Text fz="xl" fw={600} className={classes.name}>
            {user.surname} {user.name} {user.middleName}
          </Text>
          <IconEdit onClick={open} size="20px" className={classes.icon} />
        </Group>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <Group wrap="nowrap" gap={10} mt={3}>
              <IconChessKing stroke={1.5} size="20px" className={classes.icon} />
              <Text fz="sm" c="dimmed">
                {achievement.name || 'Нет'}
              </Text>
            </Group>
            <Group wrap="nowrap" gap={10} mt={3}>
              <IconAt stroke={1.5} size="20px" className={classes.icon} />
              <Text fz="sm" c="dimmed">
                {user.username}
              </Text>
            </Group>
            <Group wrap="nowrap" gap={10} mt={5}>
              <IconPhoneCall stroke={1.5} size="20px" className={classes.icon} />
              <Text fz="sm" c="dimmed">
                {user.phone || 'Не указан'}
              </Text>
            </Group>
          </div>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Редактирование профиля" size="md" withCloseButton>
        <form
          onSubmit={() => {
            handleEdit(profileForm.values as UserInitials);
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TextInput label="Фамилия" placeholder="Фамилия" {...profileForm.getInputProps('surname')} />
          <TextInput label="Имя" placeholder="Имя" {...profileForm.getInputProps('name')} />
          <TextInput label="Отчество" placeholder="Отчество" {...profileForm.getInputProps('middleName')} />
          <Button type="submit" color="blue">
            Сохранить
          </Button>
        </form>
      </Modal>

      <Orders />
    </div>
  );
};

export default ProfilePage;
