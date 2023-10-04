import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { addQuantityAsync, deleteItemFromCartAsync, selectCart } from "../features/cart/CartSlice";
import { useForm } from "react-hook-form";
import {  updateUserAsync } from "../features/auth/authSlice";
import { createOrderAsync, currentOrder } from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";







const CheckOut = () => {
  const items=useSelector(selectCart);

  const user=useSelector(selectUserInfo)

  const dispatch=useDispatch();
  const subTotal=items.reduce((amount,curr)=>curr.price*curr.quantity+amount,0)
const totalItems=items.reduce((acc,curr)=>curr.quantity+acc,0);

function handleQuantity(e,item){
dispatch(addQuantityAsync({...item,quantity:+e.target.value}))}

function handleDelete(e,id){
  dispatch(deleteItemFromCartAsync(id))
}

//
const {register,handleSubmit,reset,formState:{errors}}=useForm();


  const [open, setOpen] = useState(true);
console.log(open,errors);
  //for selecting address and payment menthod
  const [selectedAddress,setSelectedAddress]=useState('');
  const [paymentMethod,setPaymentMethod]=useState('cash')

  function handleAddress(e){
setSelectedAddress(user.address[e.target.value]);

  }
  function handlePaymentMode(e){
  setPaymentMethod(e.target.value);
  }

 //for ordering now 

 const order=useSelector(currentOrder);

function  handleOrder(){
  if(selectedAddress && paymentMethod){
    const data={items,totalItems,subTotal,user,selectedAddress,paymentMethod,status:'pending'};
    dispatch(createOrderAsync(data))
   
  }
  else{
    alert('enter address and payment method')
  }
  
}


  return (
   <>
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      {order &&<Navigate to={`/order-success/${order.id}`}></Navigate>}
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form className="p-6 bg-white shadow-md" noValidate
          onSubmit={handleSubmit((data=>{
   dispatch(updateUserAsync({...user,address:[...user.address,data]}))
reset();
          }))}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className=" text-2xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('name',{required:'Name is required'})}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                 

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register('email',{required:'email is required'})}

                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contact
                    </label>
                    <div className="mt-2">
                    <input
                        type="tell"
                       {...register('phone',{required:'Phone number name is required'})}
                        id="phone"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                       {...register('street',{required:'street name is required'})}
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('city',{required:'city name is required'})}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('state',{required:'state name is required'})}
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('pincode',{required:'pincode name is required'})}
                        id="pinCode"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing one.
                </p>

                <ul  className="divide-y divide-gray-100">
                  {user.address.map((address,index) => (
                    <li
                    className="flex justify-between gap-x-6 py-5"
                      key={index}
                    >
                      <div className="flex min-w-0 gap-x-4 items-center">
                        <input
                        onChange={handleAddress}
                          id=""
                          name="address"
                          value={index}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {address.pincode}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {address.city}{" "}
                          <time dateTime="2023-01-23T13:23Z">
                            {address.state}
                          </time>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose any one
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                        onChange={handlePaymentMode}
                          id="cash"
                          checked={paymentMethod==='cash'}
                          value='cash'
                          name="payments"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                        onChange={handlePaymentMode}
                        value='card'
                        checked={paymentMethod==='card'}
                          id="card"
                          name="payments"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          {/* copied from cart pa */}

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 shadow-md mt-10 bg-white">
        <h1 className="text-3xl text-center text-bold py-4">Cart</h1>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <ul  className="-my-6 divide-y divide-gray-200">
            {items.map((product) => (
              <li key={product.id} className="flex py-6">
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
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">Qty
                    <select className="py-1 ml-2" onChange={(e)=>handleQuantity(e,product)} value={product.quantity}>
                        <option value='1'> 1</option>
                        <option value='2'> 2</option>
                        <option value='3'> 3</option>
                        <option value='4'> 4</option>
                        <option value='5'> 5</option>
                    </select>
                     </div>

                    <div className="flex">
                      <button
                      onClick={e=>handleDelete(e,product.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
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
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <div
           onClick={handleOrder}
            className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Order Now
          </div>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              <Link to='/'>Continue Shopping</Link>
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
        </div>

        </div>
      </div>
    </div>
   </>
  );
};

export default CheckOut;
