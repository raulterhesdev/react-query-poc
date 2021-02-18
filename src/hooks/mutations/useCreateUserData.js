import { useMutation } from "react-query";
import { createUser } from "../../utils/firebaseAPI";

export const useCreateUserData = () => {
	return useMutation(createUser);
};
