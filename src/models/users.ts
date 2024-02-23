interface User {
  name: string;
  password: string;
  index: number;
}

interface PublicUser extends Omit<User, 'password'> { }

export interface ReceivedUser {
  type: string;
  data: string;
  id: number;
}

export let users: User[] = [];

export function getUserByID(id: number | undefined): PublicUser {
  let foundUser = users.find((u) => u.index === id);
  return { name: foundUser?.name || "", index: foundUser?.index || 1 }
}

export function addUser(receivedUser: ReceivedUser, id: number | undefined): object {
  const { data } = receivedUser;
  const { name, password } = JSON.parse(data);

  const index = users.findIndex(user => user.name === name);

  if (index === -1) {
    users.push({
      name: name,
      password: password,
      index: id || 1,
    });

    return {
      type: "reg",
      data: JSON.stringify({
        name: name,
        index: id || 1,
        error: false,
        errorText: "",
      }),
      id: 0,
    };
  } else {
    // If the user exists, check if the passwords match
    if (users[index].password === password) {
      // If passwords match, return the user record
      users[index].index = id || 1;
      
      return {
        type: "reg",
        data: JSON.stringify({
          name: name,
          index: id || 1,
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