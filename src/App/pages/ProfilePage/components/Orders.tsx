import { Accordion, Card, Select, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { getOrders } from 'api/products/index';

const formatedDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString();
    };

const Orders = () => {
  const [select, setSelect] = useState<string | null>(null);
    
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders(select).then((response) => {
            setOrders(response.data.content);
            console.log(response.data.content);
        });
    }, [select]);

  //   const orders = [
//     {
//       id: '0',
//       orderTime: '2021-10-10T02:00:00.000Z',
//       productOrders: [
//         {
//           product: {
//             id: '0',
//             name: 'product name',
//             price: 100,
//             description: 'product description',
//           },
//           amount: 2,
//           totalPrice: 200,
//         },
//         {
//           product: {
//             id: '1',
//             name: 'product name',
//             price: 100,
//             description: 'product description',
//           },
//           amount: 2,
//           totalPrice: 200,
//         },
//       ],
//     },
//     {
//       id: '1',
//       orderTime: '2021-10-10T02:00:00.000Z',
//       productOrders: [
//         {
//           product: {
//             id: '0',
//             name: 'product name',
//             price: 100,
//             description: 'product description',
//           },
//           amount: 2,
//           totalPrice: 200,
//         },
//         {
//           product: {
//             id: '1',
//             name: 'product name',
//             price: 100,
//             description: 'product description',
//           },
//           amount: 2,
//           totalPrice: 200,
//         },
//       ],
//     },
//   ];

  const items = orders.map((order) => (
    <Card mt={10} withBorder>
      <Accordion.Item key={order.id} value={order.orderTime}>
        <Accordion.Control>{formatedDate(order.orderTime)}</Accordion.Control>
        <Accordion.Panel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {order.productOrders.map((productOrder) => (
              <Card withBorder>
                <Text size="xl" fs={700}>
                  {productOrder.product.name}
                </Text>
                {/* <Text>Цена: {productOrder.product.price} руб.</Text>
              <Text>Количество: {productOrder.amount}</Text> */}
                <Text>
                  Общая стоимость: {productOrder.product.price}руб x {productOrder.amount} = {productOrder.totalPrice}{' '}
                  руб.
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
      }}
    >
      <Text fz="xl" fw={700} mt={20}>
        История покупок
      </Text>
      <Text fs={500}>Сортировать по дате заказа</Text>
      <Select
        data={['По возрастанию', 'По убыванию']}
        placeholder="Выберите способ сортировки"
        value={select ? select : null}
        onChange={(value) => {
            setSelect(value)}
        }
        style={{ width: '200px', margin: '0 10px' }}
      />
      <Accordion
        variant="separeted"
        style={{
          padding: '0 20px',
        }}
      >
        {items}
      </Accordion>
    </div>
  );
};

export default Orders;
