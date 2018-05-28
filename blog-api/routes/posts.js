import { store } from './index'

const getPosts = (req, res) => {
  res.status(200).json(store.posts);
}

const addPost = (req, res) => {
  const newPost = req.body;
  const { length: id } = store.posts;

  store.posts.push(newPost);
  res.status(201).json({ id: id })
}

const updatePost = (req, res) => {
  const { name, url, text, comments } = req.body;
  const id = req.params.postId;

  let upPost = { name, url, text, comments };
  upPost = JSON.parse(JSON.stringify(upPost));

  Object.assign(store.posts[id], upPost);
  res.status(200).json(store.posts[id]);
}

const removePost = (req, res) => {
  const id = req.params.postId;

  store.posts.splice(id, 1);
  res.status(204).send();
}

export { getPosts, addPost, updatePost, removePost };