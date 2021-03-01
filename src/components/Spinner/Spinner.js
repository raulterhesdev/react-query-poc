import React from "react";

const Spinner = ({ fullPage }) => {
	return (
		<div
			className={`${
				fullPage
					? "absolute top-0 left-0 flex h-screen w-screen justify-center items-center z-50 bg-black bg-opacity-60"
					: null
			}`}
		>
			<div className='h-20 w-20 rounded-full border-t-2 border-yellow-500 animate-spin'>
				<div className='h-16 w-16 rounded-full border-t-2 border-yellow-500 animate-spin'>
					<div className='h-12 w-12 rounded-full border-t-2 border-yellow-500 animate-spin'>
						<div className='h-8 w-8 rounded-full border-t-2 border-yellow-500 animate-spin'>
							<div className='h-4 w-4 rounded-full border-t-2 border-yellow-500 animate-spin'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spinner;
