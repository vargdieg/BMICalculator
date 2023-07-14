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

The possible values for status are:
- agendada
- no agendada

The possible values for profession are : 
- alergologia
- cirugia Maxilofacial
- general
- medicina Interna
- "otorrino
- odontologia
- neurologia
- medicina Deportiva
- nutricion
- endocrinologia
- optometria"

## Folders

### Controllers
In this folder there are the scripts that uses each screen

### Images
In this folder there are the images used to show on the screen as a background or in the screens

### Service
In this folder there are the scripts used to make request to the different API's

### Styles
In this folder there are the documents used to configure the style of the screen, font family - colors ...

[1]:./Images/LogginScreen.png
[2]:./Images/RegisterScreen.png
[3]:./Images/MainPage.png
[4]:./Images/AppointmentScreen.png
[5]:./Images/SaveAppointment.png