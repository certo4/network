document.addEventListener('DOMContentLoaded', function() {
    
    // Selecting all edit buttons
    document.querySelectorAll('.edit').forEach(editButton => {

        // Adding click behavior to edit buttons
        editButton.addEventListener('click', function() {

            // Hide edit button while editing textarea
            this.style.display = 'none';
            
            // Getting ID from data attribute
            const postId = editButton.dataset.post;

            // Getting post content element
            const contentElement = document.querySelector(`.content[data-post="${postId}"]`);
            // Getting original post content
            const content = contentElement.innerHTML;

            // Replace inner HTML with textarea and submit button
            contentElement.innerHTML = `<textarea data-post="${postId}">${content}</textarea><button onclick="editPost(${postId})">Submit</button>`;
            
        });
    });

    // Selecting all like buttons
    document.querySelectorAll('.like').forEach(likeButton => {
        
        // Getting postId and current user from data attribute
        const postId = likeButton.dataset.post;
        const currentUser = likeButton.dataset.user;
        
        // Display like button and get liked status of current user
        const isLiked = displayLikeButton(likeButton, postId);

        // Adding click behavior to like buttons
        likeButton.addEventListener('click', function() {

            clickLikeButton(postId, isLiked);

        });
    });
});

function clickLikeButton(postId, isLiked) {
    
    let counterChange = '';
    if (isLiked) {
        counterChange = 'decrease'
    } else {
        counterChange = 'increase'
    }

    // Updating counter
    fetch(`/counter/${postId}`, {
        method: 'PUT',
        headers: {
            'X-CSRFToken': CSRF
        },
        body: JSON.stringify({
            counter_change: counterChange,
        })
    })

    // Fetch new like count from db and display it
    fetch(`/counter/${postId}`)
    .then(response => response.json())
    .then(post => {

        // Getting post content element
        const counterElement = document.querySelector(`.like_counter[data-post="${postId}"]`);
        const likeButton = document.querySelector(`.like[data-post="${postId}"]`);
        
        // Display new content
        counterElement.innerHTML = post.like_counter;
        
        // Update like button appearance
        void displayLikeButton(likeButton, postId);

    });
}

// Function to change the label of the like button
function displayLikeButton(likeButton, postId) {

    // Flushing the default values
    likeButton.innerHTML = '';

    // Fetch like state from post on DB
    fetch(`/liked/${postId}`)
    .then(response => response.json())
    .then(post => {

        // Change button label and update global LIKED status
        if (post.liked) {

            // If post is liked, display unlike
            likeButton.innerHTML = 'Unlike';
            return true;

        } else {
            
            // Else display like
            likeButton.innerHTML = 'Like';
            return false;

        }

    });
}

// Function to update the post content in DB
// with the new information from the textarea
function editPost(postId) {
    
    // Getting new content
    const new_post = document.querySelector(`textarea[data-post="${postId}"]`).value;

    // Updating new post content
    fetch(`/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'X-CSRFToken': CSRF
        },
        body: JSON.stringify({
            content: new_post
        })
    })

    // Fetch post details from db and display them
    fetch(`/posts/${postId}`)
    .then(response => response.json())
    .then(post => {

        // Getting post content element
        const contentElement = document.querySelector(`.content[data-post="${postId}"]`);
        
        // Display new content
        contentElement.innerHTML = post.content;
        
        // Show edit button again
        editButton = document.querySelector(`.edit[data-post="${postId}"]`);
        editButton.style.display = 'block';

    });

    return false;
}