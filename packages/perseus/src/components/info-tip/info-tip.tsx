import {StyleSheet, css} from "aphrodite";
import * as React from "react";

const colors = {
    grayLight: "#aaa",
    basicBorderColor: "#ccc",
    white: "#fff",
} as const;

const triangleBeforeAfter = {
    borderBottom: "9px solid transparent",
    borderTop: "9px solid transparent",
    content: '" "',
    height: "0",
    position: "absolute",
    top: "0",
    width: "0",
} as const;

const styles = StyleSheet.create({
    infoTip: {
        display: "inline-block",
        marginLeft: "5px",
        position: "relative",
    },

    infoTipContainer: {
        position: "absolute",
        top: "-12px",
        left: "22px",
        zIndex: 1000,
    },

    infoTipTriangle: {
        height: "10px",
        left: "0",
        position: "absolute",
        top: "8px",
        width: "0",
        zIndex: 1,

        ":before": {
            ...triangleBeforeAfter,
            borderRight: "9px solid #bbb",
            right: "0",
        },

        ":after": {
            ...triangleBeforeAfter,
            borderRight: `9px solid ${colors.white}`,
            right: "-1px",
        },
    },

    verticalShadow: {
        border: `1px solid ${colors.basicBorderColor}`,
        boxShadow: `0 1px 3px ${colors.basicBorderColor}`,
        borderBottom: `1px solid ${colors.grayLight}`,
    },

    infoTipContentContainer: {
        background: colors.white,
        padding: "5px 10px",
        width: "240px",
    },
});

const questionMark =
    "data:image/png;base64," +
    "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBB" +
    "ZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/" +
    "eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+" +
    "IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2Jl" +
    "IFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAg" +
    "ICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5" +
    "LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9" +
    "IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHht" +
    "bG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3Vy" +
    "Y2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHht" +
    "cE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2N2M3NTAxYS04YmVlLTQ0M2Mt" +
    "YmRiNS04OGM2N2IxN2NhYzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUJCRTk4" +
    "Qjc4NjAwMTFFMzg3QUJDNEI4Mzk2QTRGQkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5p" +
    "aWQ6OUJCRTk4QjY4NjAwMTFFMzg3QUJDNEI4Mzk2QTRGQkQiIHhtcDpDcmVhdG9yVG9v" +
    "bD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRG" +
    "cm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NGE5ZDI0OTMtODk1NC00OGFkLTlh" +
    "MTgtZDAwM2MwYWNjNDJlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY3Yzc1MDFh" +
    "LThiZWUtNDQzYy1iZGI1LTg4YzY3YjE3Y2FjMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4g" +
    "PC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pqm89uYAAADM" +
    "SURBVHjaXJA9DoJAEIUH1M4TUHIFsCMGen9OwCGw1YRGW2ntKel0exsojHIBC0ouQAyU" +
    "viFDstmXfNmZeS+zm7XSNCXRFiRgJf0bXIHixpbhGdxBBJYC1w/xaA424MhNEATkui71" +
    "fU9KqfEU78UbD9PdbJRlOdae55GmhIP+1NV1TcMwkOM41DSNHvRtMhTHMRVFQW3b6mOL" +
    "gx99kue5GRp/gIOZuZGvNpTNwjD8oliANU+qqqKu6/TQBdymN57AHjzBT+B6Jx79BRgA" +
    "vc49kQA4yxgAAAAASUVORK5CYII=";

type Props = {
    children: React.ReactNode;
};

type State = {
    hover: boolean;
};

class InfoTip extends React.Component<Props, State> {
    state: State = {hover: false};

    handleMouseEnter: () => void = () => {
        this.setState({hover: true});
    };

    handleMouseLeave: () => void = () => {
        this.setState({hover: false});
    };

    render(): React.ReactNode {
        return (
            <div className={css(styles.infoTip)}>
                <img
                    alt=""
                    width={10}
                    height={10}
                    src={questionMark}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
                <div
                    className={css(styles.infoTipContainer)}
                    style={{display: this.state.hover ? "block" : "none"}}
                >
                    <div className={css(styles.infoTipTriangle)} />
                    <div
                        className={css(
                            styles.verticalShadow,
                            styles.infoTipContentContainer,
                        )}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoTip;
