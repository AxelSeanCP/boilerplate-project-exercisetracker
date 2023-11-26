# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

# How To Use
<h2>Add new User: </h2>
<li>put the username in the  <b>create a new username</b> box and press <b>Submit</b></li>
<li>it will show you the username and id, copy the id somewhere because the create a new username will generate new id</li>

<h2>Add exercises: </h2>
<li>put the id you save when creating a new user to the id field</li>
<li>fill the other fields such as description, duration, and date (date is optional)</li>
<li>press the submit button and it will show you the exercise information</li>

<h2>In the URL</h2>
<li>use <b>/api/users</b> to get all users</li>
<li>use <b>/api/users/:_id/logs</b> to get all exercise logs of a user (make sure to put the :_id with your actual id</li>