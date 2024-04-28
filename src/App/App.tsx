import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from 'App/pages/LoginPage'
import MainPage from 'App/pages/MainPage'
import ProfilePage from 'App/pages/ProfilePage';
import RegistrationPage from 'App/pages/RegistrationPage';
import NotificationWrapper from 'App/widgets/Notifications/NotificationWrapper';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <NotificationWrapper>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<><Navbar /><MainPage /><Footer /></>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/profile' element={<><Navbar /><ProfilePage /></>} />
          </Routes>
        </BrowserRouter>
      </NotificationWrapper>
    </div>
  )
}

export default App
