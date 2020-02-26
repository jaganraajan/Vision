import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const chartConfigs = {
  type: 'angulargauge',
  width: 400,
  height: 400,
  dataFormat: 'json',
  dataSource: {
    "chart": {
      "caption": "Nordstorm's Customer Satisfaction Score for 2017",
      "lowerLimit": "0",
      "upperLimit": "100",
      "showValue": "1",
      "numberSuffix": "%",
      "theme": "fusion",
      "showToolTip": "0"
    },
    "colorRange": {
      "color": [
        {
          "minValue": "0",
          "maxValue": "50",
          "code": "#F2726F"
        },
        {
          "minValue": "50",
          "maxValue": "75",
          "code": "#FFC533"
        },
        {
          "minValue": "75",
          "maxValue": "100",
          "code": "#62B58F"
        }
      ]
    },
    "dials": {
      "dial": [
        {
          "value": "81"
        }
      ]
    }
  },
};

class Gauge extends Component {
  render () {
    return <ReactFC {...chartConfigs} />;
  }
}

export default Gauge
