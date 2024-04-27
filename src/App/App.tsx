import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from 'App/pages/MainPage'
import LoginPage from 'App/pages/LoginPage'
import RegistrationPage from 'App/pages/RegistrationPage';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
