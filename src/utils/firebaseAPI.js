import firebase from "./setup/firebase";

export const createUser = ({ uid, email }) => {
	const data = { uid, email, role: "TM" };

	const updates = {};
	updates["/users/" + uid] = data;

	firebase.database().ref().update(updates);
};

export const updateUser = ({ uid, email, role, name, age }) => {
	const data = { uid, email, role, name, age };

	const updates = {};
	updates["/users/" + uid] = data;

	firebase
		.database()
		.ref()
		.update(updates)
		.then(() => {
			return data.uid;
		})
		.catch((error) => Promise.reject(error));
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

	firebase
		.database()
		.ref()
		.update(updates)
		.catch((error) => Promise.reject(error));
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

export const getProject = (projectId) => {
	return firebase
		.database()
		.ref(`/project/${projectId}`)
		.once("value")
		.then((snapshot) => {
			return snapshot.val();
		})
		.catch((error) => Promise.reject(error));
};

export const deleteProject = (projectId) => {
	const updates = {};
	updates["/projects/" + projectId] = null;
	updates["/project/" + projectId] = null;

	firebase
		.database()
		.ref()
		.update(updates)
		.then(() => {
			return projectId;
		})
		.catch((error) => Promise.reject(error));
};

export const updateProject = ({
	description,
	id,
	name,
	numberOfTasks,
	ownerUid,
}) => {
	const projectsUpdateData = { description, id, name, ownerUid };
	const projectUpdateData = { description, id, name, ownerUid, numberOfTasks };
	const updates = {};
	updates["/projects/" + id] = projectsUpdateData;
	updates["/project/" + id] = projectUpdateData;

	firebase
		.database()
		.ref()
		.update(updates)
		.then(() => {
			return id;
		})
		.catch((error) => Promise.reject(error));
};
