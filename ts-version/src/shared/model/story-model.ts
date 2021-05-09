import { BaseItemModel } from './base-item-model';

export interface StoryModel extends BaseItemModel {
  descendants: number;
  score: number;
  title: string;
  url: string;
}
