import { memo } from "react";
import { Form, Input } from "antd";

type Data = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  data: Data;
};

const CustomNode = memo(function CustomNode({ data }: Props) {
  const { id, title = "", description = "" } = data;

  return (
    <div className={"w-32 h-32 bg-blue-5"}>
      <Form>
        <Form.Item name={"title"}>
          <Input placeholder={"Type here"} bordered={false} />
        </Form.Item>
        <Form.Item name={"description"}>
          <Input.TextArea placeholder={"Type here"} bordered={false} />
        </Form.Item>
      </Form>
    </div>
  );
});

export default CustomNode;
