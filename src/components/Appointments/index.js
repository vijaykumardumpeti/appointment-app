// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

export default class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isClicked: false,
  }

  onUpdateState = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onChangeState = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachObject => {
        if (eachObject.id === id) {
          return {
            ...eachObject,
            isStarred: !eachObject.isStarred,
          }
        }
        return eachObject
      }),
    }))
  }

  filterStarredAppointments = () => {
    const {isClicked} = this.state
    this.setState({
      isClicked: !isClicked,
    })
  }

  render() {
    const {appointmentsList, title, date, isClicked} = this.state

    let fileteredList
    if (isClicked) {
      fileteredList = appointmentsList.filter(
        eachObject => eachObject.isStarred === true,
      )
    } else {
      fileteredList = appointmentsList.filter(
        eachObject => eachObject.isStarred === false,
      )
    }

    return (
      <div className="bg-container">
        <div className="white-container">
          <div className="container-1">
            <div className="heading-form-container">
              <h1>Add Appointment</h1>
              <form onSubmit={this.onUpdateState} className="form-container">
                <div className="input-1-container">
                  <label htmlFor="title-input">TITLE</label>
                  <input
                    onChange={this.onChangeTitle}
                    value={title}
                    className="input-1-style"
                    id="title-input"
                    type="text"
                  />
                </div>
                <div className="input-2-container">
                  <label htmlFor="date-input">DATE</label>
                  <input
                    onChange={this.onChangeDate}
                    value={date}
                    className="input-2-style"
                    id="date-input"
                    type="date"
                  />
                </div>
                <button className="button-text1" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                className="image-big"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          <div className="container-2">
            <div className="container-2-1">
              <div className="para-container">
                <h1 className="heading-appointments">Appointments</h1>
              </div>
              <div className="button-container">
                <button
                  onClick={this.filterStarredAppointments}
                  className="button-text2"
                  type="button"
                >
                  Starred
                </button>
              </div>
            </div>
            <ul className="unordered-list-container">
              {fileteredList.map(eachObject => (
                <AppointmentItem
                  onChangeState={this.onChangeState}
                  eachObject={eachObject}
                  key={eachObject.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
