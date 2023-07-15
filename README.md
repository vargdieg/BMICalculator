# BMI Calculator and progress record

## Description

The purpose of this project is to registry and keep track on some medical information of an user.

![WebPageOverview][1]

## Functional Diagram
<!-- Functional diagram Image -->
![Component diagram][2]
<p align = "center">Fig 1. Components of the solution </p>

### List of components


- **Route 53**: <br>
AWS service used to first register a domain and assign it to the web page, and second route the petitions to different resources, in this case to AWS cloudfront

- **Cloudfront**: <br>
AWS service used to deliver content throught edge locations, making the delivery of static files faster

- **AWS Web Application Firewall (WAF)** <br>
AWS service that protect web applications from exploits. In this project it is also used to delimited the access just to certains public IP's

- **Amazon S3**: <br>
AWS service used to storage objects and files. In this project it is used to store all the files necessary to render a host.

- **Api Gateway**: <br>
AWS service used to expose capabilities, in order to trigger events in AWS. In this project it is used to exposed the capabilities of creating users, data.

- **Lambda functions**: <br>
AWS compute service used to either manage services in AWS or to make computing process. In this project lambda functions are used in order to store - retrieve or to delete data from the databases.

- **DynamoDB**: <br>
AWS NoSQL database used to store data. In this project this service is used to save users data.

[1]:Images/WebPagesScreen/BMIChestCalculatorPreview.png
[2]:Images/GeneralOverview/FunctionalDiagram.png