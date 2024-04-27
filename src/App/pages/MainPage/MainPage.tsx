import { useDispatch, useSelector } from 'react-redux';
import { selectNavigationState } from 'store/NavigateSlice/navigationSelector';
import { selectUserState } from 'store/UserSlice/userSelector';
import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { me } from 'api/user/index';
import { setUser } from 'store/UserSlice/UserSlice';
import Main from './components/Main';
import QR from './components/QR';
import Product from './components/Product';
import Other from './components/Other'

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
        me().then((res) => {
            dispatch(setUser(res.data))
        });
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