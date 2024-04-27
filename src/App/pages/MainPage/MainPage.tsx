import { useSelector } from 'react-redux';
import { selectNavigationState } from 'store/NavigateSlice/navigationSelector';
import { selectUserState } from 'store/UserSlice/userSelector';

import styles from './MainPage.module.scss';

const MainPage = () => {
    const chosenLink = useSelector(selectNavigationState);
    const user = useSelector(selectUserState)

    // console.log(user.id)
    return (
        <div className={styles.main}>
            {chosenLink}
        </div>
    );
}

export default MainPage;