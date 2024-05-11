import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

import { Box, Button } from '@chakra-ui/react';
import { colors } from '@/themes';
import { ellipseMiddle } from '@/utils/formatAddress';
interface IProps {
  dataSeries: any;
}
const LotteryWheel = ({ dataSeries }: IProps) => {
  const trigger = useRef(null);
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
  let chart: any;
  const findTheWinner = () => {
    //trigger.current && (trigger.current as any).chart
    if (chart) {
      let strengthSlider = 0;
      let dragSlider = 0;
      let lengthSlider = 10;
      let animationSlider = -25;
      let t; // animation
      //   let chart = (trigger.current as any).chart;

      chart.setTitle({
        text: 'Wheel is spinning...',
      });
      let physics = {
        force: 0,
        angleVel: 0,
        angle: 0,
        prevAngle: 0, // only used to calculate winner
        strength: 0.003 + strengthSlider / 10000, // tweakable
        drag: 0.98 + dragSlider / 1000, // tweakable
        threshold: 2 + lengthSlider / 10, // tweakable
        targ: 0,
        isActive: false,
      };

      // the current winner at which the wheel changes direction.
      let currentWinner = -1,
        foundPossibleWinner = false;

      // How many degrees to spin for each iteration
      let diff = 25 + Math.random() * 10,
        startAngle = chart.series[0].options.startAngle;

      const animationSpeed = Math.abs(animationSlider);
      t = setInterval(() => {
        // Animation loop
        if (!physics.isActive) {
          startAngle += diff;
          if (startAngle > 360) {
            startAngle -= 360;
          }
          diff *= 0.98;
          chart.series[0].update({ startAngle });

          if (diff < physics.threshold) {
            physics.isActive = true;

            physics.targ = startAngle;
            physics.angleVel = physics.threshold * 0.98;
            physics.angle = startAngle;
            chart.setTitle({
              text: 'Waiting to finish...',
            });
          }
        } else {
          // spring physics
          physics.prevAngle = physics.angle;
          physics.force = physics.targ - physics.angle;
          physics.force *= physics.strength;
          physics.angleVel *= physics.drag;
          physics.angleVel += physics.force;
          physics.angle += physics.angleVel;
          chart.series[0].update({ startAngle: physics.angle });

          if (physics.prevAngle >= physics.angle && currentWinner < 0) {
            currentWinner = Number(findWinner(chart.series[0].data));
            foundPossibleWinner = true;
          } else if (
            physics.prevAngle <= physics.angle &&
            foundPossibleWinner
          ) {
            const nextWinner = findWinner(chart.series[0].data);
            if (currentWinner == nextWinner) {
              chart.setTitle({
                text:
                  'The winner is ' +
                  chart.series[0].data[currentWinner].name +
                  '!',
              });
              foundPossibleWinner = false;
            } else {
              currentWinner = -1;
              foundPossibleWinner = false;
            }
          }
        }
      }, animationSpeed);
    }
  };

  useEffect(() => {
    if (trigger.current) {
      // Create the chart
      let triangle: any;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      chart = Highcharts.chart('chart-wheel', {
        chart: {
          animation: false,
          backgroundColor: 'transparent',
          margin: [0, 0, 0, 0],
          spacingTop: 0,
          spacingBottom: 0,
          spacingLeft: 0,
          spacingRight: 0,

          events: {
            resize: function () {
              triangle.destroy(); // Prevent arrow misplacement
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
          },
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        title: {
          text: 'Generating Randomness...',
          verticalAlign: 'middle',
          floating: true,
          style: {
            color: 'white',
          },
        },
        series: [
          {
            type: 'pie',
            size: '100%',
            dataLabels: {
              distance: -20,
            },
            innerSize: '70%',
            data: dataSeries.map((item: any, index: number) => {
              return {
                name: ellipseMiddle(item.address, 3, 3),
                y: item.percentage,
                color:
                  colors.secondary[
                    (index * 100) as keyof typeof colors.secondary
                  ],
              };
            }),

            startAngle: 360 * Math.random(),
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
            borderRadius: 5,

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

      // Create the arrow at the top.
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
    }
  }, []);
  return (
    <>
      <Box width="500px" height="500px" id="chart-wheel" ref={trigger}></Box>
      <Button onClick={findTheWinner}>Spin</Button>
    </>
  );
};

export default LotteryWheel;
