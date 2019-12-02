import React from 'react';
import './App.css';
import { HashRouter, Route, Switch, } from 'react-router-dom';
import LandingPage from './LandingPage'
import FoodCart from './FoodCart'
import RestaurantManage from './RestaurantManage'
import Login from './Login'

//用户侧
// 扫码进入的页面，选择人数： /landing/restaurant/35/desk/20
// 点餐页面：                /restaurant/35/desk/20
//点餐成功页面：              /

//商户侧
//登录
//订单管理：     /manage/orders
//订单详情：     /manage/order/35
//菜品管理：     /manage/foods
//桌面管理：     /manage/desks


function App() {
  return (
    <HashRouter>
    <Switch>
      <Route path="/landing/restaurant/:rid/desk/:did" component={LandingPage} />
      <Route path="/restaurant/:rid/desk/:did" component={FoodCart} />
      <Route path="/manage" component={RestaurantManage} />
      <Route path="/login" component={Login} />
    </Switch>
    </HashRouter>
  );
}

export default App;
