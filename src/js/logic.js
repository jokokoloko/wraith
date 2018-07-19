export const UserName = (user, empty) =>
    user.name && user.name.first && user.name.last
        ? `${user.name.first} ${user.name.last}`
        : user.name && user.name.first
            ? `${user.name.first}`
            : user.name && user.name.last
                ? `${user.name.last}`
                : empty;

export const UserNameHandle = (user, empty) =>
    user.name && user.name.first && user.name.last
        ? `${user.name.first} ${user.name.last}`
        : user.name && user.name.first
            ? `${user.name.first}`
            : user.name && user.name.last
                ? `${user.name.last}`
                : user.handle
                    ? user.handle
                    : empty;
