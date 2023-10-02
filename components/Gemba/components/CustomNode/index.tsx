import { memo } from "react";
import { NodeToolbar } from "reactflow";
import { Button, ColorPicker, Form, Input, Tooltip } from "antd";
import { BgColorsOutlined, DeleteOutlined } from "@ant-design/icons";
import { isColorLight } from "@/utils/defineColorMode";
import { useForm } from "antd/es/form/Form";

type Data = {
  id: string;
  title: string;
  description: string;
  color: string;
};

type Props = {
  data: Data;
};

const CustomNode = memo(function CustomNode({ data }: Props) {
  const { id, title = "", description = "", color } = data;

  const [form] = useForm();

  const inputColor = isColorLight(color)
    ? "text-gray-5 placeholder-gray-5"
    : "text-[white] placeholder-[white]";

  const onFormItemChange = (itemName: "color" | "title" | "description") => {
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
        style={{ backgroundColor: `rgb(${color}, 0.8)` }}
        className={`min-h-[200px] p-2 outline-none rounded-default`}
      >
        <Form
          className={"[&_.ant-form-item]:my-0"}
          form={form}
          initialValues={{ title, description }}
        >
          <Form.Item className={"absolute right-2 "} name={"color"}>
            <ColorPicker onChange={() => onFormItemChange("color")}>
              <Button
                shape={"circle"}
                style={{ borderColor: `rgb(${color}` }}
                className={"shadow-none"}
                icon={<BgColorsOutlined style={{ color: `rgb(${color}` }} />}
              />
            </ColorPicker>
          </Form.Item>
          <Tooltip placement={"left"} color={`rgb(${color})`} title={title}>
            <>
              <Form.Item className={"w-40"} name={"title"}>
                <Input
                  bordered={false}
                  className={`${inputColor}`}
                  placeholder={"Title"}
                  onChange={() => onFormItemChange("title")}
                />
              </Form.Item>
            </>
          </Tooltip>
          <Form.Item name={"description"}>
            <Input.TextArea
              autoSize
              bordered={false}
              className={`${inputColor}`}
              placeholder={"Type here"}
              onChange={() => onFormItemChange("description")}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default CustomNode;
