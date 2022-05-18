import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlight from '../SyntaxHighlight';
import { timeConvert } from '../../Utils/TimeConvert';
import { useSelector } from 'react-redux';
import CommentParent from './CommentParent';
function MainPost({ post , commentList}) {

	const [commentParents , setCommentParent] = useState([]);
	const [commentChilds , setCommentChilds] = useState([]);
	const user  = useSelector(state => state.auth.current_user);

	useEffect(() => {
		let parentCmtList = commentList.filter(cmt => !cmt.replyToId);
		let childCmtList = commentList.filter(cmt => cmt.replyToId);
		setCommentParent(parentCmtList);
		setCommentChilds(childCmtList);
	}, [commentList])


	let EmptyCommentLayout = () => (

		<div className='border-t-2 border-gray-100'>
					<div className='h-full py-8 md:px-12 text-center'>
						<span className='tracking-widest text-gray-600'>This post have no comment yet !</span>
					</div>
				</div>
	)

	return (
		<div className="md:flex-1 overflow-auto mb-5 md:mb-0">
			{/* content post */}
			<div className="break-words rounded-md border-[1px] mb-5">
				<img className="h-80 w-full rounded-t-md object-cover" src={post.banner} alt="" />
				{/* post info */}
				<div className="p-5 sm:p-10">
					{/* info author */}
					<div className="flex gap-2 mb-5">
						<img
							className="h-10 w-10 object-cover rounded-full"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQseeFyHCn_0C84nKwMjHhtD_Qk4Kxrj7SNbw&usqp=CAU"
							alt=""
						/>
						<div>
							<h3 className="capitalize font-semibold text-sm leading-4">{post.userId?.userName}</h3>
							<span className="font-light text-xs">Posted on {timeConvert(post.createdAt)}</span>
						</div>
					</div>
					{/* title */}
					<h2 className="font-extrabold text-3xl sm:text-5xl break-words">{post.title}</h2>
					{/* tags */}
					<div className="flex flex-wrap gap-4 mt-3">
						{post.tags?.map((val, index) => (
							<span className="text-sm font-light" key={index}>
								#{val}
							</span>
						))}
					</div>
					{/* content */}
					<div className="custom-highlighter-syntax pt-7 pb-6 sm:pt-10 sm:pb-8">
						<ReactMarkdown
							children={post.content}
							components={SyntaxHighlight}
						/>
					</div>
					
				</div>
				{commentList.length === 0 ? <EmptyCommentLayout /> : <div className='border-t-2 border-gray-100'>
					<div className='h-full px-3 py-4 md:px-12'>
						<span className='block font-bold text-lg md:text-2xl md:mt-4 mb-8'>Discussion ({commentList.length})</span>
						<div className='w-full h-full'>
							{commentParents && commentParents?.map((comment , idx) => (
								<CommentParent key={idx} comment={comment} childCommentList={commentChilds}/>
							))}
						</div>
					</div>
				</div>}
			</div>

			{/* Read next */}
			<div className="rounded-md border-[1px] py-5 pl-7 md:py-10 md:pl-14">
				<h3 className="font-bold text-xl mb-7">Read Next</h3>
				<div className="flex gap-5 items-center mb-7">
					<img
						className="h-16 w-16 object-cover rounded-full"
						src="https://res.cloudinary.com/practicaldev/image/fetch/s--6SvPRpm---/c_imagga_scale,f_auto,fl_progressive,h_100,q_auto,w_100/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/438512/0ac2d181-2fd0-4861-95ab-f3fb2fd90f58.jpeg"
						alt=""
					/>
					<div>
						<h3 className="font-semibold text-lg">How to Create a Custom Hook in React</h3>
						<h4 className="font-light text-gray-400">Anurag Gharat - Apr 18</h4>
					</div>
				</div>
				<div className="flex gap-5 items-center mb-7">
					<img
						className="h-16 w-16 object-cover rounded-full"
						src="https://res.cloudinary.com/practicaldev/image/fetch/s--6SvPRpm---/c_imagga_scale,f_auto,fl_progressive,h_100,q_auto,w_100/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/438512/0ac2d181-2fd0-4861-95ab-f3fb2fd90f58.jpeg"
						alt=""
					/>
					<div>
						<h3 className="font-semibold text-lg">How to Create a Custom Hook in React</h3>
						<h4 className="font-light text-gray-400">Anurag Gharat - Apr 18</h4>
					</div>
				</div>
				<div className="flex gap-5 items-center mb-7">
					<img
						className="h-16 w-16 object-cover rounded-full"
						src="https://res.cloudinary.com/practicaldev/image/fetch/s--6SvPRpm---/c_imagga_scale,f_auto,fl_progressive,h_100,q_auto,w_100/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/438512/0ac2d181-2fd0-4861-95ab-f3fb2fd90f58.jpeg"
						alt=""
					/>
					<div>
						<h3 className="font-semibold text-lg">How to Create a Custom Hook in React</h3>
						<h4 className="font-light text-gray-400">Anurag Gharat - Apr 18</h4>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainPost;
