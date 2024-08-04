import { prisma } from '../../prisma.databases';
import { IPostCreate } from '../../../interfaces/post.interfaces';

class PostDals {
  async createPost({ title, text, imageUrl, volunteerId }: IPostCreate) {
    const post = await prisma.post.create({
      data: {
        title,
        text,
        imageUrl,
        volunteerId,
      },
    });
    return post;
  }

  async getPostById(postId: number) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    return post;
  }

  async getAllPosts() {
    const posts = await prisma.post.findMany();
    return posts;
  }

  async updatePost(postId: number, data: Partial<IPostCreate>) {
    const post = await prisma.post.update({
      where: { id: postId },
      data,
    });
    return post;
  }

  async deletePost(postId: number) {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    return post;
  }
}

export { PostDals };
