import { Badge, Button, Card, Container, Grid, GridCol, Group, Image, Input, Modal, Select, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX, IconArrowDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, completeShopping, getProductsList, getRegions } from "api/products/index";
import { setPriceSort, setSearchPattern } from "store/FilterSlice/FilterSlice";
import { selectShopFilters } from "store/FilterSlice/filterSelector";
import { addNotification } from "store/NotificationSlice/NotificationSlice";
import { setProductsList } from "store/ProductsSlice/ProductsSlice";
import { selectProductsList } from "store/ProductsSlice/productSelector";
import { ProductType } from "store/ProductsSlice/types";
import { addProductToCart, complete, removeProductFromCart, setRegion } from "store/UserSlice/UserSlice";
import { selectUserCart, selectUsersRegion } from "store/UserSlice/userSelector";

import styles from "./styles.module.scss";

const Shop = () => {
    const [regions, setRegions] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);

    const products = useSelector(selectProductsList);
    const cart = useSelector(selectUserCart);
    const region = useSelector(selectUsersRegion);
    const { searchPattern, priceSort } = useSelector(selectShopFilters);

    const dispatch = useDispatch();

    useEffect(() => {
        getProductsList(searchPattern, priceSort)
            .then(({ data, status }) => {
                if (status === 200) {
                    dispatch(setProductsList(data))
                }
            })
            .catch(({ response }) => {
                const { data, status } = response;

                dispatch(addNotification({
                    title: 'Ошибка',
                    status: status || undefined,
                    description: data?.message || 'Ошибка при получении данных',
                    isOpen: true,
                }))
            })

        getRegions()
            .then(({ data, status }) => {
                if (status === 200) {
                    setRegions(data);
                }
            })
            .catch(({ response }) => {
                const { data, status } = response;

                dispatch(addNotification({
                    title: 'Ошибка',
                    status: status || undefined,
                    description: data?.message || 'Ошибка при получении данных',
                    isOpen: true,
                }))
            })
    }, [searchPattern, priceSort]);

    const handleAddToCart = async (product: ProductType) => {
        dispatch(addProductToCart(product));

        const formattedCart = cart.reduce((acc: Record<string, number | string>[], { id, amount }) => {
            return [...acc, {
                productId: id,
                amount: amount,
            }]
        }, []);

        // console.log('CART', formattedCart)

        try {
            await addToCart(formattedCart);
        } catch ({ response }) {
            const { data, status } = response;

            dispatch(addNotification({
                title: 'Ошибка',
                status: status || undefined,
                description: data?.message || 'Произошла ошибка при добавлении товара',
                isOpen: true,
            }))
        }
    };

    const handleRemoveFromCart = async (id: string) => {
        dispatch(removeProductFromCart(id));
        const formattedCart = cart.reduce((acc: Record<string, number | string>[], { id, amount }) => {
            return [...acc, {
                productId: id,
                amount: amount,
            }]
        }, []);

        try {
            await addToCart(formattedCart);
        } catch ({ response }) {
            const { data, status } = response;

            dispatch(addNotification({
                title: 'Ошибка',
                status: status || undefined,
                description: data?.message || 'Произошла ошибка при добавлении товара',
                isOpen: true,
            }))
        }
    };

    const handleSetRegion = (region: string | null) => {
        dispatch(setRegion(region));
    }

    const handleSetSearchPattern = (pattern: string) => {
        dispatch(setSearchPattern(pattern))
    }

    const handleCompleteShopping = async () => {
        try {
            const { status } = await completeShopping(region);

            if (status === 200) {
                dispatch(addNotification({
                    title: 'Успешно',
                    status: status || undefined,
                    description: 'Покупка успешно оформлена',
                    isOpen: true,
                }));

                dispatch(complete())
                close()
            }
        } catch ({ response }) {
            const { data, status } = response;

            dispatch(addNotification({
                title: 'Ошибка',
                status: status || undefined,
                description: data?.message || 'Произошла ошибка при добавлении товара',
                isOpen: true,
            }))
        }
    }

    const totalAmount = cart.reduce((acc, { amount, price }) => {
        return acc + amount * price;
    }, 0);

    const getAmount = (id: string) => {
        const product = cart.find(product => product.id === id);
        if (product) {
            // console.log('AMOUNT', product.amount);
            return product.amount;
        } else {
            return null;
        }
    };

    return (
        <>
            <div className={styles.filters}>
                <Input
                    style={{ margin: '20px 0', width: "90%" }}
                    placeholder="Поиск"
                    value={searchPattern}
                    onChange={(e) => handleSetSearchPattern(e.target.value)}
                />
                <IconArrowDown
                    width={24}
                    height={24}
                    className={`icon-arrow-down ${priceSort ? styles['arrow-up'] : styles['arrow-down']}`}
                    onClick={() => dispatch(setPriceSort(!priceSort))}
                />
            </div>

            <Grid style={{ paddingBottom: "70px" }}>
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
                                                onClick={() => { handleRemoveFromCart(product.id) }}
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

                        <Select
                            data={regions || []}
                            value={region}
                            onChange={handleSetRegion}
                            style={{ marginTop: '20px' }}
                        />

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
                            disabled={!region}
                            onClick={handleCompleteShopping}
                        >
                            <Text size='lg' fw={700}>
                                Купить
                            </Text>
                        </Button>
                    </Container>
                </Modal>
                {products.map((product, idx) => (
                    <GridCol key={idx} span={6}>
                        <Card
                            shadow="sm"
                            padding="xs"
                            radius="md"
                            withBorder
                            styles={{
                                root: {
                                    maxHeight: "500px",
                                    height: "275px",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: '#EBEBEB',
                                    border: 'none'
                                }
                            }}
                        >
                            <Card.Section>
                                <Image
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                                    height={75}
                                    alt="Norway"
                                />
                            </Card.Section>

                            <Text fw={500} size="md" mt='md'>{product.name || ''}</Text>

                            <Text size="sm" c="dimmed">
                                {product.description || ''}
                            </Text>

                            <Text fw={600} size="md" mt='sm'>{product.price || ''} руб.</Text>

                            <div style={{ flexGrow: 1 }} />

                            {
                                getAmount(product.id) === null ?
                                    <Button styles={{ root: { fontSize: 15, color: 'black', fontWeight: 500, backgroundColor: 'white', borderRadius: 'calc(0.5rem * 1)', boxShadow: '0 0 5px rgba(0, 0, 0, 0.07)' } }} size='xs' onClick={() => { handleAddToCart(product) }} variant="transparent">В корзину</Button>
                                    :
                                    <div className={styles['cart-group']}>
                                        <Button onClick={() => { handleRemoveFromCart(product.id) }} size="xs" variant="transparent" styles={{ root: { fontSize: 22, color: 'black', fontWeight: 500 } }}>-</Button>
                                        <Text fw={500} size="lg">{getAmount(product.id)}</Text>
                                        <Button onClick={() => { handleAddToCart(product) }} size="xs" variant="transparent" styles={{ root: { fontSize: 22, color: 'black', fontWeight: 500 } }}>+</Button>
                                    </div>
                            }

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
        </>
    )
}

export default Shop;