import styles from './QR.module.scss';
import QRCode from 'react-qr-code';
import { Group, Text } from '@mantine/core';

const QR = () => {
  return (
    <div className={styles.qr}>
      <div className={styles.qr__content}>
        <Group styles={{ root: { padding: 15, borderRadius: '10px', outline: '10px solid black' } }}>
          <QRCode value="RT5" />
        </Group>
        <Text size="1.8rem" fw={700} mt='2rem'>Наша команда</Text>
      </div>
    </div>
  );
};

export default QR;
