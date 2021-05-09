export class ApiService {
  /** ----------------- Properties -----------------------------  */

  baseUrl = 'https://hacker-news.firebaseio.com/v0';
  firebaseHttpPostfix = '.json';
  baseOptions = {};

  constructor(headers = {}) {
    this.baseOptions = { ...this.baseOptions, headers };
  }

  async get(url, opts = this.baseOptions) {
    return (
      await fetch([this.baseUrl, url].join('/') + this.firebaseHttpPostfix, {
        method: 'GET',
        ...opts,
      })
    ).json();
  }

  /** ----------------- Public Methods -------------------------  */

  async getTopStoryIds() {
    return this.get(`topstories`);
  }

  async getStoryById(storyId) {
    return this.get(`item/${storyId}`);
  }

  async getUserProfile(userId) {
    return this.get(`user${userId}`);
  }

  async getStoryComments(commentIds) {
    const commentPromises = commentIds.map(async (commentId) => await this.get(`item/${commentId}`));

    return await Promise.all(commentPromises);
  }
}
