# BMI Calculator and storage
## Screens

### Loggin
In this screen the user needs to put the credentials, in order to loggin and to go into the main page
![LogginPage][1]

### Register
In this screen it is possible to create a new user account
in order to loggin in into the main page and to be able to store data
![RegisterUser][2]

### Main page
In this screen the user can upload new entries, delete existing entries - watch their advance on an histogram and lastly the user can delete their account.

An entry consist of a date of measurement, a field for the heigh measure, for the weight measure, and the waist measure
after all this info is updated, the BMI is calculated and all the entries are saved in a table
![MainPage][3]

### Appointment page
In this screen the user can upload new appointments made
![Appointment][4]

An appointment consist of a proffessional, a status (appointment made or to be maken), a date, an address and a description of the meeting
![AppointmentDetail][5]

## Security
The bucket is configured to be [public][6]

![BucketPolitics][7]

it means anyone can access the url. To restrict the access to the website so only a few users can use it, in the bucket it is added a politic to deny access except for some public IP addresses

Sample politics taken from [How can I restrict access to my Amazon S3 bucket using specific VPC endpoints or IP addresses?][8]

```
{
  "Id": "VpcSourceIp",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VpcSourceIp",
      "Action": "s3:*",
      "Effect": "Deny",
      "Resource": [
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET",
        "arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"
      ],
      "Condition": {
        "NotIpAddress": {
          "aws:VpcSourceIp": [
            "10.1.1.1/32",
            "172.1.1.1/32"
          ]
        }
      },
      "Principal": "*"
    }
  ]
}
```

## Folders

### Controllers
In this folder there are the scripts that uses each screen

### Images
In this folder there are the images used to show on the screen as a background or in the screens

### Service
In this folder there are the scripts used to make request to the different API's

### Styles
In this folder there are the documents used to configure the style of the screen, font family - colors ...

[1]:../Images/WebPagesScreen/LogginScreen.png
[2]:../Images/WebPagesScreen/RegisterScreen.png
[3]:../Images/WebPagesScreen/MainPage.png
[4]:../Images/WebPagesScreen/AppointmentScreen.png
[5]:../Images/WebPagesScreen/SaveAppointment.png
[6]:https://docs.aws.amazon.com/AmazonS3/latest/userguide/configuring-block-public-access-bucket.html
[7]:../Images/GeneralOverview/PublicS3Bucket.png
[8]:https://aws.amazon.com/es/premiumsupport/knowledge-center/block-s3-traffic-vpc-ip/