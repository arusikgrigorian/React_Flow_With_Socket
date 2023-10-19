import { ChangeEvent, memo } from "react";
import useWebSocket from "react-use-websocket";
import { NodeResizeControl, NodeToolbar, useReactFlow } from "reactflow";
import { Modal, Tooltip } from "antd";

import {
  BgColorsOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FullscreenOutlined,
} from "@ant-design/icons";

import {
  getInputColor,
  getOverlayInnerStyle,
} from "@/utils/getCustomNodeStyles";

import { t } from "@/utils/translate";
import { convertRgbToHex } from "@/utils/convertRgbToHex";
import { convertHexToRgb } from "@/utils/convertHexToRgb";
import { VITE_APP_SOCKET_URL } from "@/constants";
import { CustomNodeData } from "@/types";

const { confirm } = Modal;

type Props = {
  data: CustomNodeData;
  dragging: boolean;
};

const CustomNode = memo(function CustomNode({ data }: Props) {
  const { id, title, text, color } = data;

  const inputColor = getInputColor(color);
  const tooltipColor = getOverlayInnerStyle(color);
  const pickerColor = convertRgbToHex(color);

  const { setNodes } = useReactFlow();

  const { sendJsonMessage } = useWebSocket(
    `${VITE_APP_SOCKET_URL}/socket/5w2h/${id}/`,
    {
      share: true,
      shouldReconnect: () => false,
    },
  );

  const onCustomNodeChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: "title" | "text" | "color",
  ) => {
    const value = e.target.value;

    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          const color = key === "color" && convertHexToRgb(value);

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
  };

  const onCustomNodeDelete = () => {
    confirm({
      centered: true,
      title: t("Are you sure delete this note?"),
      icon: <ExclamationCircleFilled />,
      okText: t("Delete"),
      okType: "danger",
      cancelText: t("Cancel"),
      onOk() {
        setNodes((nodes) => {
          return nodes.map((node) => {
            if (node.id === id) {
              return {
                ...node,
                hidden: true,
              };
            }
            return node;
          });
        });
      },
    });
  };

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
        style={{ background: "transparent", border: "none" }}
        minWidth={400}
        maxWidth={800}
        minHeight={400}
      >
        <FullscreenOutlined
          style={{ color: tooltipColor }}
          className={"absolute bottom-2 right-2"}
        />
      </NodeResizeControl>
      <div
        style={{ backgroundColor: `rgba(${color},0.8)` }}
        className={`flex min-w-[400px] min-h-[400px] h-full px-4 py-6 outline-none rounded-default`}
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
