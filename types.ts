import { XYPosition } from "reactflow";

export type WebSocketResult = {
  jsonMessage: Array<ExtendedCustomNode>;
};

export type HttpResult = {
  count: number;
  next: null;
  previous: null;
  results: Array<CustomNode>;
};

export type Param = {
  all?: boolean;
  five_w_two_h?: string;
};

export type ExtendedCustomNodeData = {
  id: string;
  original_id: number;
  title: string;
  text: string;
  color: string;
  details: Detail;
  fiveWTwoHId: number;
  userId: number;
};

export type ExtendedCustomNode = {
  eventSource: string;
  group: string;
  type: string;
  data: ExtendedCustomNodeData;
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
  position: XYPosition;
  fiveWTwoHId: number;
};

export type Detail = {
  data: Data;
};

export type CustomNode = {
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
