### Overview ###

* The code test by SHOPBACK.

### Set it up and run ###

* Configurations:
    Using default port: 3000 for Reactjs client.
	Using default port: 6969 for Nodejs server.
    
* Dependencies:
    * Nodejs 8.x: https://nodejs.org/en/
    * Redis for windows: https://github.com/MicrosoftArchive/redis/releases. If you don't use windows check link: https://redis.io/download.
	
* Deployment instructions
	* Client:
		* Open the project and type: npm install.
		* After dependencies installed, type: npm start.
	* Server:
		* Make sure Redis started.
		* Open the project and type: npm install.
		* After dependencies installed, type: npm start.
    
* User manuals
    * Open default link: http://localhost:3000/
	* When page opened -> click create if you want to create and manage events with admin role. Or enter the code to join the event by audience role.
	* With Audience role: you can send, receive, like/dislike question.
	* With Admin role: you can create, edit, delete events. You can change, edit, delete any questions of any events.

### Project structure ###

## Client ##
	* Screens component:
		* StartScreen: for enter the code or enter manage event.
		* SignUp/Login: create an account or login with admin role.
		* EventScreen: manage events with admid role.
		* EventDashboardScreen: manage questions of an event with admin role.
		* QuestionScreen: manage questions with audience role.
	
	* Redux:
		* Reducer for events: store events info.
		* Reducer for questions: store questions of an event.
		* Reducer for screen states: manage switching between screens.
		
	* Services:
		* Socket service for connecting to web socket server.
		* Api service for calling api to http server.
		
## Server ##
	* Controllers:
		* Admin controller for signup, login, logout admin.
		* Event controller for get connection string (where socket server is hosted), get events, create, edit, delete event.
		
	* Routes: config routes for actions of admin and event controller.
	
	* Services: api for caching.
	
	* Jwt: using json web token to authenicate.
	
	* HapiSwagger: go to link: http://localhost:6969/docs/ for checking APIs of http server.
	
	* Socket folder:
		* Websocket: create websocket and listen connection.
		* Sender/SendData: utility class for sending a message.
		* SocketHandlers: one message sent from client that will be handled by one class handler.
	
	* Database: using Redis for storing data.
	
	* Note: With an event will be assigned a connection string - where socket server hosted. When the first user join an event, we will select a free socket server
	(is described by connection string) and assign to this event. Because this is just the test, so I just selected a default connection string is 'http://localhost:6969'.
	We do that because of scaling issues.
    
### Assumptions ###

* We can split http server and socket server to different project.
* We can split web pages for audience and admin to different project.
* I used Redis for Database. We can use other DB as MySql, MongolDB,....

### Others ###

* If you have any troubles in setup 2 apps (client & server), please ping me via my skype: vetrinhtinh or my mobile: 0907929135.
* This some screenshoots for apps: https://docs.google.com/document/d/1BHg4C4Nv0qO4obmK5z-c6gg-RYnT_Yto5n7fT_VuxrQ/edit?usp=sharing


