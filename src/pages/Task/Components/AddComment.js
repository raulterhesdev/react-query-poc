import React, { useState } from "react";
import { useCreateComment } from "../../../hooks/mutations/useCreateComment";

const AddComment = ({ id }) => {
	const [comment, setComment] = useState("");
	const createCommentMutation = useCreateComment();

	const submitComment = () => {
		createCommentMutation.mutate({ text: comment, taskId: id });
	};
	return (
		<div>
			<input
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder='Your Comment...'
			/>
			<button onClick={submitComment}>Submit</button>
		</div>
	);
};

export default AddComment;
