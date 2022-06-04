<h1 align="center"><img height="22px" width="22px" src="https://user-images.githubusercontent.com/96894806/170635110-72da3973-33be-438e-802b-7719c6f1e724.png" alt=""><img>  Chatter</h1>


Chatter is a full-stack web application clone of <a href="https://slack.com/">slack.com</a>. Chatter allows users create and join channels, interact with other users via a live chat, and send direct messages to other users or groups of users.

<a href="https://chatter-with-us.herokuapp.com/" target="_blank"><strong>Explore the website »</strong></a><br/>


<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#future-features">Future Features</a></li>
  </ol>
 </details>

## Technologies Used

![Python](https://img.shields.io/badge/-Python-F9DC3E.svg?logo=Python&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)


## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Features
[Back to top](#table-of-contents)

<a href="https://github.com/celestewinterton/guestly/wiki">See wiki page for feature list</a>

### Splash Page
Landing page for when users first arrive at Chatter. Users can sign in, sign up, or explore the site through a demo user without signing up. Check out the live site <a href="https://chatter-with-us.herokuapp.com/" target="_blank">here</a>! 
![Splash Page](https://user-images.githubusercontent.com/96894806/171970664-f718ba0b-fb5e-4f4d-98a7-9a958797a375.png)

### Channel Browser
Once a user has been authenticated, they will be redirected to the channel browser, a dashboard that shows all existing channels. The side navigation pannel allows the user to easily find their direct messages or channels that they have joined.
![Channel Browser](https://user-images.githubusercontent.com/96894806/171970774-a95bcb11-38e7-48bd-aa6d-fbea889ac5a3.png)

### Channel Page
If the user clicks on a channel in which they are not a member, they can easily join and start sending messages. 
![Channel Page](https://user-images.githubusercontent.com/96894806/171971142-4d996ad4-7348-4dd8-bcaf-a23a7e705312.png)

### Create/Edit Channel Form
If the user creates a channel, they will also be able to edit, delete, or leave that channel. If a user did not create the channel, they will not have access to this form. 
![Channel Form](https://user-images.githubusercontent.com/96894806/171971158-6b94074f-7c80-4586-9dfc-63a410d9da19.png)

### Live Chat and User Active Status
Channels and direct messages both have an integrated live chat feature that uses socket.io. This allows users to interact in real-time and also shows when users are active by clicking on a user image.
![Live Chat](https://user-images.githubusercontent.com/96894806/171971148-50968802-75dc-483a-a9a4-679987551b27.png)

### Direct Message and Multi-Person Messages
Users can create direct messages to another user or a group of users. When they start typing, a dropdown will allow the user to select other users or will autofill when a name matches an existing user. When this field is submitted, a new message will be created and redered in theside navitation menu.
![Multi-Person Messages](https://user-images.githubusercontent.com/96894806/171971170-aff97327-5d39-4d88-8a4f-59c536abba8f.png)

### Search
Users can search for message groups that they are a part of, or all channels regardless of whether they are a member or not. Clicking search results will redirect the user to the targeted message or channel. 
![Search](https://user-images.githubusercontent.com/96894806/171971226-8f77fabd-3dda-4c9b-929e-9c1c6c1f448d.png)

## Database Schema
[Back to top](#table-of-contents)

![Database Schema](https://user-images.githubusercontent.com/96894806/170581187-3d274be1-5f04-45fa-84fd-e0625a57f4df.png)

## Future Features
[Back to top](#table-of-contents)

### Reactions 
* Users will be able to react to messages with different emojis
* Messages will be displayed with existing reactions and a count of how many people have reacted with a particular emoji 

### Notifications
* Users will receive notifications when they receive direct messages, group messages, or when there are new posts in channels that they are subscribed to
