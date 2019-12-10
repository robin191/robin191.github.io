import React from 'react'
import { Link, Route} from 'react-router-dom'
import OrderManage from './OrderManage'
import FoodManage from './FoodManage'
import DeskManage from './DeskManage'



export default function(props) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="order">订单管理</Link>
          </li>
          <li>
            <Link to="food">菜品管理</Link>
          </li>
          <li>
            <Link to="desk">订单管理</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path="" component={OrderManage} />
          <Route path="" component={FoodManage} />
          <Route path="" component={DeskManage} />
        </Switch>
      </main>
    </div>
  )
}