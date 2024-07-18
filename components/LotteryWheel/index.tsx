import React, { useEffect, useRef } from 'react';
import Highcharts, { pad } from 'highcharts';

import { Box } from '@chakra-ui/react';
import { colors } from '@/themes';
import { ellipseMiddle } from '@/utils/formatAddress';
interface IProps {
  dataSeries: any;
  totalPoint: number;

  timer: number;
  winner?: string;
}
const LotteryWheel = ({ dataSeries, totalPoint, timer }: IProps) => {
  const trigger = useRef(null);
  const radToDeg = (r: number) => (r * 180) / Math.PI;
  const findWinner = (data: any) => {
    //random Here
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
    if (chart) {
      let strengthSlider = 0;
      let dragSlider = 0;
      let lengthSlider = 10;
      let animationSlider = 25;
      let t;
      chart.setTitle({
        text: 'Spinning...',
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
              text: 'Waiting ...',
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
                text: '',
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
  const updateCircle = (newTimer: number) => {
    if (chart) {
      if (chart.customOverlay) {
        chart.customOverlay.destroy();
        chart.customOverlay = undefined;
      }
      const centerX = chart.plotLeft + chart.plotSizeX / 2;
      const centerY = chart.plotTop + chart.plotSizeY / 2;
      const radius = chart.series[0].data[0].shapeArgs.r + 6;
      const angle = newTimer * dataSeries.length * (Math.pow(Math.PI, 2) / 360);

      const overlayArc = chart.renderer
        .arc(centerX, centerY, radius, radius, 0, angle)
        .attr({
          fill: 'none',
          stroke: '#DFAA6C',
          'stroke-width': 6,
          zIndex: 13,
        });

      chart.customOverlay = chart.renderer.g('timer-atemu').add();
      overlayArc.add(chart.customOverlay);
    }
  };
  useEffect(() => {
    if (trigger.current) {
      // Create the chart
      let triangle: any;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      chart = Highcharts.chart('chart-wheel', {
        chart: {
          // animation: {
          //   duration: 500,
          // },
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
            render: function (this: any) {
              if (this.customCircles) {
                this.customCircles.destroy();
                this.customCircles = undefined;
              }
              //Declare data
              let ren = this.renderer,
                centerX = this.plotLeft + this.plotSizeX / 2,
                centerY = this.plotTop + this.plotSizeY / 2,
                radius = [this.series[0].data[0].shapeArgs.r + 6];
              this.customCircles = this.renderer.g('customCircles').add();

              //Render custom circles
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

              // Cover the inner border
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
          point: {
            valueSuffix: '%',
          },
        },
        tooltip: {
          pointFormat: 'Point Percentage: <b>{point.percentage:.1f}%</b>',
        },
        title: {
          // text: totalPoint,
          text: timer,
          verticalAlign: 'middle',
          floating: true,
          style: {
            fontSize: '68px',
            color: colors.primary[100],
          },
        },
        series: [
          {
            states: {
              hover: {
                halo: {
                  attributes: {
                    fill: 'none',
                    // 'stroke-width': 1,
                    // stroke: 'white',
                  },
                },
              },
            },
            type: 'pie',
            size: '100%',
            dataLabels: {
              distance: -50,
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

      // Create the arrow at the top.
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
    }

    const countdown = setInterval(() => {
      if (timer > 0) {
        timer--;
        chart.setTitle({
          text: timer.toString(),
        });
        updateCircle(timer);
      } else {
        findTheWinner();
        clearInterval(countdown);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

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
