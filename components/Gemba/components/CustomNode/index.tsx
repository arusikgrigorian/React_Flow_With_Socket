import { memo } from "react";
import { NodeResizeControl, NodeToolbar, useReactFlow } from "reactflow";
import { Modal, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";

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

import { convertRgbToHex } from "@/utils/convertRgbToHex";
import { formatRgbString } from "@/utils/formatRgbString";
import t from "@/utils/translate";
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

  const [form] = useForm();
  const { setNodes } = useReactFlow();

  const onFormItemChange = (key: "title" | "text" | "color") => {
    form
      .validateFields()
      .then((values) => {
        setNodes((nodes) => {
          return nodes.map((node) => {
            if (node.id === id) {
              const color =
                key === "color" && formatRgbString(values[key].toRgbString());

              return {
                ...node,
                data: {
                  ...node.data,
                  [key]: color || values[key],
                },
              };
            }

            return node;
          });
        });
      })
      .catch(() => {
        return;
      });
  };

  const onCustomNodeDelete = () => {
    confirm({
      centered: true,
      title: "Are you sure delete this note?",
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
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
          className={"btn-danger btn-icon transition-500"}
          type="button"
          onClick={onCustomNodeDelete}
        >
          <i>
            <DeleteOutlined />
          </i>
          <span>{t("Delete")}</span>
        </button>
      </NodeToolbar>
      <NodeResizeControl minWidth={300} maxWidth={500} minHeight={300}>
        <FullscreenOutlined />
      </NodeResizeControl>
      <div
        style={{ backgroundColor: `rgba(${color},0.8)` }}
        className={`flex min-h-[300px] h-full p-2 outline-none rounded-default`}
      >
        <form className={"flex flex-col gap-2 w-full"}>
          <div className={"absolute right-2"}>
            <label>
              <BgColorsOutlined style={{ color: `rgb(${color}` }} />
            </label>
            <input
              name={"color"}
              type={"color"}
              placeholder={""}
              value={pickerColor}
              onChange={() => onFormItemChange("color")}
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
                className={`${inputColor} w-[80%] bg-transparent outline-none `}
                name={"title"}
                placeholder={"Title"}
                value={title}
                onChange={() => onFormItemChange("title")}
              />
            </Tooltip>
          </div>
          <div className={"flex-grow"}>
            <textarea
              className={`${inputColor} w-full h-full bg-transparent outline-none resize-none overflow-hidden`}
              name={"text"}
              placeholder={"Type here"}
              value={text}
              onChange={() => onFormItemChange("text")}
            />
          </div>
        </form>
      </div>
    </>
  );
});

export default CustomNode;
