import { Accordion, Button, Select, Table } from '@mantine/core';
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

import styles from './Rating.module.scss';

type Filter = {
    startTime: Date,
    endTime: Date,
    regions: string
}

const Rating = () => {
    const [regions, setRegions] = useState<string[]>([]);

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
        console.log("TIME", filter.startTime, filter.endTime)
        getProducts({
            startTime: format(filter.startTime, 'yyyy-MM-dd HH:mm:ss.SS'),
            endTime: format(filter.endTime, 'yyyy-MM-dd HH:mm:ss.SS'),
            region: filter.region
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error)
            })
    }, [filter])

    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    ];

    const data = [
        { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
        { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
        { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
        { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
    ];

    const handleSelectChange = (value: string | null) => {
        if (value) {
            dispatch(setRegion(value))
        }
    };

    const handleStartTimeChange = (value: DateValue) => {
        if (value instanceof Date) {
            dispatch(setStartTime(value))
            console.log('Выбранная дата и время:', value);
        }
    };

    const handleEndTimeChange = (value: DateValue) => {
        if (value instanceof Date) {
            dispatch(setEndTime(value))
            console.log('Выбранная дата и время:', value);
        }
    };

    return (
        <>
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
                            <Button mt={10}>Применить</Button>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key='barchart' value='barchart'>
                    <Accordion.Control icon={<IconChartBar width={18} height={18} />}>Диаграмма</Accordion.Control>
                    <Accordion.Panel>
                        <BarChart
                            h={300}
                            data={data}
                            dataKey="month"
                            series={[
                                { name: 'Smartphones', color: 'cyan.7' },
                                { name: 'Laptops', color: 'cyan.5' },
                                { name: 'Tablets', color: 'cyan.3' },
                            ]}
                            tickLine="y"
                            cursorFill='none'
                            withLegend={false}
                            withTooltip={false}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Название</Table.Th>
                        <Table.Th>Кол-во</Table.Th>
                        <Table.Th>Стоимость</Table.Th>
                        <Table.Th>Регион</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{
                    elements.map((element) => (
                        <Table.Tr key={element.name}>
                            <Table.Td>{element.position}</Table.Td>
                            <Table.Td>{element.name}</Table.Td>
                            <Table.Td>{element.symbol}</Table.Td>
                            <Table.Td>{element.mass}</Table.Td>
                        </Table.Tr>
                    ))
                }
                </Table.Tbody>
            </Table>
        </>
    )
}

export default Rating;