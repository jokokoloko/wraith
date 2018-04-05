// Users
export const usersLoop = (users) =>
    users.map((user) => ({
        key: user.key,
        id: user.id,
        nameFirst: user.nameFirst,
        nameLast: user.nameLast,
        avatar: user.avatar,
    }));

export const usersSelect = (users) =>
    users.map((user) => ({
        value: user.id,
        label: `${user.nameFirst} ${user.nameLast}`,
    }));

// Posts
export const postsLoop = (posts) =>
    posts.map((post) => ({
        key: post.key,
        id: post.id,
        user: post.user,
        title: post.title,
        state: post.state,
        city: post.city,
    }));
