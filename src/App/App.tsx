import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from 'App/pages/MainPage'
import LoginPage from 'App/pages/LoginPage'
import RegistrationPage from 'App/pages/RegistrationPage';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotificationState } from 'store/NotificationSlice/notificationSelector';
import { useEffect } from 'react';
import { showNotification } from 'store/NotificationSlice/NotificationSlice';

import styles from './App.module.scss';
import ErrorNotification from 'components/Notification';
import ProfilePage from 'App/pages/ProfilePage';

function App() {
  const dispath = useDispatch();
  const isShow = useSelector(selectNotificationState);

  useEffect(() => {
    if (isShow) {
      const timer = setTimeout(() => {
        dispath(showNotification(false))
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isShow]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        {isShow && <ErrorNotification />}
        <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
