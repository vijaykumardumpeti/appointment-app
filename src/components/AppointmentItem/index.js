import {Component} from 'react'

import {format} from 'date-fns'

import './index.css'

export default class AppointmentItem extends Component {
  render() {
    const {eachObject, key, onChangeState} = this.props
    const {title, id, isStarred, date} = eachObject

    this.onChangeStarred = () => {
      onChangeState(id)
    }

    const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const imageUrl = isStarred
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    return (
      <li key={key} className="list-item-container">
        <div className="title-star-container">
          <p className="title-heading">{title}</p>
          <button
            onClick={this.onChangeStarred}
            className="star-button"
            type="button"
          >
            <img alt="star" src={imageUrl} />
          </button>
        </div>
        <div className="date-container">
          <p>{formatDate}</p>
        </div>
      </li>
    )
  }
}
