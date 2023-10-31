import { Node } from "reactflow";
import { SendJsonMessage } from "react-use-websocket/src/lib/types";

import { generateSocketRoomName } from "@/utils/generateSocketRoomName";

import { JsonMessageParam } from "@/types/global";
import { ROOM } from "@/types/api";

export function send(
  sendJsonMessage: SendJsonMessage,
  params: JsonMessageParam,
  data: Node["data"],
) {
  const { groupId, eventSource, event } = params;

  sendJsonMessage({
    group: generateSocketRoomName(ROOM.note, groupId),
    type: ROOM.note,
    eventSource,
    event,
    data: {
      ...data,
      userId: data.user,
    },
  });
}
