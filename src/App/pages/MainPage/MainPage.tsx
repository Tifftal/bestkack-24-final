import { useDispatch, useSelector } from 'react-redux';
import { selectNavigationState } from 'store/NavigateSlice/navigationSelector';
import { selectUserState } from 'store/UserSlice/userSelector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { me } from 'api/user/index';
import { setUser } from 'store/UserSlice/UserSlice';

import styles from './MainPage.module.scss';

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('atoken')) {
            navigate('/login');
        }
        me().then((res) => {
            dispatch(setUser(res.data))
        });
    }, []);

    const chosenLink = useSelector(selectNavigationState);
    const user = useSelector(selectUserState)

    console.log(user.id)
    return (
        <div className={styles.main}>
            {chosenLink}
        </div>
    );
}

export default MainPage;