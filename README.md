<h1>Todo List</h1>

<h2>Project Description:</h2>
Full stack todo list project.  The objective was to make a single page todo list web application.
This todo list app can create new users and access existing user information.  See features list for
more details.

<h2>Feature List:</h2>
- Create new users
- Access existing user information
- Due Date functionality
- Add new tasks
- Edit existing tasks
- Diplays extra task details
- Priority Labeling
- Sorts tasks based on due date and priority
- Check off completed items (soft delete)
- Delete task (hard delete)

<h2>3 Things I learned:</h2>
 - Full stack programming
 - How to build a single page web app
 - Integrating javascript and php


<h2>Screenshots of Application:</h2>
   ![Alt text](/screenshots/pic1.png)
   ![Alt text](/screenshots/pic2.png)
   ![Alt text](/screenshots/pic3.png)
   ![Alt text](/screenshots/pic4.png)
   ![Alt text](/screenshots/pic5.png)
   ![Alt text](/screenshots/pic6.png)
   ![Alt text](/screenshots/pic7.png)
   ![Alt text](/screenshots/pic8.png)
   ![Alt text](/screenshots/pic9.png)
   ![Alt text](/screenshots/pic10.png)

<h2>Link to Live Preview:</h2>
<a href="http://jasonekstrom.com/TDL" target="_blank">Click here to see a live preview</a>







To Do list Featuresets

# TODO .1
- <a href="https://github.com/Learning-Fuze/TDL/tree/v.1">Version .1 scope</a>

# TODO .2
- <a href="https://github.com/Learning-Fuze/TDL/tree/v.2">Version .2 scope</a>

# TODO .5
- <a href="https://github.com/Learning-Fuze/TDL/tree/v.5">Version .5 scope</a>

# TODO 1.0 (Group Project)
- Combine code together to form a group project
    - Your team master branch will be T&lt;YOUR TEAM NUMBER&gt;_Master
    - Fork C4_TDL to your github account / clone to your system
- LOGIN:
    - add login page
        - 'username' input: holds the name of the user
        - 'password' input: holds hte password of the user
        - 'login' button: triggers the ajax call to the server to log in
    - AJAX request to server to log in:
        - request URL: http://s-apis.learningfuze.com/todo/login
        - input (POST):
            - username
            - password
        - output:
            - success: true/false - whether or not the login was successful
            - status:  number - the status of the account (1 is normal user)
            - email: string - the user's email
            - lastName: string - the user's last name
            - firstName: string - the user's first name
            - id: number - the user's ID number
            - errors: array - an array of strings, each holding an error that occurred during the login
- LOGOUT:
    - add logout button
    - AJAX request to server to log out:
        - request URL: http://s-apis.learningfuze.com/todo/logout
        - input (POST):
            - NONE
        - output:
            - success: true/false - whether or not the login was successful
            - msgs: string - logout message, if successful
            - errors: string: error that occurred during the logout

# TODO 1.5 (Group Project)
- Tie in list todo item functionality to server code
    - url:
    - input:
    - output:
- Tie in list individual todo item functionality to server code
    - url:
    - input:
    - output:
- Tie in create todo item functionality
    - url:
    - input:
    - output:

# TODO 1.6 (Group Project)
- Add Update functionality, with the ability to:
    - Edit any data on any one todo item
    - Save that data to the server at the following API:
        - url:
        - input:
        - output:

# TODO 1.7 (Group Project)
- Add Delete functionality, with the ability to:
    - delete a single todo item
    - confirm the todo item will be deleted
    - confirm with the server that the todo item is delete

# TODO 2.0


