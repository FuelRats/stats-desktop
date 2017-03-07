// Module Imports
import { Bar } from 'react-chartjs-2'
import moment from 'moment'
import React from 'react'





// Helper imports
import HSL from '../helpers/HSL'





// Component imports
import RescuesByDate from './RescuesByDate'





export default class extends React.Component {

  /***************************************************************************\
    Private Methods
  \***************************************************************************/

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
      data: data,
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

    this.state = {
      data: {},
      rescuesByDate: []
    }
  }

  render () {
    console.log('rendering OverallStats')

    return (
      <div>
        <RescuesByDate data={this.state.rescuesByDate} />
      </div>
    )
  }
}
