import { Avatar, Button, Modal, TextInput , Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit , IconAt, IconPhoneCall } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserInitials, me, updateUser } from 'api/user/index';
import { addNotification } from 'store/NotificationSlice/NotificationSlice';
import { setUser } from 'store/UserSlice/UserSlice';
import { selectUserState } from 'store/UserSlice/userSelector';
import classes from './ProfilePage.module.scss';

const ProfilePage = () => {
  const user = useSelector(selectUserState);
  const dispatch = useDispatch();


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

  const [opened, { open, close }] = useDisclosure();

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '30px'
      }}
    >
      <Group wrap="nowrap">
        <Avatar size={90} radius="md" />
        <div>
          <Group wrap="nowrap">
            <Text fz="lg" fw={600} className={classes.name}>
              {user.surname} {user.name} {user.middleName}
            </Text>
            <IconEdit onClick={open} size="20px" className={classes.icon} />
          </Group>
          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="20px" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user.username}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="20px" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user.phone || 'Не указан'}
            </Text>
          </Group>
        </div>
      </Group>
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
    </div>
  );
};

export default ProfilePage;
