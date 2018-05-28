/** Import Modules */
import express from 'express';
import * as posts from './posts';
import * as comments from './comments';

/** Declare route */
const Router = express.Router();

/** Use in-memory store */
export let store = {
  posts: [
    {
      name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        { text: 'Cruel…..var { house, mouse} = No type optimization at all' },
        { text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.' },
        { text: '(p1,p2)=>{ … } ,i understand this ,thank you !' }
      ]
    }
  ]
}

/** Direct routes */
// Transfer to /posts
Router.get('/posts', posts.getPosts)
  .post('/posts', posts.addPost)
  .put('/posts/:postId', posts.updatePost)
  .delete('/posts/:postId', posts.removePost);

// Transfer to /posts/:postId/comments
Router.get('/posts/:postId/comments', comments.getComments)
  .post('/posts/:postId/comments', comments.addComment)
  .put('/posts/:postId/comments/:commentId', comments.updateComment)
  .delete('/posts/:postId/comments/:commentId', comments.removeComment);

export { Router };
