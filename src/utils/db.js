export let users = [];

export function addUser(receivedUser) {
    const { data } = receivedUser;
    const { name, password } = JSON.parse(data);

    const index = users.findIndex(user => user.name === name);

    if (index === -1) {
        users.push({
            name: name,
            password: password,
        });

        return {
            type: "reg",
            data: JSON.stringify({
                name: name,
                index: users.length - 1,
                error: false,
                errorText: "",
            }),
            id: 0,
        };
    } else {
        // If the user exists, check if the passwords match
        if (users[index].password === password) {
            // If passwords match, return the user record
            return {
                type: "reg",
                data: JSON.stringify({
                    name: name,
                    index: index,
                    error: false,
                    errorText: "",
                }),
                id: 0,
            };
        } else {
            // If passwords do not match, return an error in the user record
            return {
                type: "reg",
                data: JSON.stringify({
                    name: name,
                    index: index,
                    error: true,
                    errorText: "Password is not correct.",
                }),
                id: 0,
            };
        }
    }
}