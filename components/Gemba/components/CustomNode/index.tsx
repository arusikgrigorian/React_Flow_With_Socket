import { memo } from "react";
import { NodeToolbar, useReactFlow } from "reactflow";
import { Button, ColorPicker, Form, Input, Modal, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";

import {
  BgColorsOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import {
  getInputColor,
  getOverlayInnerStyle,
} from "@/utils/getCustomNodeStyles";

import { convertRgbToHex } from "@/utils/convertRgbToHex";
import { formatRgbString } from "@/utils/formatRgbString";
import { CustomNodeData } from "@/types";

const { confirm } = Modal;

type Props = {
  data: CustomNodeData;
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
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          onClick={onCustomNodeDelete}
        >
          Delete
        </Button>
      </NodeToolbar>
      <div
        style={{ backgroundColor: `rgba(${color},0.8)` }}
        className={`min-h-[200px] p-2 outline-none rounded-default`}
      >
        <Form
          className={"[&_.ant-form-item]:my-0"}
          form={form}
          initialValues={{ title, text, color: pickerColor }}
        >
          <Form.Item className={"absolute right-2 "} name={"color"}>
            <ColorPicker
              disabledAlpha
              defaultFormat={"rgb"}
              onChange={() => onFormItemChange("color")}
            >
              <Button
                shape={"circle"}
                style={{ borderColor: `rgb(${color}` }}
                className={"shadow-none"}
                icon={<BgColorsOutlined style={{ color: `rgb(${color}` }} />}
              />
            </ColorPicker>
          </Form.Item>
          <Tooltip
            placement={"left"}
            color={`rgb(${color})`}
            overlayInnerStyle={{ color: tooltipColor }}
            title={title}
          >
            <>
              <Form.Item className={"w-40"} name={"title"}>
                <Input
                  bordered={false}
                  className={inputColor}
                  placeholder={"Title"}
                  onChange={() => onFormItemChange("title")}
                />
              </Form.Item>
            </>
          </Tooltip>
          <Form.Item name={"text"}>
            <Input.TextArea
              autoSize
              bordered={false}
              className={inputColor}
              placeholder={"Type here"}
              onChange={() => onFormItemChange("text")}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
});

export default CustomNode;
