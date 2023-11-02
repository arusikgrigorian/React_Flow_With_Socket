import { ChangeEvent, memo, useCallback } from "react";
import { Node, NodeResizeControl, NodeToolbar, useReactFlow } from "reactflow";
import { Modal, Tooltip } from "antd";

import {
  BgColorsOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FullscreenOutlined,
} from "@ant-design/icons";

import { useSocket } from "@/hooks";

import {
  getInputColor,
  getOverlayInnerStyle,
} from "@/utils/getCustomNodeStyles";

import { convertRgbToHex } from "@/utils/convertRgbToHex";
import { convertHexToRgb } from "@/utils/convertHexToRgb";
import { t } from "@/utils/translate";
import { send } from "@/utils/send";

import { CustomNodeData, JsonMessageParam } from "@/types/global";
import { Event, EventSource } from "@/types/api";

const { confirm } = Modal;

type Keys = "title" | "text" | "color";

type Props = {
  data: CustomNodeData;
  xPos: number;
  yPos: number;
};

const CustomNode = memo(function CustomNode({ data, xPos, yPos }: Props) {
  const { id, fiveWTwoHId, title, text, color, width, height } = data;

  const inputColor = getInputColor(color);
  const tooltipColor = getOverlayInnerStyle(color);
  const pickerColor = convertRgbToHex(color);

  const { setNodes, deleteElements, fitView } = useReactFlow();
  const { sendJsonMessage } = useSocket({ id, endpoint: "5w2h" }, id);

  const sendMessage = useCallback(
    (params: JsonMessageParam, data: Node["data"]) =>
      send(sendJsonMessage, params, data),
    [sendJsonMessage],
  );

  const onCustomNodeResize = useCallback(
    (_: any, { height, width }: { height: number; width: number }) => {
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                height,
                width,
              },
            };
          }

          return node;
        });
      });
    },

    [id, setNodes],
  );

  const onCustomNodeResizeEnd = useCallback(
    (_: any, { height, width }: { height: number; width: number }) => {
      const params = {
        groupId: fiveWTwoHId,
        eventSource: EventSource.gemba,
        event: Event.resize,
      };

      const resizedNodeData = {
        ...data,
        height,
        width,
        details: {
          data: {
            fiveWTwoHId,
            position: { x: xPos, y: yPos },
          },
        },
      };

      sendMessage(params, resizedNodeData);
    },
    [fiveWTwoHId, data, xPos, yPos, sendMessage],
  );

  const onCustomNodeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: Keys) => {
      const value = e.target.value;
      const color = key === "color" && convertHexToRgb(value);

      const params = {
        groupId: fiveWTwoHId,
        eventSource: EventSource.gemba,
        event: Event.input,
      };

      const changedNodeData = {
        ...data,
        [key]: color || value,
        details: {
          data: {
            fiveWTwoHId,
            position: { x: xPos, y: yPos },
          },
        },
      };

      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                [key]: color || value,
              },
            };
          }

          return node;
        });
      });

      sendMessage(params, changedNodeData);
    },
    [id, fiveWTwoHId, data, xPos, yPos, setNodes, sendMessage],
  );

  const onCustomNodeDelete = useCallback(() => {
    confirm({
      centered: true,
      title: t("Are you sure to delete this note?"),
      icon: <ExclamationCircleFilled />,
      okText: t("Delete"),
      okType: "danger",
      cancelText: t("Cancel"),
      onOk: () => {
        const params = {
          groupId: fiveWTwoHId,
          eventSource: EventSource["remove-gemba"],
          event: Event.deletion,
        };

        deleteElements({ nodes: [{ id }] });
        setTimeout(() => fitView({ duration: 400 }), 100);

        sendMessage(params, { id });
      },
    });
  }, [id, fiveWTwoHId, deleteElements, fitView, sendMessage]);

  return (
    <>
      <NodeToolbar nodeId={id}>
        <button
          className={"btn-danger btn-icon transition-300"}
          type="button"
          onClick={onCustomNodeDelete}
        >
          <i>
            <DeleteOutlined />
          </i>
          <span>{t("Delete")}</span>
        </button>
      </NodeToolbar>
      <NodeResizeControl
        style={{
          background: "transparent",
          border: "none",
        }}
        minWidth={400}
        maxWidth={800}
        minHeight={400}
        onResize={onCustomNodeResize}
        onResizeEnd={onCustomNodeResizeEnd}
      >
        <FullscreenOutlined
          style={{ color: tooltipColor }}
          className={"absolute bottom-2 right-2"}
        />
      </NodeResizeControl>
      <div
        style={{
          backgroundColor: `rgba(${color},0.8)`,
          minWidth: `${width}px`,
          minHeight: `${height}px`,
        }}
        className={`flex h-full px-4 py-6 outline-none rounded-default`}
      >
        <form className={"flex flex-col gap-4 w-full"}>
          <div className={"absolute top-4 right-12"}>
            <label
              style={{ borderColor: `rgb(${color}` }}
              className={
                "inline-flex-centered w-8 h-8 border border-solid bg-gray-1 rounded-full p-1.5 absolute"
              }
            >
              <BgColorsOutlined style={{ color: `rgb(${color}` }} />
            </label>
            <input
              className={
                "w-8 h-8 rounded-full color-picker absolute opacity-0 cursor-pointer"
              }
              name={"color"}
              type={"color"}
              placeholder={""}
              value={pickerColor}
              onChange={(e) => onCustomNodeChange(e, "color")}
            />
          </div>
          <div className={"w-full"}>
            <Tooltip
              placement={"left"}
              color={`rgb(${color})`}
              overlayInnerStyle={{ color: tooltipColor }}
              title={title}
            >
              <input
                className={`${inputColor} w-[85%] bg-transparent outline-none `}
                name={"title"}
                placeholder={"Title"}
                value={title}
                onChange={(e) => onCustomNodeChange(e, "title")}
              />
            </Tooltip>
          </div>
          <div className={"flex-grow"}>
            <textarea
              className={`${inputColor} w-full h-full bg-transparent outline-none resize-none overflow-hidden`}
              name={"text"}
              placeholder={"Type here"}
              value={text}
              onChange={(e) => onCustomNodeChange(e, "text")}
            />
          </div>
        </form>
      </div>
    </>
  );
});

export default CustomNode;
