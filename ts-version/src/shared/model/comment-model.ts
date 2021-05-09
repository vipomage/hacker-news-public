import { BaseItemModel } from './base-item-model';

export interface CommentModel extends BaseItemModel {
  parent: number;
  text: string;
}
