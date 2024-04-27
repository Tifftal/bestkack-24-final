import { Button, Card, Container, Grid, GridCol, Group, Image, Modal, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "api/products/index";
import { setProducts } from "store/ProductsSlice/ProductsSlice";
import { selectProducts } from "store/ProductsSlice/productSelector";
import { ProductType } from "store/ProductsSlice/types";
import { addProductToCart, removeProductFromCart } from "store/UserSlice/UserSlice";
import { selectUserCart } from "store/UserSlice/userSelector";

import styles from "./styles.module.scss";

const Shop = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const products = useSelector(selectProducts);
    const cart = useSelector(selectUserCart);

    const dispatch = useDispatch();

    useEffect(() => {
        getProducts()
            .then(({ data, status }) => {
                if (status === 200) {
                    dispatch(setProducts(data))
                }
            })
            .catch(err => {
                console.error('Error occurred while fetching products data, err: ', err);
            })
    }, []);

    const handleAddToCart = (product: ProductType) => {
        dispatch(addProductToCart(product));
    };

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeProductFromCart(id));
    };

    const totalAmount = cart.reduce((acc, { amount, price }) => {
        return acc + amount * price;
    }, 0);

    console.log('products', cart)

    return (
        <Grid>
            <Modal
                opened={opened && (cart.length > 0)}
                onClose={close}
                title={"Корзина"}
                centered
            >
                <Container className={styles['cart-opened']} styles={{ root: { padding: 0 } }}>
                    <div className={styles['total-table']}>
                        <Table withTableBorder striped className={styles['total-table']}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th></Table.Th>
                                    <Table.Th>Наз-ие</Table.Th>
                                    <Table.Th>Кол-во</Table.Th>
                                    <Table.Th>Стоим-ть</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {cart.map((product, idx) => (
                                    <Table.Tr key={idx}>
                                        <Table.Td
                                        style={{ paddingTop: "12px", paddingBottom: "12px", display: "flex", alignItems: "center" }}
                                        onClick={() => {handleRemoveFromCart(product.id)}}
                                        >
                                            <IconX width={16} height={16} />
                                        </Table.Td>
                                        <Table.Td style={{ padding: 0 }}>{product.name}</Table.Td>
                                        <Table.Td style={{ padding: 0 }}>{product.amount}</Table.Td>
                                        <Table.Td style={{ padding: 0 }}>{product.price} р.</Table.Td>
                                    </Table.Tr>
                                ))}
                                <Table.Tr>
                                    <Table.Th>Итого:</Table.Th>
                                    <Table.Td />
                                    <Table.Td />
                                    <Table.Th>{totalAmount} р.</Table.Th>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </div>

                    <Button
                        className={styles['buy-btn']}
                        styles={{
                            inner: {
                                width: "100%",
                            },
                            label: {
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between"
                            }
                        }}
                    >
                        <Text size='lg' fw={700}>
                            Купить
                        </Text>
                    </Button>
                </Container>
            </Modal>
            {products.map(({ product }, idx) => (
                <GridCol key={idx} span={6}>
                    <Card
                        shadow="sm"
                        padding="sm"
                        radius="md"
                        withBorder
                        styles={{
                            root: {
                                minHeight: "100%",
                                display: 'flex',
                                flexDirection: 'column',
                            }
                        }}
                    >
                        <Card.Section>
                            <Image
                                src="/lukoilIcon.png"
                                height={100}
                                alt="Norway"
                            />
                        </Card.Section>

                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>{product.name || ''}</Text>
                        </Group>

                        <Text size="sm" c="dimmed">
                            {product.description || ''}
                        </Text>

                        <div style={{ flexGrow: 1 }} />

                        <Button size='xs' onClick={() => { handleAddToCart(product) }}>Buy</Button>
                    </Card>
                </GridCol>
            ))}

            {cart.length > 0 && (
                <Button
                    onClick={open}
                    className={styles.cart}
                    size='xl'
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                    styles={{
                        inner: {
                            width: "100%",
                        },
                        label: {
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between"
                        }
                    }}>
                    <Text className={styles['flickering-text']} size='lg' fw={700}>
                        Корзина
                    </Text>

                    <Text className={styles['flickering-text']} fw={700} size='lg'>
                        {totalAmount} р.
                    </Text>
                </Button>
            )}
        </Grid>
    )
}

export default Shop;