import { XYPosition } from "reactflow";

export type Param = {
  all?: boolean;
  five_w_two_h?: string;
};

export type Result = {
  count: number;
  next: null;
  previous: null;
  results: Array<Node>;
};

export type CustomNodeData = {
  id: string;
  title: string;
  text: string;
  color: string;
  fiveWTwoHId: number;
  userId: number;
};

export type Data = {
  hidden: boolean;
  position: XYPosition;
  fiveWTwoHId: number;
};

export type Detail = {
  data: Data;
};

export type Node = {
  id: string;
  five_w_two_h: number;
  title: string;
  text: string;
  color: string;
  details: Detail;
  position: XYPosition | null;
  type: string | null;
  user: number;
};
