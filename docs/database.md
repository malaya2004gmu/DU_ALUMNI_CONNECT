# 🧬 Database Schema

## User

- name, email, password, role, conatctnumber, photo, course, year, otp, otpExpiry, publicKey, Privatekey

## Events

- title, description, date, photo, location

## JobPost

- title, description, company, location, salary , status :[approved,pending,rejected],applylink, postedBy ->refer (user)


## course

-name, description, duration

## Chat
- roomId, participant,messages;{sender, encrypted message, encryption key} ,time-stamp

## community post
- author->User, title, image ,category ,likes, comments