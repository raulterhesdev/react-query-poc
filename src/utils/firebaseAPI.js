import firebase from "./setup/firebase";

import {
	addUpdatesToFirebase,
	getNestedArrayFromFirebase,
	getArrayFromFirebase,
	getCurrentDate,
	getSingleValueFromFirebase,
} from "./firebaseUtils";

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
		return data;
	});
};

export const getUser = (uid) => {
	return getSingleValueFromFirebase(`/users/${uid}`);
};

export const getUsers = () => {
	return getArrayFromFirebase("/users");
};

export const createProject = (data) => {
	const { name, description, ownerUid, category } = data;
	const createdAt = getCurrentDate();
	const updatedAt = createdAt;
	const dataForProjects = { name, ownerUid, category };
	const dataForFullProject = {
		name,
		description,
		ownerUid,
		createdAt,
		updatedAt,
		category,
	};

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

export const updateProject = (data) => {
	const { name, description, ownerUid, category, id, createdAt } = data;
	const updatedDate = getCurrentDate();
	const projectsUpdateData = {
		id,
		name,
		ownerUid,
		category,
	};
	const projectUpdateData = {
		description,
		id,
		name,
		ownerUid,
		category,
		createdAt,
		updatedAt: updatedDate,
	};
	const updates = {};
	updates["/projects/" + id] = projectsUpdateData;
	updates["/project/" + id] = projectUpdateData;

	return addUpdatesToFirebase(updates).then(() => {
		return projectUpdateData;
	});
};

export const createTask = (data) => {
	const { creatorUid, description, name, projectId, userId, severity } = data;
	const state = "Initialized";
	const createdAt = getCurrentDate();
	const updatedAt = createdAt;
	const dataAllTasks = { name, userId, state, projectId, severity };
	const dataTask = {
		creatorUid,
		description,
		name,
		projectId,
		userId,
		severity,
		createdAt,
		updatedAt,
		state,
	};

	const newKey = firebase.database().ref().child("projects").push().key;

	dataAllTasks.id = dataTask.id = newKey;

	const updates = {};
	updates[`/tasks/${projectId}/${newKey}`] = dataAllTasks;
	updates[`/task/${newKey}`] = dataTask;

	return addUpdatesToFirebase(updates).then(() => projectId);
};

export const getProjectTasks = (projectId) => {
	return getArrayFromFirebase(`/tasks/${projectId}`);
};

export const getTasks = () => {
	return getNestedArrayFromFirebase("/tasks");
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
			return { projectId, taskId };
		})
		.catch((error) => Promise.reject(error));
};

export const updateTask = (data) => {
	const {
		id,
		creatorUid,
		description,
		name,
		projectId,
		userId,
		severity,
		createdAt,
		state,
		comments,
	} = data;
	const updatedAt = getCurrentDate();
	const dataAllTasks = { id, name, userId, state, projectId, severity };
	const dataTask = {
		id,
		creatorUid,
		description,
		name,
		projectId,
		userId,
		severity,
		state,
		createdAt,
		updatedAt,
		comments: comments || [],
	};

	const updates = {};
	updates[`/tasks/${projectId}/${id}`] = dataAllTasks;
	updates[`/task/${id}`] = dataTask;

	return addUpdatesToFirebase(updates).then(() => {
		return dataTask;
	});
};

export const createComment = (inputs) => {
	const { text, taskId, uid } = inputs;
	const createdAt = getCurrentDate();
	const data = { text, taskId, createdAt, uid };

	const newKey = firebase.database().ref().child("projects").push().key;

	data.id = newKey;

	const updates = {};
	updates[`/task/${taskId}/comments/${newKey}`] = data;

	return addUpdatesToFirebase(updates).then(() => taskId);
};

export const deleteComment = ({ taskId, commentId }) => {
	const updates = {};
	updates[`/task/${taskId}/comments/${commentId}`] = {};

	return addUpdatesToFirebase(updates)
		.then(() => {
			return { taskId };
		})
		.catch((error) => Promise.reject(error));
};
