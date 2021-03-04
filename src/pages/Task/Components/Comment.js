import React from "react";

import { useAuth } from "../../../context/auth-context";
import { useDeleteComment } from "../../../hooks/mutations/taskMutations";

import QueryWrapper from "../../../components/QueryWrapper/QueryWrapper";
import Link from "../../../components/Link/Link";
import Button from "../../../components/Button/Button";

const Comment = ({ userData, comment, taskId }) => {
	const { user } = useAuth();
	const deleteCommentMutation = useDeleteComment();

	const submitDeleteComment = (commentId) => {
		deleteCommentMutation.mutate({ commentId, taskId });
	};

	return (
		<div className='flex w-96 justify-between items-center rounded shadow px-4 py-2'>
			<div>
				<p className='p-1 pb-0'>
					<Link to={`/user/${userData?.uid}`}>{userData?.name}</Link>
				</p>
				<p className='px-1 text-sm text-gray-400'>{comment.createdAt}</p>
				<p className='p-1'>{comment.text}</p>
			</div>
			{user.user.uid === comment.uid ? (
				<QueryWrapper
					isLoading={deleteCommentMutation.isLoading}
					errorText='There was an error deleting the task.'
					error={deleteCommentMutation.error}
				>
					<Button
						onClick={() => submitDeleteComment(comment.id)}
						size='small'
						type='danger'
						text='x'
					/>
				</QueryWrapper>
			) : null}
		</div>
	);
};

export default Comment;
