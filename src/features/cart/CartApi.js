export function addToCart(item) {
    return new Promise(async(resolve) =>
     {
      const response=await fetch('http://localhost:8080/cart',{
        method:'post',
        body:JSON.stringify(item),
        headers:{'content-type':'application/json'},
      });
      const data=await response.json();
      if(data){
        resolve({data})
      }
    
     }
    
    );
  }



//fetch particular product by Id
export function fetchItemsByUserId(id) {
  return new Promise(async(resolve) =>
   {
    const response=await fetch('http://localhost:8080/cart?user='+id);
    const data=await response.json();
    resolve({data})
   }
  );
}

//adding quantity of product Api
export function addQuantity(update) {
  return new Promise(async(resolve) =>
   {
    const response=await fetch('http://localhost:8080/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'},
    });
    const data=await response.json();
    if(data){
      resolve({data})
    }
   }
  
  );
}

//to delete or remove product from cart when user orders form previous cart

export function deleteItemFromCart(itemId) {
  return new Promise(async(resolve) =>
   {
    const response=await fetch('http://localhost:8080/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type':'application/json'},
    });
    const data=await response.json();
    if(data){
      resolve({data:{id:itemId}})
    }
   }
  );
}

export function resetCart(userId) {
 //get all items of user cart and then delete them
 return new Promise(async function(res,rej){
  const response=await fetchItemsByUserId(userId);
  const items=response.data;

  for(let item of items){
    await deleteItemFromCart(item.id)
  }
  res({status:'success'})
 })
}

