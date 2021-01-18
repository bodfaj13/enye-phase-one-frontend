import React, { Component } from 'react'
import Header from '../../components/homepage/header/header'
import Main from '../../components/homepage/main/main'

export default class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <Header />
        <Main />
      </div>
    )
  }
}
