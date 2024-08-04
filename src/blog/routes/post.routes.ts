import { Router } from 'express';
import { PostControllers } from '../controllers/post.controllers';

class PostRoutes {
  private readonly router: Router;
  private readonly postControllers: PostControllers;

  constructor() {
    this.router = Router();
    this.postControllers = new PostControllers();
  }

  routes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Post:
     *       type: object
     *       properties:
     *         title:
     *           type: string
     *           example: "Post Title"
     *         text:
     *           type: string
     *           example: "This is the content of the post."
     *         imageUrl:
     *           type: string
     *           example: "http://example.com/image.jpg"
     *         volunteerId:
     *           type: integer
     *           example: 1
     *
     *   responses:
     *     PostCreated:
     *       description: Post created successfully
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *
     * /create-post:
     *   post:
     *     summary: Creates a new post
     *     tags: [Post]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       201:
     *         $ref: '#/components/responses/PostCreated'
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
 /**
     * @swagger
     * components:
     *   schemas:
     *     Post:
     *       type: object
     *       properties:
     *         title:
     *           type: string
     *           example: "Post Title"
     *         text:
     *           type: string
     *           example: "This is the content of the post."
     *         imageUrl:
     *           type: string
     *           example: "http://example.com/image.jpg"
     *         volunteerId:
     *           type: integer
     *           example: 1
     *     PostResponse:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *           example: 1
     *         title:
     *           type: string
     *           example: "Post Title"
     *         text:
     *           type: string
     *           example: "This is the content of the post."
     *         imageUrl:
     *           type: string
     *           example: "http://example.com/image.jpg"
     *         volunteerId:
     *           type: integer
     *           example: 1
     *     ErrorResponse:
     *       type: object
     *       properties:
     *         message:
     *           type: string
     *           example: "Error message"
     *
     *   responses:
     *     PostCreated:
     *       description: Post created successfully
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PostResponse'
     *     PostNotFound:
     *       description: Post not found
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ErrorResponse'
     *     BadRequest:
     *       description: Bad Request
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ErrorResponse'
     *
     * /create-post:
     *   post:
     *     summary: Creates a new post
     *     tags: [Post]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       201:
     *         $ref: '#/components/responses/PostCreated'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     *   
     *   /get-posts
     *   get:
     *     summary: Retrieves all posts
     *     tags: [Post]
     *     responses:
     *       200:
     *         description: List of posts
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/PostResponse'
     *
     * /get-post/{postId}:
     *   get:
     *     summary: Retrieves a post by ID
     *     tags: [Post]
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     responses:
     *       200:
     *         description: Post found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/PostResponse'
     *       404:
     *         $ref: '#/components/responses/PostNotFound'
     *
     *   /update-post/{$id} 
     *   put:
     *     summary: Updates a post by ID
     *     tags: [Post]
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: Post updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/PostResponse'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     *       404:
     *         $ref: '#/components/responses/PostNotFound'
     *
     *   /delete-post/${id}
     *   delete:
     *     summary: Deletes a post by ID
     *     tags: [Post]
     *     parameters:
     *       - in: path
     *         name: postId
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     responses:
     *       204:
     *         description: Post deleted successfully
     *       404:
     *         $ref: '#/components/responses/PostNotFound'
     */
    this.router.post('/create-post', this.postControllers.createPost.bind(this.postControllers));
    this.router.get('/get-post', this.postControllers.getAllPosts.bind(this.postControllers));
    this.router.get('/get-post/:postId', this.postControllers.getPostById.bind(this.postControllers));
    this.router.put('/update-post/:postId', this.postControllers.updatePost.bind(this.postControllers));
    this.router.delete('/delete-post/:postId', this.postControllers.deletePost.bind(this.postControllers));

    return this.router;
  }
}

export { PostRoutes };
