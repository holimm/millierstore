import { Drawer, Space } from "antd"
import { ReactComponentElement } from "react"

type Placement = 'left' | 'right' | 'top' | 'bottom';

interface NavDrawerModel {
        placement: Placement,
        showDrawer: boolean;
        handleShowDrawer: () => void;
}

const NavDrawer = (props: NavDrawerModel) => {
    return (
    <Drawer
        height={"4rem"}
        placement={props.placement}
        open={props.showDrawer}
        onClose={props.handleShowDrawer}
        closable={false}
      >
        <Space></Space>
      </Drawer>
    )
}

export default NavDrawer;