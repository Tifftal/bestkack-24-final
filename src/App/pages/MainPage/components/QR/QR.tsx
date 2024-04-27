import styles from './QR.module.scss';
import QRCode from 'react-qr-code';
import { Text } from '@mantine/core';

const QR = () => {
  return (
    <div className={styles.qr}>
      <div className={styles.qr__content}>
        <QRCode value="RT5" />
        <Text size="lg">Наша команда</Text>
      </div>
    </div>
  );
};

export default QR;
