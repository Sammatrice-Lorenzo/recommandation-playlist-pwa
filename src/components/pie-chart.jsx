import { PieChart } from '@mui/x-charts'

export const PieChartGenresMusic = (props) => {
    return (
        <PieChart
            series={[
                {
                    data: props.data,
                    innerRadius: 40,
                    outerRadius: 60,
                    paddingAngle: 6,
                    cornerRadius: 8,
                    startAngle: -103,
                    endAngle: 270,
                    cx: 75,
                    cy: 75,
                },
            ]}
            colors={props.colors}
            width={props.width}
            height={props.height}
        >
            <text fill="white" x={80} y={75} textAnchor="middle" dominantBaseline="middle">
                {props.data[0].value}%
            </text>
        </PieChart>
    )
}