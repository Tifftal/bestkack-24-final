import { Accordion, ActionIcon, Card, Select, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { getOrders } from 'api/products/index';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

const formatedDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

const Orders = () => {
  const [selectedSort, setSelectedSort] = useState<string>('desc');

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders(selectedSort).then((response) => {
      setOrders(response.data.content);
      console.log(response.data.content);
    });
  }, [selectedSort]);

  const items = orders.map((order, index) => (
    <Card key={index} mt={10} withBorder>
      <Accordion.Item key={order.id} value={order.orderTime}>
        <Accordion.Control>Покупка от <b style={{ fontWeight: 600 }}>{formatedDate(order.orderTime)}</b></Accordion.Control>
        <Accordion.Panel>
          <div key={order.id} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {order.productOrders.map((productOrder, indexP) => (
              <Card key={indexP} styles={{ root: { backgroundColor: '#EBEBEB' } }}>
                <Text size="lg" fw={600}>
                  {productOrder.product.name}
                </Text>
                <Text>Цена: {productOrder.product.price} руб.</Text>
                <Text>Количество: {productOrder.amount}</Text>
                <Text>
                  Общая стоимость: {productOrder.totalPrice}{' '} руб.
                </Text>
              </Card>
            ))}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Card>
  ));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px'
      }}
    >
      <Text fz="xl" fw={700} mt={20}>
        История покупок
      </Text>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text fw={500}>Сортировать по дате заказа</Text>
        <ActionIcon variant="transparent" aria-label="Settings" onClick={() => setSelectedSort(state => state === 'desc' ? 'asc' : 'desc')}>
          {
            selectedSort === 'desc' ?
              <IconArrowUp style={{ width: '100%', height: '100%' }} stroke={1.5} />
              : <IconArrowDown style={{ width: '100%', height: '100%' }} stroke={1.5} />
          }
        </ActionIcon>
      </div>
      <Accordion
        variant="separeted"
        styles={{ content: { padding: 0, margin: 0 } }}
      >
        {items}
      </Accordion>
    </div>
  );
};

export default Orders;
