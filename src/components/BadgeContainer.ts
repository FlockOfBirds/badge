import { CSSProperties, Component, createElement } from "react";

import { Badge, BootstrapStyle } from "./Badge";

export interface BadgeContainerProps {
    class: string;
    style: CSSProperties;
    valueAttribute?: PluginWidget.EditableValue<string>;
    bootstrapStyle: BootstrapStyle;
    badgeType: "badge" | "label";
    badgeValue: PluginWidget.DynamicValue<string>;
    onClickAction: PluginWidget.ActionValue;
}

type Handler = () => void;

export default class BadgeContainer extends Component<BadgeContainerProps> {
    private readonly clickHandler: Handler = this.handleOnClick.bind(this);

    render() {
        return createElement(Badge, {
            badgeType: this.props.badgeType,
            bootstrapStyle: this.props.bootstrapStyle,
            className: this.props.class,
            clickable: !!this.props.onClickAction,
            defaultValue: this.props.badgeValue ? this.props.badgeValue.value : "",
            onClickAction: this.clickHandler,
            style: this.props.style,
            value: this.props.valueAttribute ? this.props.valueAttribute.value : ""
        });
    }

    private handleOnClick() {
        if (this.props.onClickAction) {
            this.props.onClickAction.execute();
        }
    }
}
