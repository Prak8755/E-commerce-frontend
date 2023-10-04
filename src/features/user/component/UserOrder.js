import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchedLoggedInUserOrdersAsync, selectUserInfo} from '../userSlice';

import { selectCart } from '../../cart/CartSlice';

const UserOrder = () => {

  const items=useSelector(selectCart);

  const subTotal=items.reduce((amount,curr)=>curr.price*curr.quantity+amount,0)
  const totalItems=items.reduce((acc,curr)=>curr.quantity+acc,0);

  const dispatch=useDispatch();
  const user=useSelector(selectUserInfo);

  useEffect(()=>{
dispatch(fetchedLoggedInUserOrdersAsync(user.id))

  },[dispatch,user]);


  const orders=useSelector(s=>s.userInfo.userOrders);



  return (
  <>
  {orders.map((order,i)=>(

<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 shadow-md mt-10 bg-white" key={order.id}>

<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
  <h1 className='text-3xl mb-3'>Order#{order.id}</h1>
  <h3 className='text-xl mb-3 text-red-800'>Order Status :{order.status}</h3>
<div className="flow-root">
  <ul  className="-my-6 divide-y divide-gray-200">
    {order?.items.map((product,i) => (
      <li key={i} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href={product.href}>{product.title}</a>
              </h3>
              <p className="ml-4">{product.price}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {product.brand}
            </p>
          </div>
         
        </div>
      </li>
    ))}
  </ul>
</div>
</div>

<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<div className="flex justify-between text-base font-medium text-gray-900">
  <p>Subtotal</p>
  <p>${subTotal}</p>

</div>
<div className="flex justify-between  text-base font-medium text-gray-900">
  <p>Total Items</p>
  <p>${totalItems} items</p>

</div>



</div>

{/* Address section */}

                <h1> Shipping Address</h1>
                      <div className="flex min-w-0 gap-x-4 items-center">
                       
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.street}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {order.selectedAddress.pincode}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {order.selectedAddress.city}{" "}
                          <time dateTime="2023-01-23T13:23Z">
                            {order.selectedAddress.state}
                          </time>
                        </p>
                      </div>
                    
                 
</div>
  ))}
  </>
  )
}

export default UserOrder