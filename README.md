# Rise Test

To run the app, run the following in your terminal

ts-node src/index.ts

it runs in port 3000

#Requirements

Node 20
NPM
Postgres (version 13 or above)

# Steps

cd into whatever directory you want work from.
Run https://github.com/elquna/risevest.git then cd into the repo.
After cloning the project, run cp .env .env.example on your terminal to create a new .env file from the .env.example.
Run npm install to install all the dependencies.
npx prisma generate   
Run ts-node src/index.ts the project in development mode.

# Test URL

The app is deployed in a remote test server with BASE URL  https://mocktest-4lvw.onrender.com

# Postnam documentation

The postman documentation can be found here https://documenter.getpostman.com/view/12000186/U16gP6v3


# Part of the test involved a query to be optimised


# Query with performance issue

SELECT users.id, users.name, posts.title, comments.content
FROM users
LEFT JOIN posts ON users.id = posts.userId
LEFT JOIN comments ON posts.id = comments.postId
WHERE comments.createdAt = (SELECT MAX(createdAt) FROM comments WHERE postId = posts.id)
ORDER BY (SELECT COUNT(posts.id) FROM posts WHERE posts.userId = users.id) DESC
LIMIT 3;





# Optimised query

SELECT users.id, users.name, posts.title, latest_comment.content
FROM users
JOIN posts ON users.id = posts.userId
LEFT JOIN (
SELECT postId, content
FROM comments
WHERE (postId, createdAt) IN (
    SELECT postId, MAX(createdAt)
    FROM comments
    GROUP BY postId
)
) AS latest_comment ON posts.id = latest_comment.postId
GROUP BY users.id, posts.id, latest_comment.content
ORDER BY COUNT(posts.id) DESC
LIMIT 3
