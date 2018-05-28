import { store } from './index'

const getComments = (req, res) => {
  const id = req.params.postId;

  res.status(200).json(store.posts[id].comments);
}

const addComment = (req, res) => {
  const postId = req.params.postId;
  const { length: commentId } = store.posts[id].comments;
  const { text } = req.body;
  const newComment = { text };

  store.posts[postId].comments.push(newComment);
  res.status(201).json({ id: commentId })
}

const updateComment = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  const { text } = req.body;
  const upComment = { text };

  store.posts[postId].comments[commentId] = upComment;
  res.status(200).json(store.posts[postId].comments[commentId]);
}

const removeComment = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  console.log(commentId);

  store.posts[postId].comments.splice(commentId, 1);
  res.status(204).send();
}

export { getComments, addComment, updateComment, removeComment };