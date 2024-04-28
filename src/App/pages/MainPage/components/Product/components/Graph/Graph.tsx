import { LineChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { getProducts, getRegions } from 'api/products/index';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterState } from 'store/FilterSlice/filterSelector';
import { selectProducts } from 'store/ProductsSlice/productSelector';
import { Accordion, Button, MultiSelect, Select } from '@mantine/core';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import TimePicker from 'App/pages/MainPage/components/Product/components/TimePicker';
import { setEndTime, setRegion, setStartTime } from 'store/FilterSlice/FilterSlice';
import { DateValue } from '@mantine/dates';
import { addNotification } from 'store/NotificationSlice/NotificationSlice';

import styles from './Graph.module.scss';

const Graph = () => {
    const colors = ['gray.6', 'blue.6', 'cyan.6', 'teal.6']

    const [regions, setRegions] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [updateGraph, setUpdateGraph] = useState(false);
    const [value, setValue] = useState<string | null>('filters');
    const [selectedProduct, setSelectedProduct] = useState<string[]>([]);

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
        getGraph();
    }, [updateGraph])

    const getGraph = async () => {
        const dividedTimeRange = divideTimeRange(filter.startTime, filter.endTime);
        // console.log("RANGE", dividedTimeRange)

        for (let i = 0; i < dividedTimeRange.length; i++) {
            try {
                const response = await getProducts({
                    startTime: format(filter.startTime, 'yyyy-MM-dd HH:mm:ss.SS'),
                    endTime: format(dividedTimeRange[i].end, 'yyyy-MM-dd HH:mm:ss.SS'),
                    region: filter.region
                })

                // console.log("RESP", response);
                const data = response.data;
                // console.log("PRODUCT SELECTED", selectedProduct)
                const result = data.reduce((acc: any, item: any) => {
                    if (!selectedProduct.includes(item.product.name)) {
                        acc[item.product.name] = item.totalSpend;
                        // console.log(i)
                        return acc;
                    } else {
                        acc[''] = 0
                        return acc;
                    }
                }, { date: format(dividedTimeRange[i].end, 'HH:mm') });

                const hasData = Object.keys(result).length > 1;

                if (hasData) {
                    // console.log("RESULT", result);
                    setData(state => [...state, result]);
                }

            } catch ({ response }: any) {
                const { data, status } = response;

                if (status === 503) {
                    dispatch(addNotification({
                        title: 'Ошибка',
                        status: status || undefined,
                        description: 'Сервис временно недоступен',
                        isOpen: true,
                    }))
    
                    return;
                }

                dispatch(addNotification({
                    title: 'Ошибка',
                    status: status || undefined,
                    description: data?.message || 'Произошла ошибка при авторизации',
                    isOpen: true,
                }))
            }
        }
    }

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

    const renderGraph = () => {
        setData([]);
        setUpdateGraph(state => !state);
        setValue(null);
    }

    const divideTimeRange = (startTime: Date, endTime: Date) => {
        const duration: number = (endTime.getTime() - startTime.getTime()) / 5;
        const result: { start: Date; end: Date; }[] = [];

        for (let i = 0; i < 5; i++) {
            const start: Date = new Date(startTime.getTime() + i * duration);
            const end: Date = new Date(startTime.getTime() + (i + 1) * duration);

            result.push({ start, end });
        }

        return result;
    };

    const handleMultiSelectChange = (selected: string[]) => {
        setSelectedProduct(selected);
        // console.log(selected)
    };

    return (
        <div className={styles.graph}>
            <Accordion value={value} onChange={setValue} classNames={styles}>
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
                            <MultiSelect
                                label='Скрыть продукты'
                                placeholder="Продукт"
                                data={products.map(item => item.product.name)}
                                maxDropdownHeight={200}
                                onChange={handleMultiSelectChange}
                                value={selectedProduct}
                            />
                            <TimePicker label='C' date={filter.startTime} onChange={handleStartTimeChange} />
                            <TimePicker label='До' date={filter.endTime} onChange={handleEndTimeChange} />
                            <Button mt='md' fullWidth onClick={renderGraph}>Применить</Button>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <LineChart
                strokeWidth={3}
                mt='md'
                pt='md'
                h={400}
                data={data}
                dataKey="date"
                series={
                    products.map((item, index) => {
                        return {
                            name: item.product.name, color: colors[index % 4]
                        }
                    })
                }
                curveType="natural"
            />
        </div>
    )
}

export default Graph;