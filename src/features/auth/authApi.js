// A mock function to mimic making an async request for data
//for sign up APi

export function createUser(userData) {
    return new Promise(async(resolve) =>
     {
      const response=await fetch('http://localhost:8080/users',{
        method:'post',
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'},
      });
      const data=await response.json();
      
       resolve({data})
     }
    );
  }


  //for login api
  export function checkUser(loginInfo) {
const email=loginInfo.email;
const password=loginInfo.password;

    return new Promise(async(resolve,rej) =>
     {
      const response=await fetch('http://localhost:8080/users?email='+email)
      const data=await response.json();

       if(data.length){
        if(password===data[0].password){
          resolve({data:data[0]})
        }else{
          rej({message:'wrong crendetials'})
        }
       
       }
       else{
rej({message:'user not found .please try again'})
       }
     }
    );
  }

  //when user signs out 
  export function signOut(userId) {
   return new Promise(async function(res){
    //todo-to delete user from server side will be done with backend
res({data:'success'})
   })
  }


  //to update user with details like address, contact,email etc
//this logic is extracted to user component
  // export function updateUser(user) {
  //   return new Promise(async(resolve) =>
  //    {
  //     const response=await fetch('http://localhost:8080/users/'+user.id,{
  //       method:'PATCH',
  //       body:JSON.stringify(user),
  //       headers:{'content-type':'application/json'},
  //     });
  //     const data=await response.json();
  //      resolve({data})
  //    }
  //   );
  // }
  