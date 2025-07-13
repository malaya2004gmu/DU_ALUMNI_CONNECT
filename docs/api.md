# 📡 API Documentation

## Authentication

### POST /api/auth/signup
Registers a new user.
### POST /api/auth/login
Authenticates user and returns JWT token.
### POST/api/auth/update-profile
update the profiles of already registered users
---

## Events

### POST /api/event
it has two middlewire to check whether it has token and whether the requeest made by admin
the it add a new event 

### GET /api/events
return all the events 

### GET /api/event-details/:id
return the events details by event id 
---
## Course

### GET /api/all-course
return all courses
### POST /api/add-course
new course will be added by the admin 
### DELETE /api/course/:id
delete course by id (amdin)
---
## ADMIN ROUTES

### GET api/alumni
get all the registered alumni
### GET api/job-posts
get all the jobs posted by alumnis
### GET api/students
get all the registered students
### GET api/stat
get statistic 
### PUT api/approve-job
 approve a  job
### GET api/reject-job
reject a job
### GET api/delete-course
delete a course
### GET api/delete-event
delete an event 
---
##  ALUMNI ROUTES

### GET /api/my-jobs
get all the jobs posted by him
### DELETE /api/delete-job/:id
delete the posted job by id
---
## CHAT route

### POST /api/message
post a message 
### GET /api/history
get the previous message history 
---
## COMMUNITY POST

### GET  /api/
return all the posts posted by users
### POST /api/
post a community post 
### PUT /api/like/:id
put a like on a specified post with id 
### POST /api/comment/:id
add a comment on a post 
### GET /api/my-posts
return all the post posted by that specified user
---




