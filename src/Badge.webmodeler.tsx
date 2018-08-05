import { Badge, BadgeProps } from "./components/Badge";
import { Alert } from "./components/Alert";
import BadgeContainer, { BadgeContainerProps } from "./components/BadgeContainer";
import * as React from "react";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof BadgeContainerProps]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends React.Component<BadgeContainerProps, {}> {
    render() {
        const message = BadgeContainer.validateProps(this.props);

        return (
            <div ref={ this.parentInline }>
                <Alert bootstrapStyle="danger" className="widget-badge-alert" message={ message } />,
                <Badge { ...this.transformProps(this.props) } />
            </div>
        );
    }

    private parentInline(node?: HTMLElement | null) {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement) {
            node.parentElement.style.display = "inline-block";
        }
    }

    private transformProps(props: BadgeContainerProps): BadgeProps {
        const valueAttribute = props.valueAttribute ? props.valueAttribute.split(".")[2] : "";
        return {
            badgeType: props.badgeType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: BadgeContainer.parseStyle(props.style),
            value: valueAttribute ? "[" + valueAttribute + "]" : props.badgeValue
        };
    }
}

export function getPreviewCss() {
    return require("./ui/Badge.css");
}

export function getVisibleProperties(valueMap: BadgeContainerProps, visibilityMap: VisibilityMap) {

    visibilityMap.microflow = valueMap.onClickEvent === "callMicroflow";
    visibilityMap.nanoflow = valueMap.onClickEvent === "callNanoflow";
    visibilityMap.page = valueMap.onClickEvent === "showPage";
    visibilityMap.openPageAs = valueMap.onClickEvent === "showPage";

    return visibilityMap;
}
