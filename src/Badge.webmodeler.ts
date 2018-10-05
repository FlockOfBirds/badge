import { Component, createElement } from "react";
import { Badge, BadgeProps } from "./components/Badge";
import { BadgeContainerProps } from "./components/BadgeContainer";

declare function require(name: string): string;

// tslint:disable-next-line class-name
export class preview extends Component<BadgeContainerProps, {}> {
    render() {
        return createElement("div", { ref: this.parentInline },
            createElement(Badge, this.transformProps(this.props))
        );
    }

    private parentInline(node?: HTMLElement | null) {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement) {
            node.parentElement.style.display = "inline-block";
        }
    }

    private transformProps(props: BadgeContainerProps): BadgeProps {
        const valueAttribute = props.valueAttribute && props.valueAttribute.value ? props.valueAttribute.value : "";
        return {
            badgeType: props.badgeType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: props.style,
            value: valueAttribute ? "[" + valueAttribute + "]" : props.badgeValue ? props.badgeValue.value : ""
        };
    }
}

export function getPreviewCss() {
    return require("./ui/Badge.css");
}
