import { PostDals } from '../database/repositories/post.repositories.ts/post.dals';
import { IPostCreate } from '../interfaces/post.interfaces';
import { BadRequestError, NotFoundError } from '../../helpers/error.helpers';

class PostServices {
  private readonly postDals: PostDals;

  constructor() {
    this.postDals = new PostDals();
  }

  async createPost(postData: IPostCreate) {
    const post = await this.postDals.createPost(postData);
    if (!post) {
      throw new BadRequestError({ message: "Post not created" });
    }
    return post;
  }

  async getPostById(postId: number) {
    const post = await this.postDals.getPostById(postId);
    if (!post) {
      throw new NotFoundError({ message: "Post not found" });
    }
    return post;
  }

  async getAllPosts() {
    const posts = await this.postDals.getAllPosts();
    return posts;
  }

  async updatePost(postId: number, data: Partial<IPostCreate>) {
    const post = await this.postDals.updatePost(postId, data);
    if (!post) {
      throw new NotFoundError({ message: "Post not found or not updated" });
    }
    return post;
  }

  async deletePost(postId: number) {
    const post = await this.postDals.deletePost(postId);
    if (!post) {
      throw new NotFoundError({ message: "Post not found or not deleted" });
    }
    return post;
  }
}

export { PostServices };
