import { useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'



import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { adminUpdateOrderAsync, fetchAllOrdersAsync, selectAllOrders, selectOrders } from '../order/orderSlice';
import { ITEMS_PER_PAGE } from '../../utils/constant';


function AdminOrders() {
const [page,setPage]=useState(1);
const dispatch=useDispatch();





  const totalOrders =useSelector(selectAllOrders);
  const orders=useSelector(selectOrders);


  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});




  const handleEdit = (order) => {
 setEditableOrderId(order.id)
  };

  const handleShow = () => {

  };

function handleUpdate(e,order){
    const updateOrder={...order,status:e.target.value};
dispatch(adminUpdateOrderAsync(updateOrder))
setEditableOrderId(-1);
}
 ;

 function handlePage(page){
    setPage(page);
 }
  
 function handleSort(sortOption){
  // console.log(sortOption);
const sortNew={_sort:sortOption.sort, _order:sortOption.order};
setSort(sortNew)
 }


 useEffect(()=>{
  const pagination={_page:page,_limit:ITEMS_PER_PAGE};
  dispatch(fetchAllOrdersAsync({sort,pagination}));
  
  },[dispatch,page,sort]);

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'received':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };


  return (
   <>
    <div className="overflow-x-auto ">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden ">
        <div className="w-full  ">
          <div className="bg-white shadow-md rounded my-6 p-2">
            <table className="w-full table-auto ">
              <thead className=''>
                <tr className="  bg-gray-200 text-gray-600 uppercase text-sm leading-normal p-2">
                  <th
                    className="py-3 px-1  cursor-pointer"
                  onClick={e=>handleSort({sort:'id',order:sort?._order==='asc'?'desc':'asc'})}
                  >
                    Order
                    
                        { sort._order==='desc'&& <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>}
                     
{sort._order==='asc'&&<ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
}                   
                  </th>
                  <th className="py-3 px-0 text-center ">Items</th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                   onClick={e=>handleSort({sort:'subTotal',order:sort?._order==='asc'?'desc':'asc'})}
                  >
                    Total Amount{' '}
                    {sort._sort === 'subTotal' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Shipping Address</th>
                  <th className="py-3 px-0 text-center">Order Status</th>
                  <th className="py-3 px-0 text-center">Payment Method</th>
                  <th className="py-3 px-0 text-center">Payment Status</th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                  
                  >
                    Order Time{' '}
                    {sort._sort === 'createdAt' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                   
                  >
                    Last Updated{' '}
                    {sort._sort === 'updatedAt' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-0 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-left">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                              alt={item.title}
                            />
                          </div>
                          <span>
                            {item.title} - #{item.quantity} - $
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        ${order.subTotal}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.state}, </div>
                        <div>{order.selectedAddress.pincode}, </div>
                        <div>{order.selectedAddress.phone}, </div>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={e=>handleUpdate(e,order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>

                    <td className="py-3 px-0 text-center">
                      {order.id === editableOrderId ? (
                        <select
                        
                        >
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.paymentStatus
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.createdAt? new Date(order.createdAt).toLocaleString():null }
                      </div>
                    </td>


                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                      {order.updatedAt? new Date(order.updatedAt).toLocaleString():null }
                      </div>
                    </td>

                    <td className="py-3 px-0 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                         
                            className="w-8 h-8"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
    </div>
    <Pagination page={page} setPage={setPage} handlePage={handlePage} totalOrders={totalOrders}/>
   </>
  );
}

export default AdminOrders;

const Pagination = ({page,setPage,handlePage,totalOrders}) => {
    const totalPages=Math.ceil(totalOrders/ITEMS_PER_PAGE);
  
    return (
      <div>
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={()=>handlePage(page>1?page-1:page)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <div
          onClick={()=>handlePage(page<totalPages?page+1:page)}
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to <span className="font-medium">{page*ITEMS_PER_PAGE > totalOrders?totalOrders:page*ITEMS_PER_PAGE}</span> of{' '}
              <span className="font-medium">{totalOrders}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <div
         onClick={()=>handlePage(page>1?page-1:page)}
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {Array.from({length:totalPages}).map((e,i)=>(
                <div
                key={i}
                onClick={()=>handlePage(i+1)}
                aria-current="page"
                className={`cursor-pointer relative z-10 inline-flex items-center ${i+1===page?'bg-indigo-600 text-white':'text-gray-400'} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {i+1}
              </div>
              ))}
              
             
             
              <div
               onClick={()=>handlePage(page<totalPages?page+1:page)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
      </div>
    )
  }