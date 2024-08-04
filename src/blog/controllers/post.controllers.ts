import { Request, Response, NextFunction } from "express";
import { PostServices } from "../services/post.services";

class PostControllers {
  private readonly postServices: PostServices;

  constructor() {
    this.postServices = new PostServices();
  }

  async createPost(request: Request, response: Response, next: NextFunction) {
    try {
      const { title, text, imageUrl, volunteerId } = request.body;
      const post = await this.postServices.createPost({ title, text, imageUrl, volunteerId });
      return response.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(request: Request, response: Response, next: NextFunction) {
    try {
      const { postId } = request.params;
      const post = await this.postServices.getPostById(Number(postId));
      return response.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(request: Request, response: Response, next: NextFunction) {
    try {
      const posts = await this.postServices.getAllPosts();
      return response.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(request: Request, response: Response, next: NextFunction) {
    try {
      const { postId } = request.params;
      const { title, text, imageUrl, volunteerId } = request.body;
      const post = await this.postServices.updatePost(Number(postId), { title, text, imageUrl, volunteerId });
      return response.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(request: Request, response: Response, next: NextFunction) {
    try {
      const { postId } = request.params;
      await this.postServices.deletePost(Number(postId));
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { PostControllers };
