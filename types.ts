import { XYPosition } from "reactflow";

export type CustomNodeData = {
  id: string;
  title: string;
  text: string;
  color: string;
  fiveWTwoHId: string;
  hidden: boolean;
  userId: number;
};

export type Data = {
  hidden: boolean;
  position: XYPosition;
  fiveWTwoHId: number;
};

export type Details = {
  data: Data;
};

export type Result = {
  id: string;
  five_w_two_h: number;
  title: string;
  text: string;
  color: string;
  details: Details;
  position: XYPosition | null;
  type: string | null;
  user: number;
};
