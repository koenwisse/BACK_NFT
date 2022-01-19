Battleplans:

### F1_NFT. As a user I want to view a list of nfts belonging to other users

Part 0 - Set up database DONE
//1. Setup database model and migration file NFT's
Users: models, migration files
//2. Set up relations
//3. Put (seed) in dummy data and test

// Part 1 - Make DB
//1. Create and endpoint to get list of NFT's
//2. Test our endpoint to get a list of NFT's (httpie / postman)
//3. Make a request to our endpoint in the frontend re. this feature (if breaks we know problem is in frontend)
//4. If all good move to frontend

// Part 2 - Plan frontend setup
//1. Create a component
//2. Create a card component and a list component to show data on screen and setup routes
//3. Import the logic in home
//4. Write the logic to show the list

//Part 3 - Plan frontend Redux-data and take away from component level --> Fetch data into actions with a thunk: npm i redux and redux-thunk
/1. Write an async function in action (thunk) and make axios request
/2. import the function in the component
/3. dispatch the function inside useEffect to see the console.log
/4. Back to the actions, dispatch the action inside the function with data (go to repo coders 55 to look at code)
/5. Write a case in the reducer to handle the data
/6. Write a selector to get the data
/7. Import the selector in the component
/8. Map over the data

### Relations

W5D2 // Set up backend database, fetch (GET) data in browser and use thunk to handle state
Part 1 - Set up database DONE
//1. Setup database model and migration file space stories
//2. Set up relations
//3. Put (seed) in dummy data and test

### 1. As a user I want to view a list of nfts belonging to other users

// Part 1 - Make (backend) endpoint
//1. Create and endpoint to get a space
//2. Test our endpoint to get a space (httpie / postman) DONE
//3. Make a request to our endpoint in the frontend re. this feature (if breaks we know problem is in frontend) DONE
//4. If all good move to frontend DONE

// Part 2 - Plan frontend setup DONE
//1. Create a component DONE
//2. Create a card component and a list component to show data on screen and setup routes DONE
//3. Import the logic in home DONE
//4. Write the logic to show the list DONE

//Part 3 - Plan frontend Redux-data and take away from component level --> Fetch data into actions with a thunk: npm i redux and redux-thunk
/1. Write an async function in action (thunk) and make axios request DONE
/2. import the function in the component DONE
/3. dispatch the function inside useEffect to see the console.log DONE
/4. Back to the actions, dispatch the action inside the function with data (go to repo coders 55 to look at code) DONE
/5. Write a case in the reducer to handle the data DONE
/6. Write a selector to get the data DONE
/7. Import the selector in the component DONE
/8. Map over the data DONE

## 2. As a user interested in people's lives, I want to read people's stories, so I can be informed

// Part 1 - Make (backend) endpoint DONE
//1. Create and endpoint to get details data for detailpage DONE
//2. Test our endpoint (httpie / postman) DONE
//3. Make a request to our endpoint in the frontend re. this feature (if breaks we know problem is in frontend) DONE
//4. If all good move to frontend DONE

// Part 2 - Plan frontend setup
//1. Create a page for details
//1a. register a dynamic route
//1b. Link the title to the dynamic page
//1c. Import useParams
//1d. Clg to check if we get a different id for each space
//1d. Fetch data with Thunk
//2. Create a card component and a list component to show data on screen and setup routes
//3. Import the logic from the component
//4. Write the logic to show the list in the page

//Part 3 - Plan frontend Redux-data
/1. Write an async function in action (thunk) and make axios request
/2. import the function in the component
/3. dispatch the function inside useEffect to see the console.log
/4. Back to the actions, dispatch the action inside the function with data (go to repo coders 55 to look at code)
/5. Write a case in the reducer to handle the data
/6. Write a selector to get the data
/7. Import the selector in the component
/8. Map over the data

---

## W4D4 //How to fetch data with a thunk

//1. Write an async function in action (thunk) and make axios request
//2. import the function in the component
//3. dispatch the function inside useEffect to see the console.log
//4. Back to the actions, dispatch the action inside the function with data
//5. Write a case in the reducer to handle the data
//6. Write a selector to get the data
//7. Import the selector in the component
//8. Map over the data

//Display only five posts
//1. url => add limit and offset
//2. Make a dynamic offset
//3. modify the case in the reducer, so it keeps the previous post and add the new ones
//4. make a button to fetch next 5 posts

W5D2 //Form to post stories behind login (F5: Practice assessment)
// Part 1 - Plan Backend
//1. Create and endpoint to post a story
//2. Test our endpoint to post a story
//3. Once the endpoint is working, add the authMiddleWare
//4. If all good move to frontend

// Part 2 - Plan frontend setup
//1. Create a form component
//2. Create a form
//3. Import the form in myspace
//4. Write the logic to show the form

//Part 3 - Plan frontend Redux-data
//1. Write an action to post story
//2. Write a thunk (dont forget clg!)
//3. Import the function in the component
//4. Write the logic in the reducer

## W4 Redux

Fetching data old skool --> (and with redux)
//1. Import Axios (actions)
//2. import useState and useEffect (component)
//3. write an async function (actions)
//4. MaKe a request with axios (actions)
//5. Put the response in the state (reducer)  
//6. Call the function in useEffect (component)

//1. Write a selector to get the posts
//2. Map over the posts

## W2 REST Api + Endpoints

### REST API `REpresentational State Transfer`

Clean URLs

- get users `baseUrl/users`
- get one user `baseUrl/users/:id`
- user emails `baseUrl/users/emails`
- lists for a user `baseUrl/users/:id/lists`

- get products `baseUrl/products`
- get one products `baseUrl/products/:id`
- lists for a products `baseUrl/products/:id/lists`

### Operations as HTTP methods

- POST `insert data, ex: post picture, sign up, post`
- GET `get data`
- PUT / PATCH `update existing data, ex: changing profile picture, fix comment`
- DELETE `delete data, ex: delete a picture, delete a comment`

### Appropriate use of HTTP status codes

- 200 - 299: Successful responses
- 300 - 399: Redirection messages
- 400 - 499: Client error responses
- 500 - 599: Server error responses

### CRUD (create, read, update and delete) = what you put in the return of the endpoint

- CREATE: post
- READ: get
- UPDATE: put/patch
- DELETE: delete

### Testing out endpoints

- Command line with httpie
- Client with Postman

## F4: Delete a story

// On My space, stories are displayed with a Delete Story
// button which lets them delete their own story

// The story is removed from the space without manually refreshing (CMD + R / CTRL + R)

/// PLAN:
// 0. Make an endpoint that deletes a story DONE.
// 1. Delete button on each story
// 2. When button is clicked => request => action (thunk)

## F5 Post a story

Part 1: Plan backend

1. Create an endpoint to post a story
2. Test our endpoint with httpie
3. Once the endpoint is working, add the authMiddleware
4. If all good move to frontend

Part 2: Plan frontend setup

1. Create a form component
2. Create the form
3. Import the form in mySpace
4. Write the logic to show the form

Part 3: Plan frontend redux-Data

1. Write an action to post a story
2. Write a thunk (dont forget to clg)
3. import the function in the component and dispatch
4. Write the logic in the reducer
