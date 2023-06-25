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
| Validate Loggin  |Function to validate the username and the password|
| Get user information  |Function that returns the username and the email of an user using the user identifier|

### Create User
When creating an user - first it is needed to check if the email and the username are in the table, if those elements are in another user, the user need to modify the email or the user

## Data Management
| Name  | Description  |
|---|---|
| Get user data | Function that make the request to the table and retrieve all the bmi data of the user using the id|
| Delete data entry  | Function that make the request to the table and delete a bmi data entry, using the bmi identifier|
| Put new data entry  | Function that make the request to the table and save a new bmi data entry|

### Put new data entry
Before putting a new bmi data entry, first it is checked if the identifier of the new bmi data exists in the database, if it exists, the entry is not added in the database

## Appointment Management
| Name  | Description  |
|---|---|
| Delete appointment | Function that using the user identifier and the appointment identifier deletes the entry in the database|
| Get user appointment  | Function that retrieves all the user appointments using the user identifier |
| Put new appointment  | Function that creates a new appointment entry to an specific user|
| Update an existing appointment  | Function that edit an existing appointment|