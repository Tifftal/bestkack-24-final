import { Accordion, Select, Table } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconChartBar } from '@tabler/icons-react';
import { BarChart } from '@mantine/charts';
import TimePicker from '../TimePicker/TimePicker';
import { useEffect, useState } from 'react';
import { getProducts, getRegions } from 'api/products/index';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterState } from 'store/FilterSlice/filterSelector';
import { setEndTime, setRegion, setStartTime } from 'store/FilterSlice/FilterSlice';
import { DateValue } from '@mantine/dates';
import { selectProducts } from 'store/ProductsSlice/productSelector';
import { format } from 'date-fns';
import { setProducts } from 'store/ProductsSlice/ProductsSlice';

import styles from './Rating.module.scss';

const Rating = () => {
    const [regions, setRegions] = useState<string[]>([]);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    const filter = useSelector(selectFilterState);
    const products = useSelector(selectProducts);

    useEffect(() => {
        getRegions()
            .then(response => {
                setRegions(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        console.log("HERE")
        getProducts({
            startTime: format(filter.startTime, 'yyyy-MM-dd HH:mm:ss.SS'),
            endTime: format(filter.endTime, 'yyyy-MM-dd HH:mm:ss.SS'),
            region: filter.region
        })
            .then(response => {
                console.log(response);
                const formattedData = response.data.map((item) => ({
                    name: item.product.name,
                    Стоимость: item.totalSpend,
                }));

                console.log("DATA", formattedData);

                setData(formattedData);

                dispatch(setProducts(response.data));
            })
            .catch(error => {
                console.error(error)
            })


    }, [filter])

    const handleSelectChange = (value: string | null) => {
        if (value) {
            dispatch(setRegion(value))
        }
    };

    const handleStartTimeChange = (value: DateValue) => {
        if (value instanceof Date) {
            dispatch(setStartTime(value))
        }
    };

    const handleEndTimeChange = (value: DateValue) => {
        if (value instanceof Date) {
            dispatch(setEndTime(value))
        }
    };

    return (
        <div className={styles.rating}>
            <Accordion defaultValue="Apples" chevron={<></>} classNames={styles}>
                <Accordion.Item key='filters' value='filters'>
                    <Accordion.Control icon={<IconAdjustmentsHorizontal width={18} height={18} />}>Фильтры</Accordion.Control>
                    <Accordion.Panel>
                        <div className={styles['rating-filter']}>
                            <Select
                                placeholder="Регион"
                                data={regions.map(item => item)}
                                onChange={handleSelectChange}
                                maxDropdownHeight={200}
                                value={filter.region}
                            />
                            <TimePicker label='C' date={filter.startTime} onChange={handleStartTimeChange} />
                            <TimePicker label='До' date={filter.endTime} onChange={handleEndTimeChange} />
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key='barchart' value='barchart'>
                    <Accordion.Control icon={<IconChartBar width={18} height={18} />}>Диаграмма</Accordion.Control>
                    <Accordion.Panel>
                        <BarChart
                            h={300}
                            data={data}
                            dataKey="name"
                            orientation="vertical"
                            yAxisProps={{ width: 80 }}
                            barProps={{ radius: 10 }}
                            series={[{ name: 'Стоимость', color: 'cyan.6' }]}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Table striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Название</Table.Th>
                        <Table.Th>Кол-во</Table.Th>
                        <Table.Th>Стоимость</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{
                    products.map((element) => (
                        <Table.Tr key={element.product.id}>
                            <Table.Td>{element.product.name}</Table.Td>
                            <Table.Td>{element.amount}</Table.Td>
                            <Table.Td>{element.totalSpend}</Table.Td>
                        </Table.Tr>
                    ))
                }
                </Table.Tbody>
            </Table>
        </div>
    )
}

export default Rating;