import firebase from "./setup/firebase";
import moment from "moment";

export const addUpdatesToFirebase = (updates) => {
	return firebase
		.database()
		.ref()
		.update(updates)
		.catch((error) => Promise.reject(error));
};

export const getSingleValueFromFirebase = (path) => {
	return firebase
		.database()
		.ref(path)
		.once("value")
		.then((snapshot) => {
			return snapshot.val();
		})
		.catch((error) => Promise.reject(error));
};

export const getArrayFromFirebase = (path) => {
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

export const getNestedArrayFromFirebase = (path) => {
	return firebase
		.database()
		.ref(path)
		.once("value")
		.then((snapshot) => {
			const data = [];
			for (const key in snapshot.val()) {
				if (snapshot.val().hasOwnProperty(key)) {
					const element = snapshot.val()[key];
					for (const elementKey in element) {
						if (element.hasOwnProperty(elementKey)) {
							const subElement = element[elementKey];
							data.push(subElement);
						}
					}
				}
			}
			return data;
		})
		.catch((error) => Promise.reject(error));
};

export const getCurrentDate = () => moment().format("MMMM Do YYYY");
