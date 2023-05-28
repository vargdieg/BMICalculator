# Lambda Functions

## Opinion management
| Name  | Description  |
|---|---|
| DeleteOpinion | Function that make the request to the table and delete an opinion entry by the id of the opinion|
| GetOpinion  | Function that make the request to the table and retrieve an opinion by the id of the opinion|
| CreateOpinion  |Function that make the request to the table and create an opinion|

## User management
| Name  | Description  |
|---|---|
| Create user | Function that make the request to the table and create a new user entry|
| Delete user  | Function that make the request to the table and delete the user using the id of the user|
| Update user info  |Function that make the request to the table and modify the name password or email of the user|
| Get user info  |Function that make the request to the table and retrieve using the id of the user the name password and email of the user|
| Get all users  |Function that make the request to the table and retrieve the name password and email of all the users in the table|
| Get user credentials  |Function that make the request to the table and retrieve the name password and identifier of the user |

### Create User

When creating an user - first it is needed to check if the email and the username are in the table, if those elements are in another user, the user need to modify the email or the user

## Data Management
| Name  | Description  |
|---|---|
| Get user data | Function that make the request to the table and retrieve all the bmi data of the user using the id|
| Update user data  | Function that make the request to the table and save the bmi data of the user|