import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
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
          <Navbar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </NotificationWrapper>
    </div>
  )
}

export default App
