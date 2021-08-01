import React from "react";
import { Line } from "react-chartjs-2";

class ChartLine extends React.Component {
    render () {
        const {data} = this.props;
        return (
            <Line data={data} />
        );
    }
}

export default ChartLine;