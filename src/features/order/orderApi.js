export function createOrder(order) {
    return new Promise(async(resolve) =>
     {
      const response=await fetch('http://localhost:8080/orders',{
        method:'POST',
        body:JSON.stringify(order),
        headers:{'content-type':'application/json'},
      });
      const data=await response.json();
       resolve({data})
     }
    );
  }
  

  //for admin - admin will see all details or status of orders
  export function fetchAllOrders(sort,pagination){


    let queryStr='';

    for (let key in sort){
      queryStr+=`${key}=${sort[key]}&`;
    };


for(let key in pagination){
  queryStr+=`${key}=${pagination[key]}&`;

}
console.log(queryStr);
// sort=id&_option=desc&_page=1&_limit=10&
// _sort=price&_order=desc&_page=1&_limit=10&
return new Promise(async(res)=>{
  const response=await fetch('http://localhost:8080/orders?'+queryStr);
  const data=await response.json();
  const totalOrders= response.headers.get('X-Total-Count');
  res({data:{orders:data,totalOrders:+totalOrders}})
})
  }


  //admin is now updating the order status
  export function updateOrder(order) {
    return new Promise(async(resolve) =>
     {
      const response=await fetch('http://localhost:8080/orders/'+order.id,{
        method:'PATCH',
        body:JSON.stringify(order),
        headers:{'content-type':'application/json'},
      });
      const data=await response.json();
       resolve({data})
     }
    );
  }