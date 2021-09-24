# CYZ Pizza Ordering App

A **pizza ordering app**.

---
## Description

This pizza ordering app lets a user (customer) choose a certain amount of pizza item, add to cart, review, update as they like and place order. The customer would then receive a text message confirming that the order was received by the restaurant.

The restuarant can then accept or decline the order order which would again trigger an **sms** that's sent to the customer.

## The Team

- **[magotts](https://github.com/magotts)**
- **[caitmich](https://github.com/caitmich)**
- **[zakwarsame](https://github.com/zakwarsame)**

## Setup

1. Clone this project to your local environment
1. Make sure you have Node js installed or go to the **[official Node.js website](https://nodejs.org/)** and download the installer
1.  `npm i` to install the dependencies
1.  To receive text messages, **[sign up for a Twilio trial account](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account)** and follow the `.env.example` file to set up your variables.
1. `npm db:reset` to load and seed the database
1. `npm run local` to run app

### Screenshots

![Home page](https://github.com/magotts/midtermproject/tree/master/docs/home_page.png)
![Home page](https://github.com/magotts/midtermproject/tree/master/docs/admin_page.png)
![Home page](https://github.com/magotts/midtermproject/tree/master/docs/demonstration.gif)

### Tech Stack Used

- NodeJs
- Express
- Psql
- HTML and CSS

### Dependencies

- bcryptjs
- cookie-session
- timeago
- body-parser
- bootstrap
- chalk
- cookie-session
- dotenv
- node-sass-middleware
- pg
- pg-native
- ejs
- express
- twilio
