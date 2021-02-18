import firebase from "./setup/firebase";

export const createUser = ({ uid, email }) => {
	const data = { uid, email, role: "TM" };

	const updates = {};
	updates["/users/" + uid] = data;

	firebase.database().ref().update(updates);

	return data;
};

export const updateUser = ({ uid, email, role, name, age }) => {
	const data = { uid, email, role, name, age };

	const updates = {};
	updates["/users/" + uid] = data;

	firebase.database().ref().update(updates);

	return data;
};

export const getUser = (uid) => {
	return firebase
		.database()
		.ref(`/users/${uid}`)
		.once("value")
		.then((snapshot) => {
			return snapshot.val();
		})
		.catch((error) => Promise.reject(error));
};
