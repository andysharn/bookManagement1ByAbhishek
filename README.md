
# Book Management by Abhishek

This is a backend application for managing books using Node.js. Security features such as JWT (JSON Web Tokens), bcrypt for password hashing, and user roles have been implemented.

The application follows object-oriented programming principles and is built using Express.js framework. MongoDB is used as the database.

Middlewares for ensuring good code quality, such as error handling and input validation, have been incorporated.

The folder structure has been organized for better code management and readability.

The configuration file has intentionally been left unchanged in previous commits, making it easier for you to test out the code without needing to adjust configurations.

## To Run this project

Install all the dependencies : 

```bash
  $ npm i 
```

Then start the project

```bash
  $ npm start
```

Edit env file 
```bash
   - Update these field -  
    DB_URI="monogoDB URI link here"
    PORT= "port number"
    COOKIE_EXPIRE = "in millisecond"
    JWT_SECRET="jwt secret here"
    JWT_EXPIRE="5m or enter in milisecond"
```





# API Reference

## User Authentication

### Role : User 
**By default the role will be user, user can see all books and his own profile, he can update his own password and profile. He can't do crud operations in books neither for other users** 

#### 1. Create user 

```http
  POST /api/v1/register
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. User name |
| `email` | `string` | **Required**. User email address |
| `password` | `string` | **Required**. User password |
| `role` | `string` | **Optional**. Only admin/user  |

* Note : By default the role will be the user, I used JWT token here in order to validate the request, So every time user creates or login the jwt token will be created and stored in cookies. 

#### 2. Login user

```http
  POST /api/v1/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User email address |
| `password` | `string` | **Required**. User password |

#### 3. Logout user

```http
  GET /api/v1/logout
```

* Note : after logout it'll expire the jwt token 

#### 4. Get user profile

```http
  POST /api/v1/me
```
It'll get logged in user details. 


#### 5. Update user password

```http
  PUT /api/v1/password/update
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `oldPassword` | `string` | **Required**. User's old password |
| `newPassword` | `string` | **Required**. User's new password |
| `confirmPassword` | `string` | **Required**. User's confirm password |

* Note : It'll not update password if old password is not correct and if newPassword & confirmPassword must be same. 

#### 6. Update user profile

```http
  PUT /api/v1/me/update
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. name to be updated |
| `email` | `string` | **Required**. email to be updated  |


### Role : Admin 
**Admin can do crud operations for books and for other users. Below endpoints can only be access by admin** 

#### 7. Get all users

```http
  GET /api/v1/admin/users
```

* Note : first it'll authenticate that user role is admin or not if it's adming then it'll fetch all ther users from database else it'll those error that only admin can run access it. 


#### 8. Get user profile

```http
  GET /api/v1/admin/user/:id
```

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. enter id to get user details |

#### 9. Update user role or profile

```http
  PUT api/v1/admin/userRoleUpdate?id=userId
```

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. user id to update |

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Optional**. user name to update |
| `email` | `string` | **Optional**. user email to update |
| `role` | `string` | **Required**. user role to update |

#### 10. Delete user

```http
 DELETE /api/v1/admin/user/:id
```

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. user id to delete |


## Book CRUD operations

### Role : Admin 
**Admin can do all crud operations for books**

#### 11. Create Book

```http
  POST /api/v1/admin/createBook/new
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookTitle` | `string` | **Required**. Title of the book |
| `bookAuthor` | `string` | **Required**. Author of the book |
| `bookPublishYear` | `Number` | **Required**. Publish year of book |

#### 12. Update Book

```http
  PUT /api/v1/admin/updateBook/:id
```

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. book Id to update |

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookTitle` | `string` | **Optional**. Title of the book |
| `bookAuthor` | `string` | **Optional**. Author of the book |
| `bookPublishYear` | `Number` | **Optional**. Publish year of book |

#### 13. Delete Book

```http
  DELETE /api/v1/admin/deleteBook/:id
```

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. book Id to delete |


### Role : User 
**User can only read books, admin also.**



#### 14. Get All Books

```http
  GET /api/v1/getAllBooks
```


#### 15. Get All Books via filters

```http
  GET api/v1/getAllBooks?bookAuthor=name&bookPublishYear=2010
```


| params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookTitle` | `string` | **Optional**. Title of the book |
| `bookAuthor` | `string` | **Optional**. Author of the book |
| `bookPublishYear` | `Number` | **Optional**. Publish year of book |



#### 16. Get Book By Id 

```http
  GET /api/v1/getBookById/:id
```

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. book Id get |



## Authors

- [@Abhishek Sharma](https://github.com/andysharn)



## Screenshots
1
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/fl_preserve_transparency/v1713977153/Screenshot_2024-04-24_at_10.11.06_PM_utkrux.jpg?_s=public-apps)

2
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977153/Screenshot_2024-04-24_at_10.12.55_PM_cowbvp.png)

3
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977153/Screenshot_2024-04-24_at_10.13.08_PM_fw4tym.png)

4
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977153/Screenshot_2024-04-24_at_10.13.05_PM_k411ru.png)

5
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977152/Screenshot_2024-04-24_at_10.11.29_PM_ocw1ws.png)

6
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977152/Screenshot_2024-04-24_at_10.12.45_PM_fmnf0w.png)

7
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977151/Screenshot_2024-04-24_at_10.11.17_PM_enzwhc.png)

8
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977151/Screenshot_2024-04-24_at_10.11.09_PM_xzajav.png)

9
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977151/Screenshot_2024-04-24_at_10.11.17_PM_enzwhc.png)

10
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977151/Screenshot_2024-04-24_at_10.10.58_PM_hqmhfr.png)

11
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977151/Screenshot_2024-04-24_at_10.13.48_PM_vqhbbp.png)

12
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977149/Screenshot_2024-04-24_at_10.10.48_PM_tcvjq5.png)

13
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977149/Screenshot_2024-04-24_at_10.09.57_PM_ugnw0s.png)

14
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977149/Screenshot_2024-04-24_at_10.10.39_PM_ipwqjw.png)

15
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977149/Screenshot_2024-04-24_at_10.13.31_PM_ai16nx.png)

16
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977151/Screenshot_2024-04-24_at_10.13.54_PM_loujz8.png)

17
![App Screenshot](https://res.cloudinary.com/xoasis/image/upload/v1713977152/Screenshot_2024-04-24_at_10.13.58_PM_vbcmmu.png)


## Tech Stack

**Server:** Node, Express, Bcrypt, Nodemon, cookie-parser, jwt and mongoDB

**Tools:** PostMan, Visual Studio and Github
## Support

For support, email sharma.abhisheknis@gmail.com

