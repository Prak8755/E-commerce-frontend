import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  addQuantityAsync,
  deleteItemFromCartAsync,
  selectCart,
} from "./CartSlice";
// import { selectLoggedInUser } from "../auth/authSlice";
import Modals from "../../common/Modals";

const Cart = () => {
  // const user = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();

  const items = useSelector(selectCart);

  const subTotal = items.reduce(
    (amount, curr) => curr.price * curr.quantity + amount,
    0
  );
  const totalItems = items.reduce((acc, curr) => curr.quantity + acc, 0);

  function handleQuantity(e, item) {
    dispatch(addQuantityAsync({ ...item, quantity: +e.target.value }));
  }

  // function handleDelete(e,id){
  //   dispatch(deleteItemFromCartAsync(id))
  // }


function handleRemove(id){

  dispatch(deleteItemFromCartAsync(id))
}

const [showModal,setShowModal]=useState(null);

  const [open, setOpen] = useState(true);

console.log(open);

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}

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
                      <div className="text-gray-500">
                        Qty
                        <select
                          className="py-1 ml-2"
                          onChange={(e) => handleQuantity(e, product)}
                          value={product.quantity}
                        >
                          <option value="1"> 1</option>
                          <option value="2"> 2</option>
                          <option value="3"> 3</option>
                          <option value="4"> 4</option>
                          <option value="5"> 5</option>
                        </select>
                      </div>

                      <div className="flex">
                      <Modals
                          title={`Remove Product from cart`}
                          message="Are you sure you want to delete this product from your cart"
                          dangerOption="Delete"
                         dangerAction={e=>handleRemove(product.id)}
                         showModal={showModal}
                         cancelAction={e=>setShowModal(-1)}

                        ></Modals>
                        <button
                       onClick={e=>{setShowModal(product.id)}}
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
            <Link
              to="/checkout"
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                <Link to="/">Continue Shopping</Link>
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
