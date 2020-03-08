# Auth from scratch
## 1. Signup/Login Backend 
a) Node/Express/MongoDB\
b) joi - Data validator\
c) bcrypt - Hashing passwords\
d) jsonwebtoken - For Token generation
## 2. Signup/Login Frontend
a) Vue.js

# Routes
## Server
 * home route
    * GET request on http://localhost:3000/auth/
 * SignUp route
    * POST request on http://localhost:3000/auth/signup
 * Login route
    * POST request on http://localhost:3000/auth/login

## Client
 * home page
    * http://localhost:8080/ 
 * SignUp page
    * http://localhost:8080/signup
 * Login page
    * http://localhost:8080/login
 * Dashboard page(only accessible once logged in)
    * http://localhost:8080/dashboard
    
# Auth Flow:

![Flow Chart](AuthFlowChart.svg)
