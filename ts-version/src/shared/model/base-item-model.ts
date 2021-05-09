import { ItemType } from '../enum/item-type';

export interface BaseItemModel {
  id: number;
  by: string;
  kids: number[];
  type: ItemType;
  time: number;
  text: string;
  parent: number;
  url: string;
  score: number;
  title: string;
  descendants: number;
  poll: number;
  dead: boolean;
  deleted: boolean;
}
