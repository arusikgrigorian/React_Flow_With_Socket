import { memo } from "react";
import { NodeToolbar } from "reactflow";
import { Button, Form, Input, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { isColorLight } from "@/utils/isColorDark";

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

  const inputColor = isColorLight(color)
    ? "text-gray-6 placeholder-gray-6"
    : "text-[white] placeholder-[white]";

  return (
    <>
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
        style={{ backgroundColor: `rgb(${color})` }}
        className={"min-h-[200px] p-4 outline-none rounded-default"}
      >
        <Form className={"[&_.ant-form-item]:my-0"}>
          <Form.Item name={"title"}>
            <Tooltip placement={"left"} title={title}>
              <Input
                bordered={false}
                className={`${inputColor}`}
                placeholder={"Title"}
              />
            </Tooltip>
          </Form.Item>
          <Form.Item name={"description"}>
            <Input.TextArea
              autoSize
              bordered={false}
              className={`${inputColor}`}
              placeholder={"Type here"}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
});

export default CustomNode;
