import { Button, Space } from "antd";
import {
  CompressOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

type Props = {
  isFullScreen: boolean;
  onCustomNodeAdd: () => void;
  onFitView: () => boolean;
  onScreenSizeChange: () => void;
};

export default function FlowPanel({
  isFullScreen,
  onCustomNodeAdd,
  onFitView,
  onScreenSizeChange,
}: Props) {
  const ViewIcon = isFullScreen ? (
    <FullscreenExitOutlined />
  ) : (
    <FullscreenOutlined />
  );

  return (
    <Space size={8}>
      <Button
        className={"btn-primary"}
        type={"primary"}
        onClick={onCustomNodeAdd}
      >
        Add New
      </Button>
      <Button
        className={"btn-default"}
        icon={<CompressOutlined />}
        onClick={onFitView}
      >
        Fit View
      </Button>
      <Button
        className={"btn-default"}
        icon={ViewIcon}
        onClick={onScreenSizeChange}
      >
        {isFullScreen ? "Shrink" : "Expand"}
      </Button>
    </Space>
  );
}
