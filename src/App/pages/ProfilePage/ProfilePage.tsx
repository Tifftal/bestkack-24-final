import { Avatar, Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Text, Group } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import classes from './ProfilePage.module.scss';
import { selectUserState } from 'store/UserSlice/userSelector';
import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { UserInitials, me, updateUser } from 'api/user/index';
import { setUser } from 'store/UserSlice/UserSlice';

const ProfilePage = () => {
  const user = useSelector(selectUserState);
  const disapatch = useDispatch();
  useEffect(() => {
    me().then((response) => {
      disapatch(setUser(response.data));
    });
  }, []);
  //   const [user, setUser] = useState();

  const handleEdit = (values: UserInitials) => {
    updateUser(values).then((response) => {
      disapatch(setUser(response.data));
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
