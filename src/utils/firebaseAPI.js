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

export const createProject = (data) => {
	const dataForProjects = { ...data };
	const dataForFullProject = { ...data, numberOfTasks: 0 };

	const newKey = firebase.database().ref().child("projects").push().key;

	dataForProjects.id = dataForFullProject.id = newKey;

	const updates = {};
	updates["/projects/" + newKey] = dataForProjects;
	updates["/project/" + newKey] = dataForFullProject;

	const test = firebase.database().ref().update(updates);
	console.log(test);

	return dataForProjects;
};

export const getProjects = () => {
	return firebase
		.database()
		.ref("/projects")
		.once("value")
		.then((snapshot) => {
			const data = [];
			for (const key in snapshot.val()) {
				if (snapshot.val().hasOwnProperty(key)) {
					const element = snapshot.val()[key];
					data.push(element);
				}
			}
			return data;
		})
		.catch((error) => Promise.reject(error));
};
