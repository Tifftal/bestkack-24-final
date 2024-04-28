import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { me } from 'api/user/index';
import { selectNavigationState } from 'store/NavigateSlice/navigationSelector';
import { addNotification } from 'store/NotificationSlice/NotificationSlice';
import { setUser } from 'store/UserSlice/UserSlice';
import Main from './components/Main';
import Other from './components/Other'
import Product from './components/Product';
import QR from './components/QR';
import Shop from './components/Shop';

import styles from './MainPage.module.scss';

const MainPage = () => {
    const [componentToRender, setComponentToRender] = useState<ReactElement>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chosenLink = useSelector(selectNavigationState);

    useEffect(() => {
        if (!localStorage.getItem('atoken')) {
            navigate('/login');
        }
        me()
            .then(({ data, status }) => {
                if (status === 200) {
                    dispatch(setUser(data))
                }

            })
            .catch(({ response }) => {
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
                    description: data?.message || 'Произошла ошибка при получении данных',
                    isOpen: true,
                }))
            })
    }, []);

    useEffect(() => {
        switch (chosenLink) {
            case 'main':
                setComponentToRender(<Main />);
                break;
            case 'qr':
                setComponentToRender(<QR />);
                break;
            case 'product':
                setComponentToRender(<Product />);
                break;
            case 'shop':
                setComponentToRender(<Shop />);
                break;
            case 'other':
                setComponentToRender(<Other />);
                break;
        }
    }, [chosenLink])

    return (
        <div className={styles.main}>
            {componentToRender}
        </div>
    );
}

export default MainPage;