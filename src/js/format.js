// Refactor to ES6

// Users
export function usersLoop(users) {
    // possibly split up for Private and Public versions or per component view
    return users.map((user) => ({
        key: user.key,
        id: user.id,
        nameFirst: user.nameFirst,
        nameLast: user.nameLast,
        avatar: user.avatar,
    }));
}

export function usersSelect(users) {
    return users.map((user) => ({
        value: user.id,
        label: `${user.nameFirst} ${user.nameLast}`,
    }));
}

// Posts
export function postsLoop(posts) {
    // possibly split up for Private and Public versions or per component view
    return posts.map((post) => ({
        key: post.key,
        id: post.id,
        user: post.user,
        title: post.title,
        state: post.state,
        city: post.city,
    }));
}
