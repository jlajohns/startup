# Startup
Have you ever struggled to keep track of tasks? Do responsibilities get forgotten or missed when working with a group? With the I'm On It application you fears can be put to rest. This application allows individuals to add and complete tasks visible to any others in their group. Each group member or individual can see what tasks have been completed (and by who) and what still needs to be done. I'm On It is perfect for anyone looking to stay organized for themselves, or while working with others! 
## Key Features
- Allow users to create accounts and sign in (Login over HTTPS)
- Display users name 
- Display tasks to do and those completed
- Ability for users to create or delete tasks 
- Update tasks as they are added, completed, or deleted
- Task completion history persistently stored

![Sketch](image.png)

## Technology 
The following technology will be used in the I'm On It application.

- HTML: Three HTML pages will be used. One for login, for homepage, and task history.
- CSS: application styling that adjusts based on screen size, and uses pleasing color and contrast choices. 
- JavaScript: Provices login, task display, display other user's tasks 
- Service: Backend endpoints to: addTask, updateTask, deleteTask
- WebSocket: Shows who has done what tasks in real time, allows all users to update task list 
- React: Application uses React web framework 

## HTML Assignment 
- HTML pages: Three pages, one that respresent the ability to login, an index and taskhistory
- Tags: properly used the html tags 
- Links: links to login on index page, and link on login to taskhistory
- Text: Each task action is represented by a textual description
- 3rd party service calls: placeholder button for API to google calendar
- Images: Image on index.html
- Login: login placeholder on login.html
- Database data: placeholder for task history list in taskhistory.html
- Websocket: Placeholder showing real time updates on task actions for users logged in 
- Deployed simon to website (https://simon.jascinda.click)
- GitHub: displayed in footer on my login and index htmls 

## CSS Assignment
- Header, footer, main content body: properly styled using CSS fonts, color, and spacing. 
- Navication elements: Styled using fonts, color, and boxed color
- Responsive window sizing: Implemented based on lesson directions for media responsiveness, also made large picture inline formatted
- CSS application elements: proper use of color, shapes, style choices. 
- Text content: aesthetic font that matches headers, spacing, color 
- Image: properly styled using CSS, added border and moved it to the middle

## JavaScript Assignment
- JavaScript Support for future login: Done, future login is supported!
- JavaScript support for future database data: Task History shows a database of tasks that future users have done (keeps a log of what was completed)
- Javascript support for future WebSocket: Users can simultaneously Add, Delete, and Complete tasks to group projects (these features are shown using mock data in the homepage in active tasks)
- Javascript support for applications interaction logic: Taskhistory has javascript support that shows a certain amount of tasks at a time, the user can move forward and back. Task history results list has buttons to increase or decrease the amount of results shown. The active tasks have working delete and complete buttons (the complete adds it to task history, while delete removes the task altogether). Currently working on JavaScript support for adding individual tasks. 
- Deployed updated simon website to (https://simon.jascinda.click)
- Deployed my website to (https://startup.jascinda.click)

## Startup Service Assignment
- both simon and my startup are deployed
- Github startup repository displayed at bottom of my application home page
- Updated README.md and notes
- I created an HTTP service using Node.js and Express
- Front end served up using Express static middleware (I did this!)
- Front end calls third party service endpoints (button for date on homepage)
- backend provides service endpoints for (add task, delete task, complete task, taskhistory)
- Frontend calls service endpoints (I did this on the appropriate js files) 