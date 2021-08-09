import React, { useEffect } from 'react';

import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../app-header/app-header';
import Modal from '../modal/modal';
import { MainPage } from '../../pages/main-page';
import { LoginPage } from '../../pages/login';
import { RegistrationPage } from '../../pages/registration';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ProfilePage } from '../../pages/profile';
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserInfo } from '../../services/actions/user';
import { FeedPage } from '../../pages/feed';
import { NotFound404 } from '../../pages/404page';
import { IngredientPage } from '../../pages/ingredient-page';
import IngredientDetails from '../ingredient-details/ingredient-details';

const App =() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isUserLoggedIn } = useSelector(state => state.userData);
  
  const background = history.action === 'PUSH' && location.state && location.state.background;
  const token = localStorage.getItem('refreshToken')
        
  useEffect(() => {
    if(!isUserLoggedIn && token ){
      dispatch(getUserInfo())
    }
  },[isUserLoggedIn, token, dispatch])

  const closeModalHandler = (e) => {
    e.preventDefault();
    history.goBack();
  }

  return (
    <>
      <Header />
        <Switch location={background || location}>
          <Route path='/' exact={true}>
            <MainPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register' exact={true}>
            <RegistrationPage />
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>
          {/* <ProtectedRoute path='/profile/orders' exact={true}>
            <OrdersHistoryPage />
          </ProtectedRoute> */}
          <ProtectedRoute path='/profile'>
            <ProfilePage />
          </ProtectedRoute>
          <Route path='/feed' exact={true}>
            <FeedPage />
          </Route>
          <Route path='/ingredients/:id'>
            <IngredientPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

          {background && (
            <Route path='/ingredients/:id' >
              <Modal header='Детали ингредиента' closeHandler={closeModalHandler}>
                <IngredientDetails />
              </Modal>
            </Route>
          )}
      </>
  );
};

export default App;