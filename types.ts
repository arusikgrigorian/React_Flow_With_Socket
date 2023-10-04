import { XYPosition } from "reactflow";

export type CustomNodeData = {
  id: string;
  color: string;
  title: string;
  text: string;
  fiveWTwoHId: string;
  hidden: boolean;
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
  details: Details;
  position: XYPosition | null;
  type: string | null;
  user: number;
  color: string;
};
