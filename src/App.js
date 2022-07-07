import React, { useEffect } from "react";
import Layout from './components/Layout';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { login, logout } from './redux/auth-reducer';
import Loader from './components/Loader';
import 'antd/dist/antd.css';
import './assets/styles/common.scss';

const App = ({ initializeApp, initialized, login, logout, user }) => {
  useEffect(() => {
    initializeApp();
  }, [])

  if (!initialized) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Layout
        user={user}
        login={login}
        logout={logout}
      >
        <AppRouter user={user} />
      </Layout>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  user: state.auth.user,
})

export default connect(mapStateToProps, { initializeApp, login, logout })(App);
