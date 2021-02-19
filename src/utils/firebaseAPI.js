import firebase from "./setup/firebase";

// Utilities
const addUpdatesToFirebase = (updates) => {
	return firebase
		.database()
		.ref()
		.update(updates)
		.catch((error) => Promise.reject(error));
};

const getSingleValueFromFirebase = (path) => {
	return firebase
		.database()
		.ref(path)
		.once("value")
		.then((snapshot) => {
			return snapshot.val();
		})
		.catch((error) => Promise.reject(error));
};

const getArrayFromFirebase = (path) => {
	return firebase
		.database()
		.ref(path)
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

// API interaction
export const createUser = ({ uid, email }) => {
	const data = { uid, email, role: "TM" };

	const updates = {};
	updates["/users/" + uid] = data;

	addUpdatesToFirebase(updates);
};

export const updateUser = ({ uid, email, role, name, age }) => {
	const data = { uid, email, role, name, age };

	const updates = {};
	updates["/users/" + uid] = data;

	addUpdatesToFirebase(updates).then(() => {
		return data.uid;
	});
};

export const getUser = (uid) => {
	return getSingleValueFromFirebase(`/users/${uid}`);
};

export const getUsers = () => {
	return getArrayFromFirebase("/users");
};

export const createProject = (data) => {
	const dataForProjects = { ...data };
	const dataForFullProject = { ...data, tasks: {} };

	const newKey = firebase.database().ref().child("projects").push().key;

	dataForProjects.id = dataForFullProject.id = newKey;

	const updates = {};
	updates["/projects/" + newKey] = dataForProjects;
	updates["/project/" + newKey] = dataForFullProject;

	addUpdatesToFirebase(updates);
};

export const getProjects = () => {
	return getArrayFromFirebase("/projects");
};

export const getProject = (projectId) => {
	return getSingleValueFromFirebase(`/project/${projectId}`);
};

export const deleteProject = (projectId) => {
	const updates = {};
	updates["/projects/" + projectId] = null;
	updates["/project/" + projectId] = null;

	addUpdatesToFirebase(updates)
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

	addUpdatesToFirebase(updates).then(() => {
		return id;
	});
};

export const createTask = (data) => {
	const allData = { ...data, state: "Initialized" };

	const newKey = firebase.database().ref().child("projects").push().key;

	allData.id = newKey;

	const updates = {};
	updates[`/tasks/${allData.projectId}/${newKey}`] = allData;

	addUpdatesToFirebase(updates);
};

export const getProjectTasks = (projectId) => {
	return getArrayFromFirebase(`/tasks/${projectId}`);
};
