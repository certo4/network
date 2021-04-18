document.addEventListener('DOMContentLoaded', function() {
    
    // Selecting all edit buttons
    document.querySelectorAll('.edit').forEach(editButton => {

        // Adding event listeners to all edit buttons
        editButton.addEventListener('click', function() {

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
});


// Function that will update the nex post content in DB
function editPost(postId) {
    
    // Getting new content
    const new_post = document.querySelector(`textarea[data-post="${postId}"]`).value;

    // Updating new post content
    fetch(`/posts/${postId}`, {
        method: 'PUT',
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