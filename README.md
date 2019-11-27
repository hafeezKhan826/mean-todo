# mean-todo

Technologies used:

1. It is a simple to-do app, the front end is built on Angular latest version using Angular material.
2. The backend is developed on NodeJs framwork ExpressJs using MongoDB as a database.

Features:
1. The app does not support browser reload as the token is mantained as long as the application is not reloaded.
2. When a reload occurs the user is redirected back to the login page.
3. The app protects the main page/routes as long as the user is logged in.

What does the application do?

1. The application requires a user logged in (email and password). And can sign in if it is a new user by using your email(xxx@yy.abc), adding password and confirming password
2. The logged-in user can create new todo's by click the "+" button
3. These to-do cards have three states active, deactive and completed. These are handeled by the button on cards created.
