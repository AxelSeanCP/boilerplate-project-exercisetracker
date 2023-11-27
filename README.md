# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

# How To Use
<h2>Add new User: </h2>
<li>put the username in the  <b>create a new username</b> box and press <b>Submit</b></li>
<li>it will show you the username and id, copy the id somewhere because the create a new username will generate new id</li>

<h2>Add exercises: </h2>
<li>put the <b>id</b> you save when creating a new user to the <b>id field</b></li>
<li>fill the other fields such as <b>description, duration, and date</b> (date is optional)</li>
<li>press the <b>submit</b> button and it will show you the exercise information</li>

<h2>In the URL</h2>
<li>use <b>/api/users</b> to get all users</li>
<li>use <b>/api/users/:_id/logs</b> to get all exercise logs of a user (make sure to put the :_id with your actual id)</li>
<h6>Optional:</h6>
<li>after <b>/api/users/:_id/logs</b> use <b>?from=2023-10-10&to=2023-12-25&limit=3</b> to get all exercise logs of a user with query (make sure to replace the from,to,and limit with your actual query)</li>
