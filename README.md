**Project description**

In this project, you will create a user table and then use it to register a new user and then allows the user to sign into a website. It will also allow to search users in different categories.

These are the funtions that are be implemented to the interface: 
1. User registration.
2. User sign-in.
3. search users by first and/or last name.
4. search users by userid;
5. search all users whose salary is between X and Y. 
6. Search all users whose ages are between X and Y.
7. Search users who registered after john registered, where ```john``` is the userid.
8. search users who never signed in.
9. Search users who registered on the same day that john registered. 
10. Return the users who registered today;


**How to run the code**
1. You would need to make sure you have XAMPP installed. Apache web server will be used.
2. Make sure the the respitory is in ```C:\xampp\htdocs>``` (or similar directory where you installed XAMPP). 
3. At ```C:\xampp\htdocs```, run ```git clone https://github.com/Ifratt/CSC_4710_Project1.git``` to copy the whole project code to the current directory.
4. Now you can access the Frontend via [http://localhost/database_javascript/CSC_4710_Project1/Frontend/homeScreen.html](http://localhost/database_javascript/CSC_4710_Project1/Frontend/homeScreen.html).
7. Go the Backend directory ```C:\xampp\htdocs\database_javascript\CSC_4710_Project1\Backend```.
9. Type in  ``` npm install express mysql cors nodemon dotenv

```
11. Start the Backend by running ```npm start```.
12. Feel free to access some of the Backend endpoints directly such as [http://localhost:5050/getAll](http://localhost:5050/getAll) or  [http://localhost:5050/search/joinedAfterJohnYou](http://localhost:5050/search/joinedAfterJohnYou) will only receive JSON data without nice rendering. 
13. Now you can interact with the Frontend [http://localhost/database_javascript/project1/CSC_4710_Project1/homeScreen.html](http://localhost/database_javascript/CSC_4710_Project1/Frontend/homeScreen.html).


   

