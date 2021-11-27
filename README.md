Cataza Server
======

HTTP is the way modern applications network. It’s how we exchange data & media. Doing HTTP
efficiently makes your stuff load faster and saves bandwidth.


Authentication:
------------------------------
  ../users/register
```Parameter: 
  { 
    email : String, 
    password: String, 
    username: String, 
    fullname: String,
    phoneNumber: String, 
    imgUrl: String, 
    address: String
  }
```
../users/login
```Parameter: 
  { 
    emailOrUsername : String, 
    password: String, 
  }
```
../users/forgot-password
```Parameter: 
  { 
    email: String,  
  }
```
../users/update-profile
```Parameter: 
  { 
    username: String, 
    fullname: String, 
    phoneNumber: String, 
    imgUrl: String, 
    address: String
  }
```

Authentication:
------------------------------


