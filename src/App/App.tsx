import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from 'App/pages/MainPage'
import LoginPage from 'App/pages/LoginPage'

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
