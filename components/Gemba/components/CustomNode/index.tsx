import { memo } from "react";
import { NodeToolbar } from "reactflow";
import { Button, ColorPicker, Form, Input, Tooltip } from "antd";
import { BgColorsOutlined, DeleteOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

import {
  getInputColor,
  getOverlayInnerStyle,
} from "@/utils/getCustomNodeStyles";

import { convertRgbToHex } from "@/utils/convertRgbToHex";
import { CustomNodeData } from "@/types";

type Props = {
  data: CustomNodeData;
};

const CustomNode = memo(function CustomNode({ data }: Props) {
  const { id, title, text, color } = data;

  const inputColor = getInputColor(color);
  const tooltipColor = getOverlayInnerStyle(color);
  const pickerColor = convertRgbToHex(color);

  const [form] = useForm();

  const onFormItemChange = (itemName: "color" | "title" | "text") => {
    const isItemNameColor = itemName === "color";

    form
      .validateFields()
      .then((data) => {
        console.log(
          isItemNameColor ? data[itemName].toRgbString() : data[itemName],
        );
      })
      .catch(() => {
        return;
      });
  };

  return (
    <div>
      <NodeToolbar nodeId={id}>
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => undefined}
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
    </div>
  );
});

export default CustomNode;
