// 1. Simulate Data Fetching Using Promises
// Define 3 asynchronous functions to simulate data fetching for User Profiles, Posts, and Comments
// that returns a promise that resolves after a delay (simulating a time-sensitive operation, e.g., fetching data from a remote server)

// Define an async function that simulates fetching Users with a 2-sec delay
function fetchUsers() {

    // Create an array of 5 user objects
    let users = Array.from({length: 5}, (v, i) => ({
        userId: i + 1,
        userCreatedAt: new Date().toISOString(),
        userName: `User Name-${i + 1}`,
        userEmail: `user-${i + 1}@email.com`
    }));

    // Return a promise that RESOLVES with the "users" array after a 2-sec delay
    // and FAILS randomly with an error message 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) {
                reject(new Error("Failed to fetch users."));
            } else resolve(users);
        }, 2000);
    });
//     return new Promise(resolve => {
//         setTimeout(() => resolve(users), 2000);
//     }); 
}

// Define an async function that simulates fetching Posts with a 4-sec delay
function fetchPosts(userId) {

    // Create an array of 8 post objects
    let posts = Array.from({length: 8}, (v, i) => ({
        postId: i + 1,
        userId: (i % 5) + 1, // Simulates post ownership by userId across 5 simulated users
        postCreatedAt: new Date().toISOString(),
        postContent: `Post Content-${i + 1}`
    }));

    // Return a promise that RESOLVES with the "posts" array after a 4-sec delay
    // and FAILS randomly with an error message
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject(new Error("Failed to fetch posts."));
            } else resolve(posts.filter(post => post.userId === userId));
        }, 4000);
    }); 
//     return new Promise(resolve => {
//         setTimeout(() => resolve(posts.filter(post => post.userId === userId)), 4000);
//     }); 
}

// Define an async function that simulates fetching Comments with a 6-sec delay
function fetchComments(postIds) {

    // Create an array of 14 comment objects
    let comments = Array.from({length: 14}, (v, i) => ({
        commentId: i + 1,
        postId: (i % 8) + 1, // Simulates comment ownership by postId across 8 simulated posts
        commentCreatedAt: new Date().toISOString(),
        commentContent: `Comment Content-${i + 1}`
    }));

    // Return a promise that RESOLVES with the "comments" array after a 6-sec delay
    // and FAILS randomly with an error message
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) {
                reject(new Error("Failed to fetch comments."));
            } else resolve(comments.filter(comment => postIds.includes(comment.postId)));
        }, 6000);
    }); 
    // return new Promise(resolve => {
    //     setTimeout(() => resolve(comments), 6000);
    // }); 
}

//-----------------------------------------------------------------------------------------------------------------------------------//

// 2.a. Implement Sequential Data Fetching
// Define and call a function observing response time and behaviour
function fetchDataInSequence() {
    console.time("Timer for Sequential Data Fetching"); // Timer starts
    console.log("Sequential Data Fetching");

    fetchUsers().then(users => {
        console.log("Users fetched in sequence (Delay: 2 secs): ", users);
        return fetchPosts();
    }).then(posts => {
        console.log("Posts fetched in sequence (Delay: 2 + 4 = 6 secs): ", posts);
        return fetchComments();
    }).then(comments => {
        console.log("Comments fetched in sequence (Delay: 2 + 4 + 6 = 12): ", comments);
    }).catch(error => {
        console.error("Sequential Data Fetching Error: ", error.message);
    }).finally(() => {
        console.timeEnd("Timer for Sequential Data Fetching"); // Timer ends after ~12 secs
    });
}

fetchDataInSequence();


// 2.b. Implement Parallel Data Fetching
// Define and call a function observing response time and behaviour
function fetchDataInParallel() {
    console.time("Timer for Parallel Data Fetching"); // Timer starts
    console.log("Parallel Data Fetching");

    fetchUsers().then(users => {
        console.log("Users fetched in parallel (Delay: 2 secs): ", users);
    }).catch(error => {
        console.error("Parallel Data Fetching Error for Users: ", error.message);
    });

    fetchPosts().then(posts => {
        console.log("Posts fetched in parallel (Delay: 4 secs): ", posts);
    }).catch(error => {
        console.error("Parallel Data Fetching Error for Posts: ", error.message);
    });

    fetchComments().then(comments => {
        console.log("Comments fetched in parallel (Delay: 6 secs): ", comments);
    }).catch(error => {
        console.error("Parallel Data Fetching Error for Comments: ", error.message);
    });

    console.timeEnd("Timer for Parallel Data Fetching"); // Timer ends in the async operations order
}

fetchDataInParallel();

//-----------------------------------------------------------------------------------------------------------------------------------//

// 3.a. Refactor with Async/Await (and Try...Catch) to Implement Sequential Data Fetching
async function fetchDataInSequenceAsync() {
    console.time("Timer for Sequential Data Fetching (Refactored with Async/Await)"); // Timer starts 
    console.log("Sequential Data Fetching (Refactored with Async/Await)");

    try {
        let users = await fetchUsers();
        console.log("Users fetched in sequence (Refactored with Async/Await) (Delay: 2 secs): ", users);

        let posts = await fetchPosts();
        console.log("Posts fetched in sequence (Refactored with Async/Await) (Delay: 2 + 4 = 6 secs): ", posts);

        let comments = await fetchComments();
        console.log("Comments fetched in sequence (Refactored with Async/Await) (Delay: 2 + 4 + 6 = 12 secs): ", comments);
    } catch (error) {
        console.error("Sequential Data Fetching Error (Refactored with Async/Await): ", error.message);
    } finally {
        console.timeEnd("Timer for Sequential Data Fetching (Refactored with Async/Await)"); // Timer ends after ~12 secs
    };
}

fetchDataInSequenceAsync();


// 3.b. Refactor with Async/Await (and Try...Catch) to Implement Parallel Data Fetching
async function fetchDataInParallelAsync() {
    console.time("Timer for Parallel Data Fetching (Refactored with Async/Await)"); // Timer starts 
    console.log("Parallel Data Fetching (Refactored with Async/Await)");

    (async () => {
        try {
            let users = await fetchUsers();
            console.log("Users fetched in parallel (Refactored with Async/Await) (Delay: 2 secs): ", users);
        } catch (error) {
            console.error("Parallel Data Fetching Error for Users (Refactored with Async/Await): ", error.message);
        }
    })();

    (async () => {
        try {
            let posts = await fetchPosts();
            console.log("Posts fetched in parallel (Refactored with Async/Await) (Delay: 4 secs): ", posts);
        } catch (error) {
            console.error("Parallel Data Fetching Error for Posts (Refactored with Async/Await): ", error.message);
        }
    })();

    (async () => {
        try {
            let comments = await fetchComments();
            console.log("Comments fetched in parallel (Refactored with Async/Await) (Delay: 6 secs): ", comments);
        } catch (error) {
            console.error("Parallel Data Fetching Error for Comments (Refactored with Async/Await): ", error.message);
        };
    })();

    console.timeEnd("Timer for Parallel Data Fetching (Refactored with Async/Await)"); // Timer ends in the async operations order
}

fetchDataInParallelAsync();

//-----------------------------------------------------------------------------------------------------------------------------------//

// 4. Chaining Async Functions
async function getUsersContent() {
    console.time("Timer for Sequential Data Fetching (getUsersContent)"); // Timer starts 
    console.log("Sequential Data Fetching (getUsersContent)");

    // Fetch and log all the data in sequence, combining the results at the end
    try {
        // Fetch all user profiles 
        let users = await fetchUsers();
        console.log("User profiles retrieved in sequence (getUsersContent): ", users); // Delay: 2 secs
        
        // Trigger all users data fetch in parallel to avoid extremely slow performance 
        let usersContent = await Promise.all(users.map(async (user) => {
            console.log(`Posts being retrieved in sequence for userId-${user.userId}... (getUsersContent): `);
            
            // Fetch and log each user's data in sequence
            // Fetch and log all posts of each user
            let posts = await fetchPosts(user.userId);
            console.log(`Posts retrieved in sequence for userId-${user.userId} (getUsersContent): `, posts); // Delay: 2 + 4 = 6 secs
            
            // Fetch and log all comments for the posts of each user
            let postIds = posts.map(post => post.postId);
            let comments = postIds.length > 0 ? await fetchComments(postIds) : [];
            console.log(`Comments retrieved in sequence for the posts of userId-${user.userId} (getUsersContent): `, comments); // Delay: 2 + 4 + 6 = 12 secs
            
            // Group comments by postId
            let groupedCommentsByPost = {};
            for (let comment of comments) {
                !groupedCommentsByPost[comment.postId]
                    ? groupedCommentsByPost[comment.postId] = []
                    : groupedCommentsByPost[comment.postId].push(comment);
            }
            
            // Add the grouped comments to their respective posts based on postId
            let postsWithComments = posts.map(post => ({
                ...post,
                comments: groupedCommentsByPost[post.postId] || []
            }));
            // console.log(`Comments grouped by postId and added to their respective posts for userId-${user.userId} (getUsersContent): `, postsWithComments);

            // Combine and log the results of each user's content
            let combinedResults = {
                user,
                posts: postsWithComments
            };
            console.log("Users content with combined results (getUsersContent): ", combinedResults);

            // Return the combined results
            return combinedResults;
        }));

        return usersContent;
    } catch (error) {
        console.error("Sequential Data Fetching Error (getUsersContent: ", error.message);
    } finally {
        console.timeEnd("Timer for Sequential Data Fetching (getUsersContent)"); // Timer ends after ~12 secs
        };
    }

getUsersContent();

//-----------------------------------------------------------------------------------------------------------------------------------//