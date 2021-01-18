import React, { Component } from 'react'
import {
  Button,
  Tag
} from "antd";
import moment from 'moment'

export default class Profilecard extends Component {
  showMap = () => {
    const { profile } = this.props
    this.props.setUpLocationShow(profile)
  }

  render() {
    const {
      profile
    } = this.props

    return (
      <div className="profilecard">
        <div className="card-details">
          <div className="details">
            <p className="title">
              Name
          </p>
            <p className="value">
              {`${profile.FirstName} ${profile.LastName}`}
            </p>
            <p className="title">
              Username
          </p>
            <p className="value">
              {profile.UserName}
            </p>
            <p className="title">
              Gender
          </p>
            <p className="value">
              {profile.Gender}
            </p>
            <p className="title">
              Email
          </p>
            <p className="value">
              {profile.Email}
            </p>
            <p className="title">
              Phone Number
          </p>
            <p className="value">
              {profile.PhoneNumber}
            </p>
          </div>
          <div className="details">
            <p className="title">
              URL
          </p>
            <p className="value">
              {profile.URL}
            </p>
            <p className="title">
              Domain Name
          </p>
            <p className="value">
              {profile.DomainName}
            </p>
            <p className="title">
              MacAddress
          </p>
            <p className="value">
              {profile.MacAddress}
            </p>
            <p className="title">
              Payment Method
          </p>
            <p className="value">
              <Tag
                className="tag-text"
                color={
                  profile.PaymentMethod === 'cc' ?
                    "cyan"
                    :
                    profile.PaymentMethod === 'paypal' ?
                      "blue"
                      :
                      profile.PaymentMethod === 'check' ?
                        "purple"
                        :
                        "geekblue"
                }
              >{profile.PaymentMethod}</Tag>
            </p>
            <p className="title">
              Last Login
          </p>
            <p className="value">
              {moment(profile.LastLogin).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => this.showMap()}>
          Show Location
        </Button>
      </div>
    )
  }
}
