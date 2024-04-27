import { Group, InputDescription, Modal, px, useMantineTheme } from '@mantine/core';
import { UnstyledButton, Text } from '@mantine/core';
import { theme } from '@mantine/core';
import classes from '../Other.module.css';
import { useDisclosure } from '@mantine/hooks';

export type OtherCardProps = {
  title: string;
  Icon: any;
  color: string;
  description: string[];
};

const OtherCard: React.FC<OtherCardProps> = ({ title, Icon, color, description }) => {
  const [opened, { open, close }] = useDisclosure();

  const theme = useMantineTheme();
  return (
    <div>
      <UnstyledButton onClick={open} key={title} className={classes.item}>
        <Icon color={theme.colors[color][6]} size="2rem" />
        <Text size="lg" mt={7}>
          {title}
        </Text>
      </UnstyledButton>
      <Modal 
      title={
        <Group
        m='xs'
        >
          <Icon color={theme.colors[color][6]} size="2rem" />
          <Text size="xl" weight={700} className={classes.title}>
            {title}
          </Text>
        </Group>
      }
      opened={opened} onClose={close} size="md" centered withCloseButton>
        <InputDescription>{description[0]}</InputDescription>
        {/* <InputDescription>{description[1]}</InputDescription> */}
      </Modal>
    </div>
  );
};

export default OtherCard;
