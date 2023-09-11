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

export function fetchAllFilterProducts(filter,sort,page) {
  //let filter={"category":["smartphones","laptop"]};
  //for sort {_sort:"price",_order="desc"}
  //pagination={_page:1,_limit=10}

  let queryStr=''
  for(let key in filter){
    const categoryValue=filter[key];
    if(categoryValue.length>0){
      let lastCategoryValue=categoryValue[categoryValue.length-1];
      queryStr+=`${key}=${lastCategoryValue}&`
    }
   
  }

  for(let key in sort){
    queryStr+=`${key}=${sort[key]}&`
  }


  for(let key in page){
    queryStr+=`${key}=${page[key]}&`
  }


  return new Promise(async(resolve) =>
   {
    const response=await fetch(`http://localhost:8080/products?${queryStr}`);
    const data=await response.json();
    const totalItems=await response.headers.get('X-Total-count')
    resolve({data:{products:data,totalItems:+totalItems}})
   }
  );
}



//for Categories
export function fetchAllCategories() {
  return new Promise(async(resolve) =>
   {
    const response=await fetch('http://localhost:8080/categories');
    const data=await response.json();
    resolve({data})
   }
  );
}

//for brands

export function fetchAllBrands() {
  return new Promise(async(resolve) =>
   {
    const response=await fetch('http://localhost:8080/brands');
    const data=await response.json();
    resolve({data})
   }
  );
}

//fetch particular product by Id
export function fetchProductById(id) {
  return new Promise(async(resolve) =>
   {
    const response=await fetch('http://localhost:8080/products/'+id);
    const data=await response.json();
    resolve({data})
   }
  );
}
