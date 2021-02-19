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

	return addUpdatesToFirebase(updates);
};

export const updateUser = ({ uid, email, role, name, age }) => {
	const data = { uid, email, role, name, age };

	const updates = {};
	updates["/users/" + uid] = data;

	return addUpdatesToFirebase(updates).then(() => {
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

	return addUpdatesToFirebase(updates);
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
	updates["/tasks/" + projectId] = null;

	return addUpdatesToFirebase(updates)
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

	return addUpdatesToFirebase(updates).then(() => {
		return id;
	});
};

export const createTask = (data) => {
	const allData = { ...data, state: "Initialized" };

	const newKey = firebase.database().ref().child("projects").push().key;

	allData.id = newKey;

	const updates = {};
	updates[`/tasks/${allData.projectId}/${newKey}`] = allData;
	updates[`/task/${newKey}`] = allData;

	return addUpdatesToFirebase(updates).then(() => allData.projectId);
};

export const getProjectTasks = (projectId) => {
	return getArrayFromFirebase(`/tasks/${projectId}`);
};

export const getTask = (taskId) => {
	return getSingleValueFromFirebase(`/task/${taskId}`);
};

export const deleteTask = ({ projectId, taskId }) => {
	const updates = {};
	updates[`/tasks/${projectId}/${taskId}`] = {};
	updates[`/task/${taskId}`] = {};

	return addUpdatesToFirebase(updates)
		.then(() => {
			return projectId;
		})
		.catch((error) => Promise.reject(error));
};

export const updateTask = (data) => {
	const updates = {};
	updates[`/tasks/${data.projectId}/${data.id}`] = data;
	updates[`/task/${data.id}`] = data;

	return addUpdatesToFirebase(updates).then(() => {
		return data.projectId;
	});
};
