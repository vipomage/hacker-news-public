import { StoryModel } from '../model/story-model';
import { HttpMethod } from '../enum/http-method';
import { UserModel } from '../model/user-model';
import { CommentModel } from '../model/comment-model';

export class ApiService {
  /** ----------------- Properties -----------------------------  */

  private readonly baseUrl: string = 'https://hacker-news.firebaseio.com/v0';
  private readonly firebaseHttpPostfix: string = '.json';
  private readonly baseOptions: RequestInit = {};

  constructor(headers?: HeadersInit) {
    this.baseOptions = { ...this.baseOptions, headers };
  }

  private async get<T>(url: string, opts: RequestInit = this.baseOptions): Promise<T> {
    return (
      await fetch([this.baseUrl, url].join('/') + this.firebaseHttpPostfix, {
        method: HttpMethod.GET,
        ...opts,
      })
    ).json();
  }

  /** ----------------- Public Methods -------------------------  */

  async getTopStoryIds(): Promise<number[]> {
    return this.get(`topstories`);
  }

  async getStoryById(storyId: number): Promise<StoryModel> {
    return this.get<StoryModel>(`item/${storyId}`);
  }

  async getUserProfile(userId: number): Promise<UserModel> {
    return this.get<UserModel>(`user${userId}`);
  }

  async getStoryComments(commentIds: number[]): Promise<CommentModel[]> {
    const commentPromises: Promise<CommentModel>[] = commentIds.map(
      async (commentId: number): Promise<CommentModel> => await this.get<CommentModel>(`item/${commentId}`),
    );

    return await Promise.all(commentPromises);
  }
}
