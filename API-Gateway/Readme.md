# API's
## List of API's
### Manage Opinion
This API exposes the capabilities of manage the items the opinions made in the website

| Name  | Resource  | Description  |
|---|---|---|
| Create opinion  | /createopinion  | resource used to  store an opinion in the opinion table|
| Delete opinion  | /deleteopinion  | resource used to delete an opinion in the opinion table by the id of the opinion|
| Get opinion  | /getopinion  | resource used to retrieve an opinion in the opinion table by the id of the opinion|

***NOTE:***
The resources delete and get opinion although exist, are not used or invoked by the web page

#### Request Schema create opinion
```
{
    "region": "RegionName",
    "customerName": "Name",
    "customerOpinion": "Opinion",
    "messageIdentifier": "123456789"
}
```
#### Success response Schema create opinion
```
{
    "Code": "HTTP success code"
}
```
#### Request Schema delete opinion
```
{
    "region": "regionName",
    "id": "123456789"
}
```
#### Success response Schema delete opinion
```
{
    "Code": "HTTP success code"
}
```
#### Request Schema get opinion
For request of the get opinion resource, the id and the region need to be included in the query parameter
|Query parameter name|
|   ---    |
|region|
|id|
#### Success response Schema get opinion
```
{
    "Code": "HTTP status code",
    "Item": {
      "CUSTOMER_OPINION": "Opinion",
      "CUSTOMER_NAME": "Name of the customer",
      "MESSAGE_IDENTIFIER": "Identifier"
    }
}
```
#### error response Schema
```
{
    "name": "error Name",
    "message": "error message",
    "error": {
        "errorCode": "HTTP status code"
}
```

### BMI user management
This API expose the capabilities of creating deleting changing the user information such as the name password and email

| Name  | Resource  | Description  |
|---|---|---|
| Create user  | /createuser  | resource used to create a new user with an username - password - email|
| Delete user  | /deleteuser  | resource used to delete an user using the id of the user |
| Update user  | /updateuser  | resource used to update the name - password or the email of an existing user|
| Get all user  | /user  | resource used to retrieve the name - password and the email of all the users|
| Get user by username | /user/{username}  | resource used to retrieve all the information of an user by the username of the user|
| Get user by id | /{id}  | resource used to retrieve all the information of an user by the id of the user|

***NOTE:***
The resources update user and get all users although exist, are not used or invoked by the web page

#### Request Schema create user
```
{
      "region":"region of the table",
      "customerName": "name of the user"
      "customerPassword": "user password"
      "customerEmail": "user email"
      "customerIdentification": "user id"
    }
```
#### Request Schema delete user
```
{
      "region": "region of the table",
      "id": "user id"
}
```
#### Request Schema update user
```
{
      "region": "region of the table",
      "id": "user id",
      "fieldToChange": "CUSTOMER_NAME",
      "newValue": "New string to update"
}
```
**NOTE:** The field to change value only can have this values
CUSTOMER_NAME - CUSTOMER_EMAIL - CUSTOMER_PASSWORD, that are the properties of the user

#### Request Schema get all users
For request of the get all users resource, the region need to be included in the query parameter

|Query parameter name|
|   ---    |
|region|

#### Request Schema get user by username
For request of the get user by username resource, the region need to be included in the query parameter

|Query parameter name|
|   ---    |
|region|

#### Request Schema get user by id
For request of the get user by id resource, the region need to be included in the query parameter

|Query parameter name|
|   ---    |
|region|

#### Success Response Schema create user
```
{
    "Code": "HTTP success code"
}
```
#### Success Response Schema delete user
```
{
    "Code": "HTTP success code"
}
```
#### Success Response Schema update user
```
{
    "Code": "HTTP success code"
}
```
#### Success Response Schema get all users
```
{
    "Code": "HTTP status code",
    "Item": [{
        CUSTOMER_NAME: "name",
        CUSTOMER_EMAIL: "mail",
        CUSTOMER_IDENTIFICATION: "id"
    }]
}
```
#### Response Schema get user by username
```
{
    "CUSTOMER_NAME": "username",
    "CUSTOMER_PASSWORD": "user password",
    "CUSTOMER_IDENTIFICATION": "user id"
}
```
#### Response Schema get user by id
```
{
    "Code": "HTTP status code",
    "Item": {
    "CUSTOMER_NAME": "username",
    "CUSTOMER_PASSWORD": "user password",
    "CUSTOMER_IDENTIFICATION": "user id",
    "CUSTOMER_EMAIL": "user email"
    }
}
```
#### error response Schema
```
{
    "name": "error Name",
    "message": "error message",
    "error": {
        "errorCode": "HTTP status code"
}
```
### BMI Data management
This API exposes the capabilities of updating or retrieving the user data related to the BMI

| Name  | Resource  | Description  |
|---|---|---|
| Update data  | /updatedata  | resource used to save and update the data of the user|
| Retrieve data  | /userdata/{id}  | resource used to retrieve the user data related to the BMI|

#### Request Schema update data
```
{
    "region": "region of the table",
    "id": "user identifier",
    "data": [{
        weight: "weight",
        height: "height",
        date: "date",
        bmi: "calculatedBMI",
        id: "Identification of the entry"
    }
}
```
#### Request Schema retrieve data
For request of the retrieve data resource, the region need to be included in the query parameter

|Query parameter name|
|   ---    |
|region|

#### Success Response Schema update data
```
{
    "Code": "HTTP status code"
}
```
#### Success Response Schema retrieve data
```
{
    "Code": "HTTP status code",
    "Item": {
        "CUSTOMER_DATA":[{
            weight: "weight",
            height: "height",
            date: "date",
            bmi: "calculatedBMI",
            id: "Identification of the entry"
        }]
    }
}
```
#### error response Schema
```
{
    "name": "error Name",
    "message": "error message",
    "error": {
        "errorCode": "HTTP status code"
}
```
## Security
The API's are currently exposed in a [regional API endpoint][1], so everyone can access and consumes the API's characteristics.
To limit firts who can consumes the API and second the how many request can be done by a single user, it is used [API keys][2] and [usage plans][3]

[1]:https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html
[2]:https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-setup-api-key-with-console.html
[3]:https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html