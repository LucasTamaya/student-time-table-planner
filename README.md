# Codedamn Projects - Student's Timetable planner

![header image](https://raw.githubusercontent.com/codedamn-projects/student-timetable-planner/master/assets/main%20image.png)
## Hello developer!

This is one of the many projects available on [codedamn](https://codedamn.com/projects) to reinforce your learning by building. If you want to become a full stack developer and learn by practicing, feel free to attempt this challenge. Feel free to check out the codedamn [Full Stack Web Development Learning Path](https://codedamn.com/learning-paths/fullstack) to learn more about how to become an awesome full stack developer.

## Project Overview

You have to implement an application to allow students to choose & register for multiple courses, view their timetable.

The application should take care of the following aspects: 

-  Classes can be of multiple subjects - DBMS, Operating System, DSA etc. 
-  Each class has a fixed time slot. (For simplicity consider every class happens once a week at the same time. Ex DBMS: Every Monday 5pm-6pm) 
-  Students can add a class to their timetable if the class’s time doesn’t clash with already booked classes’ time. 
-  Students can delete a class from their timetable.


### Landing Page

The is no landing page structure, you are free to make a small landing page based on the topic of the project and the page should contain the links for login and registration 

### Project Flow

![project flow](https://raw.githubusercontent.com/codedamn-projects/student-timetable-planner/master/assets/editing.png)
### Register

THe registration functionality should be implemented at  `/register` route.

This should contain the students details, refer to the student document for the details to be collected. 

### Log In

The login functionality should be implemented in the `/login` route.

On Successful submission of credentials you have to create and store a JWT token in localStorage for handling the authentication. Every request to the api should share the JWt token to verify the identity of the user, before returning any response. 

### Courses

All the available courses should be shown in `/courses` page and student should be able to add courses to his time table and should have a final prompt to add the courses after selection. 

NOTE : Each course will contain multiple classes each class led by a different professor. 
### my-classes page

The student should be able to view his registered courses in the `/my-classes` page along with the number of classes per week. 
### timetable

The time table of the student should be shown in `/timetable` router. You can implement a calendar widget to show the courses. 


You can use the [react big calendar](https://github.com/jquense/react-big-calendar) library for the calendar component. You are free to any other library or implement it on your own. 


## API Routes 

### `/api/auth/signin`

To verify the user credentials on Sign In, taking the parameters as the roll number and the password 

### `/api/auth/register` 

To register a new student and add the document to the database


### GET `api/classes/{courseCode}`

This should return the number of classes in the course. This is should be implemented in `/courses` and on clicking on the course you can open a new page `course/[id]` which will fetch the classes for this course. 

### POST `/api/classes/{studentId}`

This api should add the class to the student document in the database. 

### GET `/api/class/[studentID]`

This Endpoint should be used to show in the `my-classes` and show it on `/timetable` in the calendar view. 

### DELETE `/api/class/[studentID]/[classID]`

This should remove the student from the course and remove the class from his time table. 


### MongoDB Student document
```
{ "rollNo": "19BCEXXXXX",
  "name": "Student_Name",
  "classes":["class1_id", "class2_id"],
  "password: string (store it as hash using bcrypt)
}
```
### MongoDB Class document
```
{  "id": "class_id",
   "courseCode": "CSE1002",
   "faculty": "XXXX",
   "time":  date object
}
```

### MongoDB Post Document
```
{ 
    "id": "CSE1002",
    "name: "OS", 
}
```

### Ports 
The Codedamn Playgrounds exposes only `1337` and `1338` ports on the internet. So you'll be using `localhost` for connecting to the mongodb instance as they are hosted on the same docker container. You can specify it as `localhost:27017` or simple write `localhost`. 

## Recommended Technologies 

1. Mongoose for mongodb object modelling and effective type system 
1. Tailwind CSS for User Interface
1. `@mui/icons-material`. You can use their [website](https://mui.com/components/material-icons/) to pick up icons for the project.

There is no restriction for using mui, you can free to choose any other icons for your project.


## Instructions

Your challenge is to build out this project and get it looking as close to the design as possible.

You can use **any tools or technologies** you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your project should:

-   Be responsive for desktop and mobile phones
-   Have minimum functionalities and effects working


Want some support on the challenge? [Join our discord community](https://cdm.sh/discord) and ask questions in the **#general** channel.

There is no limit you can go beyond the mentioned criteria and create additional functionalities


## Where to find everything

Your task is to build out the project as per the provided screenshots. You will find both a mobile and a desktop version of the design.

The designs are in image formats can be found in `/designs`.

You will find all the required required images in the `/public` folder

There is also a `style-guide.html` file containing the information you'll need, such as color palette and font names. Make sure to open this in the browser to see the contents.

## Want to do more

1. You can build OAuth2 for Sign In and Registration
1. Creating the network page and having Connections

## Send feedback!

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please visit [codedamn feedback page](https://codedamn.com/contact)