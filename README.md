# BMI Calculator and progress record

## Description

The purpose of this project is to registry and keep track on the progress of the BMI of an user.

It is intended that you can use the web resource and save your progress

![WebPageOverview][1]

## Functional Diagram
<!-- Functional diagram Image -->
![Component diagram][2]
<p align = "center">Fig 1. Components of the solution </p>

### List of components
- **Amazon S3**: 

AWS service use to storage objects and files. In this project it is used to host an static web page that the user can load in a web browser.

- **Api Gateway**:

AWS service use to expose capabilities, in order to trigger events in AWS. In this project it is used to exposed the capabilities of creating users, data.

- **Lambda functions**:

AWS compute service used to either manage services in AWS or to make computing process. In this project lambda functions are used in order to store - retrieve or to delete data from the databases.

- **DynamoDB**: 

AWS NoSQL database used to store data. In this project this service is used to save users data.

[1]:Images/BMIChestCalculatorPreview.png
[2]:Images/FunctionalDiagram.png