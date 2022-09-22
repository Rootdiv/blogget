import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import { Routes, Route } from 'react-router-dom';
import Modal from 'components/Modal';
import StartPage from 'pages/StartPage';
import Page404 from 'pages/Page404';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/category/:page' element={<List />}>
          <Route path='post/:id' element={<Modal />} />
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Layout>
  </main>
);
