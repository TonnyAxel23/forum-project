document.addEventListener('DOMContentLoaded', function() {
    // Load threads on homepage
    if (document.querySelector('.list-group')) {
        loadThreads();
    }
    
    // Load categories
    if (document.querySelector('.card-body ul')) {
        loadCategories();
    }
    
    // Load tags
    if (document.querySelector('.d-flex.flex-wrap.gap-2')) {
        loadTags();
    }
    
    // Load thread details if on thread page
    if (document.querySelector('.thread-detail')) {
        loadThreadDetails();
        loadReplies();
    }
    
    // Handle reply form submission
    const replyForm = document.getElementById('replyForm');
    if (replyForm) {
        replyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const content = document.getElementById('replyContent').value;
            // In a real implementation, you would send this to the server
            console.log('Reply submitted:', content);
            alert('Reply submitted! (In a real app, this would be saved)');
            document.getElementById('replyContent').value = '';
        });
    }
});

function loadThreads() {
    // Simulate loading threads from server
    const threadsContainer = document.querySelector('.list-group');
    
    const sampleThreads = [
        {
            id: 1,
            title: 'How to implement authentication in PHP?',
            author: 'phpdev',
            date: '2023-05-15',
            replies: 8,
            category: 'Tech',
            excerpt: 'I need help setting up secure authentication for my web app...'
        },
        {
            id: 2,
            title: 'Best practices for database design',
            author: 'dbexpert',
            date: '2023-05-14',
            replies: 12,
            category: 'Tech',
            excerpt: 'What are some key principles to follow when designing a database schema?'
        },
        {
            id: 3,
            title: 'Recommendations for JavaScript frameworks',
            author: 'jsfan',
            date: '2023-05-13',
            replies: 15,
            category: 'Tech',
            excerpt: 'Trying to decide between React, Vue, and Angular for my next project...'
        }
    ];
    
    sampleThreads.forEach(thread => {
        const threadElement = document.createElement('a');
        threadElement.href = `threads/thread-detail.html?id=${thread.id}`;
        threadElement.className = 'list-group-item list-group-item-action thread-card';
        threadElement.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${thread.title}</h5>
                <small class="text-muted">${thread.replies} replies</small>
            </div>
            <div class="d-flex w-100 justify-content-between align-items-end">
                <div>
                    <p class="mb-1">${thread.excerpt}</p>
                    <small class="text-muted">Posted by ${thread.author} on ${thread.date}</small>
                </div>
                <span class="badge bg-primary">${thread.category}</span>
            </div>
        `;
        threadsContainer.appendChild(threadElement);
    });
}

function loadCategories() {
    const categoriesContainer = document.querySelector('.card-body ul');
    
    const sampleCategories = [
        { id: 1, name: 'Tech', count: 42 },
        { id: 2, name: 'Lifestyle', count: 18 },
        { id: 3, name: 'Study', count: 25 },
        { id: 4, name: 'General', count: 15 }
    ];
    
    sampleCategories.forEach(category => {
        const categoryElement = document.createElement('li');
        categoryElement.className = 'list-group-item d-flex justify-content-between align-items-center';
        categoryElement.innerHTML = `
            <a href="threads/thread-list.html?category=${category.id}">${category.name}</a>
            <span class="badge bg-primary rounded-pill">${category.count}</span>
        `;
        categoriesContainer.appendChild(categoryElement);
    });
}

function loadTags() {
    const tagsContainer = document.querySelector('.d-flex.flex-wrap.gap-2');
    
    const sampleTags = [
        { id: 1, name: 'PHP', count: 12 },
        { id: 2, name: 'JavaScript', count: 20 },
        { id: 3, name: 'Database', count: 8 },
        { id: 4, name: 'Security', count: 5 },
        { id: 5, name: 'Web Development', count: 15 }
    ];
    
    sampleTags.forEach(tag => {
        const tagElement = document.createElement('a');
        tagElement.href = `threads/thread-list.html?tag=${tag.id}`;
        tagElement.className = 'badge bg-secondary tag';
        tagElement.textContent = `${tag.name} (${tag.count})`;
        tagsContainer.appendChild(tagElement);
    });
}

function loadThreadDetails() {
    // In a real implementation, you would fetch this from the server based on URL parameter
    const thread = {
        id: 1,
        title: 'How to implement authentication in PHP?',
        content: 'I need help setting up secure authentication for my web app. I want to use PHP sessions but I\'m not sure about the best practices for security. Should I use prepared statements for database queries? How should I store passwords? Any advice would be appreciated!',
        author: 'phpdev',
        date: '2023-05-15',
        category: 'Tech',
        tags: ['PHP', 'Security', 'Authentication']
    };
    
    document.querySelector('h4').textContent = thread.title;
    document.querySelector('.card-text').textContent = thread.content;
    document.querySelector('.fw-bold').textContent = thread.author;
    document.querySelector('.text-muted').textContent = `Posted on ${thread.date}`;
    document.querySelector('.badge.bg-primary').textContent = thread.category;
    
    // Add tags if needed
}

function loadReplies() {
    const repliesContainer = document.querySelector('.list-group');
    
    const sampleReplies = [
        {
            id: 1,
            content: 'You should definitely use password_hash() and password_verify() functions for password storage. Never store plain text passwords!',
            author: 'securityguru',
            date: '2023-05-15',
            likes: 5
        },
        {
            id: 2,
            content: 'I recommend using prepared statements with PDO to prevent SQL injection. It\'s much safer than using mysqli or raw queries.',
            author: 'dbmaster',
            date: '2023-05-16',
            likes: 3
        },
        {
            id: 3,
            content: 'Consider implementing CSRF tokens for your forms as well to prevent cross-site request forgery attacks.',
            author: 'websecurity',
            date: '2023-05-17',
            likes: 2
        }
    ];
    
    sampleReplies.forEach(reply => {
        const replyElement = document.createElement('div');
        replyElement.className = 'list-group-item reply';
        replyElement.innerHTML = `
            <div class="d-flex mb-2">
                <div class="flex-shrink-0">
                    <img src="https://via.placeholder.com/50" alt="User avatar" class="rounded-circle avatar">
                </div>
                <div class="ms-3">
                    <div class="fw-bold">${reply.author}</div>
                    <small class="text-muted">Posted on ${reply.date}</small>
                </div>
            </div>
            <p>${reply.content}</p>
            <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-outline-primary">Like (${reply.likes})</button>
                <button class="btn btn-sm btn-outline-danger">Report</button>
            </div>
        `;
        repliesContainer.appendChild(replyElement);
    });
}

// Search functionality
const searchForm = document.querySelector('.d-flex');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input[type="search"]');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // In a real implementation, you would send this to the server
            console.log('Searching for:', searchTerm);
            alert(`In a real app, this would search for: ${searchTerm}`);
            searchInput.value = '';
        }
    });
}

// Load profile data if on profile page
if (document.getElementById('profileTabs')) {
    loadProfileData();
}

function loadProfileData() {
    // Simulate loading user threads
    const userThreads = [
        {
            id: 1,
            title: 'How to implement authentication in PHP?',
            date: '2023-05-15',
            replies: 8,
            category: 'Tech'
        },
        {
            id: 2,
            title: 'PHP best practices for beginners',
            date: '2023-04-10',
            replies: 5,
            category: 'Tech'
        }
    ];
    
    const threadsContainer = document.querySelector('#threads .list-group');
    userThreads.forEach(thread => {
        const threadElement = document.createElement('a');
        threadElement.href = `threads/thread-detail.html?id=${thread.id}`;
        threadElement.className = 'list-group-item list-group-item-action';
        threadElement.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${thread.title}</h6>
                <small class="text-muted">${thread.replies} replies</small>
            </div>
            <div class="d-flex w-100 justify-content-between">
                <small>Posted on ${thread.date}</small>
                <span class="badge bg-primary">${thread.category}</span>
            </div>
        `;
        threadsContainer.appendChild(threadElement);
    });
    
    // Simulate loading user replies
    const userReplies = [
        {
            id: 1,
            content: 'You should use password_hash() for secure password storage.',
            threadTitle: 'PHP Authentication Help',
            date: '2023-05-16'
        },
        {
            id: 2,
            content: 'PDO is definitely the way to go for database access.',
            threadTitle: 'Database Connection Methods',
            date: '2023-05-10'
        }
    ];
    
    const repliesContainer = document.querySelector('#replies .list-group');
    userReplies.forEach(reply => {
        const replyElement = document.createElement('div');
        replyElement.className = 'list-group-item';
        replyElement.innerHTML = `
            <p class="mb-1">${reply.content}</p>
            <div class="d-flex w-100 justify-content-between">
                <small>In reply to: <a href="threads/thread-detail.html?id=1">${reply.threadTitle}</a></small>
                <small class="text-muted">${reply.date}</small>
            </div>
        `;
        repliesContainer.appendChild(replyElement);
    });
}