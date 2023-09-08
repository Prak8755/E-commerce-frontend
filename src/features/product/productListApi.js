// A mock function to mimic making an async request for data
export function fetchAllProducts(amount = 1) {
  //TODO -NEED TO WORK ON THIS
  return new Promise(async(resolve) =>
   {
    const response=await fetch('http://localhost:8080/products');
    const data=await response.json();
    resolve({data})
   }
  );
}

//for Filtering Product from Product list 

export function fetchAllFilterProducts(filter) {
  //let filter={"category":"smartphones"};
  let queryStr=''
  for(let key in filter){
    queryStr+=`${key}=${filter[key]}&`
  }
  return new Promise(async(resolve) =>
   {
    const response=await fetch(`http://localhost:8080/products?${queryStr}`);
    const data=await response.json();
    resolve({data})
   }
  );
}
