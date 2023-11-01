import {
  CompressOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

import { t } from "@/utils/translate";

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
    <div className={"flex gap-2"}>
      <button
        className={"btn-primary transition-300"}
        type={"button"}
        onClick={onCustomNodeAdd}
      >
        {t("Add New")}
      </button>
      <button
        className={"btn-default btn-icon transition-300"}
        type={"button"}
        onClick={onFitView}
      >
        <i className={"flex-centered"}>
          <CompressOutlined />
        </i>
        <span>{t("Fit View")}</span>
      </button>
      <button
        className={"btn-default btn-icon transition-300"}
        type={"button"}
        onClick={onScreenSizeChange}
      >
        <i className={"flex-centered"}>{ViewIcon}</i>
        <span>{t(isFullScreen ? "Shrink" : "Expand")}</span>
      </button>
    </div>
  );
}
