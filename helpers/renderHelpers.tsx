import { Spin } from "antd";

export const WaitingLoading = ({ loading }: { loading: boolean }) => {
  return (
    <Spin spinning={loading}>
      <div className="h-screen w-full"></div>
    </Spin>
  );
};
