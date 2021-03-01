import React, { useState } from "react";
import { useCreateComment } from "../../../hooks/mutations/taskMutations";
import Textarea from "../../../components/Textarea/Textarea";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";

const AddComment = ({ id }) => {
	const [comment, setComment] = useState("");
	const createCommentMutation = useCreateComment();
	const [modalOpen, setModalOpen] = useState(false);

	const submitComment = () => {
		createCommentMutation.mutate({ text: comment, taskId: id });
	};
	return (
		<>
			<Button text='Add Comment' onClick={() => setModalOpen(true)} />
			<Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
				<h2 className='p-2  text-yellow-900 text-center'>Add a comment</h2>
				<Textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder='Your comment...'
				/>
				<div className='my-2 flex justify-end'>
					<Button onClick={submitComment} size='small' text='Add Comment' />
				</div>
			</Modal>
		</>
	);
};

export default AddComment;
