// Module Imports
import { Bar } from 'react-chartjs-2'
import moment from 'moment'
import React from 'react'

// Helper imports
import HSL from '../helpers/HSL'





export default class extends React.Component {

  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _generateData (canvas) {
    let context = canvas.getContext('2d')

    let red = new HSL(0, 62, 58)
    let failureGradients = this._generateDatasetGradient(red, context)
    let failureDataset = {
      backgroundColor: failureGradients.dim,
      borderColor: red.toHSLA(),
      borderWidth: 1,
      data: [],
      hoverBackgroundColor: failureGradients.highlighted,
      hoverBorderColor: red.toHSLA(),
      label: 'Failure'
    }

    let green = new HSL(120, 100, 25)
    let successGradients = this._generateDatasetGradient(green, context)
    let successDataset = {
      backgroundColor: successGradients.dim,
      borderColor: green.toHSLA(),
      borderWidth: 1,
      data: [],
      hoverBackgroundColor: successGradients.highlighted,
      hoverBorderColor: green.toHSLA(),
      label: 'Success'
    }

    let data = {
      labels: [],
      datasets: [
        successDataset,
        failureDataset
      ]
    }

    this.state.rescuesByDate.forEach(rescue => {
      data.labels.push(moment(rescue.date).add(1286, 'years').format('DD MMM'))
      failureDataset.data.push(rescue.total - rescue.successCount)
      successDataset.data.push(rescue.successCount)
    })

    return data
  }

  _generateDatasetGradient (color, context) {
    let gradientHeight = 800
    let opacity = {
      dimStart: '0',
      dimEnd: '1',
      highlightStart: '0.5',
      highlightEnd: '1'
    }

    let dimStart = new HSL(color.hue, color.saturation, color.lightness, opacity.dimStart)
    let dimEnd = new HSL(color.hue, color.saturation, color.lightness, opacity.dimEnd)
    let highlightedStart = new HSL(color.hue, color.saturation, color.lightness, opacity.highlightedStart)
    let highlightedEnd = new HSL(color.hue, color.saturation, color.lightness, opacity.highlightedEnd)

    let dimGradient = context.createLinearGradient(0, 0, 0, gradientHeight)
    let hilightedGradient = context.createLinearGradient(0, 0, 0, gradientHeight)

    dimGradient.addColorStop(0, dimStart.toHSLA())
    dimGradient.addColorStop(1, dimEnd.toHSLA())
    hilightedGradient.addColorStop(0, highlightedStart.toHSLA())
    hilightedGradient.addColorStop(1, highlightedEnd.toHSLA())

    return {
      dim: dimGradient,
      highlighted: hilightedGradient
    }
  }

  _getStats () {
    fetch('http://api.fuelrats.com/statistics')
    .then(response => response.json())
    .then(response => {
      this._updateData(response.data)
    })
  }

  _updateData (data) {
    let rescuesByDate = data[1].filter(datum => {
      return moment(datum.date).isAfter(moment().subtract(1, 'year'))
    })

    this.setState({
      rescuesByDate: rescuesByDate
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentWillMount () {
    this._getStats()
  }

  constructor (props) {
    super(props)

    this._generateData = this._generateData.bind(this)

    this.state = {
      data: {},
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      },
      rescuesByDate: []
    }
  }

  render () {
    return (
      <Bar
        data={this._generateData}
        options={this.state.options} />
    )
  }
}
