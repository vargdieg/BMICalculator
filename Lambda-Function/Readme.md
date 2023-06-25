# Lambda Functions

## Opinion management
| Name  | Description  |
|---|---|
| DeleteOpinion | Function that make the request to the table and delete an opinion entry by the id of the opinion|
| GetOpinion  | Function that make the request to the table and retrieve an opinion by the id of the opinion|
| CreateOpinion  |Function that make the request to the table and create an opinion|

### Delete Opinion
![Delete Opinion][1]

### Get Opinion
![Get Opinion][2]

### Create Opinion
![Create Opinion][3]

## User management
| Name  | Description  |
|---|---|
| Create user | Function that make the request to the table and create a new user entry|
| Delete user  | Function that make the request to the table and delete the user using the id of the user|
| Validate Loggin  |Function to validate the username and the password|
| Get user information  |Function that returns the username and the email of an user using the user identifier|

### Create User
When creating an user - first it is needed to check if the email and the username are in the table, if those elements are in another user, the user need to modify the email or the user

![Create User][4]

### Delete User
![Delete User][5]

### Validate Loggin
![Validate Loggin][6]

### Get User Information
![Get User Information][7]

## Data Management
| Name  | Description  |
|---|---|
| Get user data | Function that make the request to the table and retrieve all the bmi data of the user using the id|
| Delete data entry  | Function that make the request to the table and delete a bmi data entry, using the bmi identifier|
| Put new data entry  | Function that make the request to the table and save a new bmi data entry|

### Get User Data
![Get User Data][8]

### Delete Data Entry
![Delete Data Entry][9]

### Put new data entry
Before putting a new bmi data entry, first it is checked if the identifier of the new bmi data exists in the database, if it exists, the entry is not added in the database

![Put new data entry][10]

## Appointment Management
| Name  | Description  |
|---|---|
| Delete appointment | Function that using the user identifier and the appointment identifier deletes the entry in the database|
| Get user appointment  | Function that retrieves all the user appointments using the user identifier |
| Put new appointment  | Function that creates a new appointment entry to an specific user|
| Update an existing appointment  | Function that edit an existing appointment|


### Delete appointment
![Delete appointment][11]

### Get user appointment
![Get user appointment][12]

### Put new appointment
![Put new appointment][13]

### Update an existing appointment
![Update an existing appointment][14]

[1]:../Images/LambdaImages/CreateOpinion.png
[2]:../Images/LambdaImages/DeleteOpinion.png
[3]:../Images/LambdaImages/CreateOpinion.png
[4]:../Images/LambdaImages/CreateUser.png
[5]:../Images/LambdaImages/DeleteUser.png
[6]:../Images/LambdaImages/ValidateLoggin.png
[7]:../Images/LambdaImages/GetUserInformation.png
[8]:../Images/LambdaImages/GetUserBMIData.png
[9]:../Images/LambdaImages/DelteUserBMIDataEntry.png
[10]:../Images/LambdaImages/PutNewBMIDataEntry.png
[11]:../Images/LambdaImages/DeleteUserAppointment.png
[12]:../Images/LambdaImages/GetUserAppointment.png
[13]:../Images/LambdaImages/PutNewAppointment.png
[14]:../Images/LambdaImages/UpdateAppointment.png