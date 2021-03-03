import React, { useState, useEffect } from "react";

import { useCreateComment } from "../../../hooks/mutations/taskMutations";

import Textarea from "../../../components/Textarea/Textarea";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import QueryWrapper from "../../../components/QueryWrapper/QueryWrapper";

const AddComment = ({ id }) => {
	const [comment, setComment] = useState("");
	const createCommentMutation = useCreateComment();
	const [modalOpen, setModalOpen] = useState(false);

	const submitComment = () => {
		createCommentMutation.mutate({ text: comment, taskId: id });
	};
	useEffect(() => {
		//after the mutation finishes wait 200 ms and then close the modal
		if (createCommentMutation.isSuccess)
			setTimeout(() => setModalOpen(false), 200);
	}, [createCommentMutation.isSuccess]);

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
					<QueryWrapper
						isLoading={createCommentMutation.isLoading}
						error={createCommentMutation.error}
						errorText='There was an error adding the comment.'
					>
						<Button onClick={submitComment} size='small' text='Add Comment' />
					</QueryWrapper>
				</div>
			</Modal>
		</>
	);
};

export default AddComment;
