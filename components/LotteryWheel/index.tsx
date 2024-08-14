import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import { Box } from '@chakra-ui/react';
import { colors } from '@/themes';
import { ellipseMiddle } from '@/utils/formatAddress';

interface IProps {
  dataSeries: any;
  totalPoint: number;
  endAt: number; // Pass in the endAt time
  winner: any;
}

const LotteryWheel = ({ dataSeries, totalPoint, endAt, winner }: IProps) => {
  const trigger = useRef(null);
  const [chart, setChart] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningInterval, setSpinningInterval] = useState<any>(null);

  const radToDeg = (r: number) => (r * 180) / Math.PI;

  const findWinner = (data: any) => {
    const sliceSize = 360 / data.length;
    const winThreshold = 360 - sliceSize;
    let sliceBeginning;

    for (let i in data) {
      sliceBeginning = radToDeg(data[i].shapeArgs.start) + 90;

      if (sliceBeginning > 360) {
        sliceBeginning -= 360;
      }

      if (sliceBeginning > winThreshold) {
        return i;
      }
    }
    return -1;
  };

  const startSpinning = (chart: any) => {
    if (trigger.current && chart.series && chart.series[0] !== undefined) {
      let startAngle = chart.series[0].options.startAngle;
      const spin = () => {
        startAngle += 5;
        if (startAngle > 360) {
          startAngle -= 360;
        }
        chart.series[0].update({ startAngle });
      };

      setIsSpinning(true);
      const interval = setInterval(spin, 25);
      setSpinningInterval(interval);
    }
  };

  const stopSpinning = (chart: any) => {
    if (spinningInterval) {
      clearInterval(spinningInterval);
      setSpinningInterval(null);
      setIsSpinning(false);
    }

    if (chart && winner) {
      const winnerIndex = dataSeries.findIndex(
        (item: any) => item.user.address === winner.address
      );

      if (winnerIndex !== -1) {
        const sliceSize = 360 / dataSeries.length;
        const targetAngle = 360 - sliceSize * winnerIndex;
        let startAngle = chart.series[0].options.startAngle;

        const slowSpin = () => {
          if (startAngle >= targetAngle - 5 && startAngle <= targetAngle + 5) {
            // eslint-disable-next-line no-use-before-define
            clearInterval(slowSpinInterval);
            chart.setTitle({
              text: `The winner is ${ellipseMiddle(winner.address, 3, 3)}!`,
            });
          } else {
            startAngle += (targetAngle - startAngle) * 0.05;
            chart.series[0].update({ startAngle });
          }
        };

        const slowSpinInterval = setInterval(slowSpin, 25);
      }
    }
  };

  const redrawChart = () => {
    if (chart) {
      chart.series[0].setData(
        dataSeries.length === 0
          ? [
              {
                name: '',
                y: 100,
                color: '#CCCCCC',
              },
            ]
          : dataSeries.map((item: any, index: number) => ({
              name: ellipseMiddle(item.user.address, 3, 3),
              y: (item.stakedAmount / totalPoint) * 100,
              color:
                colors.secondary[
                  (index * 100) as keyof typeof colors.secondary
                ],
            }))
      );
    }
  };

  const handleDrawChart = () => {
    if (trigger.current) {
      let triangle: any;
      let chart = Highcharts.chart('chart-wheel', {
        chart: {
          animation: false,
          backgroundColor: 'transparent',
          events: {
            resize: function () {
              triangle.destroy();
              triangle = chart.renderer
                .path([
                  ['M', chart.chartWidth / 2 - 10, chart.plotTop - 5],
                  ['L', chart.chartWidth / 2 + 10, chart.plotTop - 5],
                  ['L', chart.chartWidth / 2, chart.plotTop + 10],
                  ['Z'],
                ])
                .attr({
                  fill: colors.secondary[100],
                })
                .add();
            },
            render: function (this: any) {
              if (this.customCircles) {
                this.customCircles.destroy();
                this.customCircles = undefined;
              }
              let ren = this.renderer,
                centerX = this.plotLeft + this.plotSizeX / 2,
                centerY = this.plotTop + this.plotSizeY / 2,
                radius = [this.series[0].data[0].shapeArgs.r + 6];
              this.customCircles = this.renderer.g('customCircles').add();

              radius.forEach(rad => {
                ren
                  .circle(centerX, centerY, rad)
                  .attr({
                    fill: 'none',
                    stroke: '#E8B77C1A',
                    'stroke-width': 6,
                  })
                  .add(this.customCircles);
              });

              ren
                .circle(
                  centerX,
                  centerY,
                  this.series[0].data[0].shapeArgs.innerR
                )
                .attr({
                  fill: 'transparent',
                  stroke: 'none',
                })
                .add(this.customCircles);
            },
          },
        },
        accessibility: {
          enabled: false,
          point: {
            valueSuffix: '%',
          },
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        title: {
          text: '',
          enabled: false,
        },
        series: [
          {
            type: 'pie',
            size: '100%',
            dataLabels: {
              distance: -20,
            },
            innerSize: '70%',
            data:
              dataSeries.length === 0
                ? [
                    {
                      name: '',
                      y: 100,
                      color: '#CCCCCC',
                    },
                  ]
                : dataSeries.map((item: any, index: number) => ({
                    name: ellipseMiddle(item.user.address, 3, 3),
                    y: (item.stakedAmount / totalPoint) * 100,
                    color:
                      colors.secondary[
                        ((index + 1) * 100) as keyof typeof colors.secondary
                      ],
                  })),
            startAngle: dataSeries.length === 0 ? 0 : 360 * Math.random(),
          },
        ],
        credits: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            size: '100%',
            allowPointSelect: true,
            cursor: 'pointer',
            borderRadius: 0,
            borderWidth: '0',
            dataLabels: {
              enabled: true,
              format: `<b>{point.name}</b><br>{point.percentage:.1f} %`,
              distance: -50,
              filter: {
                property: 'percentage',
                operator: '>',
                value: 4,
              },
            },
          },
        },
      } as any);

      triangle = chart.renderer
        .path([
          ['M', chart.chartWidth / 2 - 20, chart.plotTop - 10],
          ['L', chart.chartWidth / 2 + 20, chart.plotTop - 10],
          ['L', chart.chartWidth / 2, chart.plotTop + 20],
          ['Z'],
        ])
        .attr({
          fill: '#DFAA6C',
          zIndex: 100,
        })
        .add();
      setChart(chart);
    }
  };

  useEffect(() => {
    handleDrawChart();
  }, [trigger.current]);

  useEffect(() => {
    if (chart) {
      handleDrawChart();
    }
  }, [dataSeries]);

  useEffect(() => {
    if (chart && !isSpinning && dataSeries.length >= 3) {
      const timeToSpin = endAt - Date.now();
      if (timeToSpin > 0) {
        setTimeout(() => {
          startSpinning(chart);
        }, timeToSpin);
      } else {
        startSpinning(chart);
      }
    }
    if (chart && winner) {
      stopSpinning(chart);
    }
  }, [endAt, chart, dataSeries, winner]);

  return (
    <Box
      width={{ lg: '500px', base: '300px' }}
      height={{ lg: '500px', base: '300px' }}
      id="chart-wheel"
      ref={trigger}
    ></Box>
  );
};

export default LotteryWheel;
