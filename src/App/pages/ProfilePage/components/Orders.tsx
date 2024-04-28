import { Accordion, ActionIcon, Card, Select, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { getOrders } from 'api/products/index';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

const formatedDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

const Orders = () => {
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(Infinity);


  useEffect(() => {
    if (page < totalPages) {
      const loadOrders = async () => {
        try {
          const response = await getOrders('desc', page);
          setTotalPages(response.data.totalPages)
          const newOrders = response.data.content;
          setOrders(prevOrders => [...prevOrders, ...newOrders]);
        } catch (error) {
          console.error("Error loading orders:", error);
        }
      };

      loadOrders();
    }
  }, [ page]);

  const loadNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      loadNextPage();
    }
  };

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
