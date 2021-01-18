import React, { Component } from 'react'
import {
  Row,
  Col,
  message,
  Input,
  Select,
  Modal,
  Pagination,
  BackTop,
  Form
} from 'antd'
import axios from 'axios'
import { baseurl } from '../../../config/index'
import {
  LoadingOutlined,
  SearchOutlined
} from '@ant-design/icons'
import Profilecard from './profilecard'
import Location from "./map";
import { lowerCaseAndTrim } from '../../../utils/index';

const { Option } = Select;

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      profiles: [],
      paymentMethods: [],
      gender: [],
      isModalVisible: false,
      currentProfile: null,
      currentPage: 1,
      search: false,
      searchText: '',
      showing: [],
      genderValue: '',
      paymentMethodValue: ''
    }
  }

  componentDidMount() {
    this.getProfiles()
  }

  // get profiles
  getProfiles = () => {
    this.setState({
      loading: true
    })
    axios.get(`${baseurl}/challenge/records`)
      .then((res) => {
        // get all existing payment methods and gender
        let gender = []
        let paymentMethods = []

        for (let index = 0; index < res.data.records.profiles.length; index++) {
          const element = res.data.records.profiles[index];
          if (!paymentMethods.includes(element.PaymentMethod)) {
            paymentMethods.push(element.PaymentMethod)
          }
          if (!gender.includes(element.Gender)) {
            gender.push(element.Gender)
          }
        }

        this.setState({
          loading: false,
          profiles: res.data.records.profiles,
          showing: res.data.records.profiles,
          paymentMethods,
          gender
        })

      })
      .catch((err) => {
        this.setState({
          loading: false
        })
        message.error('Something went wrong!')
      })
  }

  setUpLocationShow = (profile) => {
    console.log(profile)
    this.setState({
      currentProfile: profile,
      isModalVisible: true
    })
  }

  closeModal = () => {
    this.setState({
      currentProfile: null,
      isModalVisible: false
    })
  }

  // pagination change
  onPageChange = page => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.setState({
      currentPage: page
    });
  }


  // search
  startSearch = (e) => {
    const { profiles } = this.state
    let searchText = e.target.value
    this.setState({
      searchText: e.target.value
    }, () => {
      if (lowerCaseAndTrim(searchText).length > 0) {
        let input = lowerCaseAndTrim(searchText)
        let results = profiles.filter((profile) => lowerCaseAndTrim(profile.LastName).includes(input) || lowerCaseAndTrim(profile.FirstName).includes(input))
        console.log(results)
        this.setState({
          search: true,
          showing: results
        })
      } else {
        this.setState({
          search: false,
          showing: profiles
        })
      }
    })
  }

  // handles gender filter
  handleFilterGender = (value) => {
    const { profiles } = this.state
    this.setState({
      searchText: '',
      search: false,
      genderValue: value,
      paymentMethodValue: ''
    })
    if (value === undefined) {
      this.setState({
        showing: profiles
      })
    } else {
      let results = profiles.filter((item) => item.Gender === value)
      this.setState({
        showing: results
      })
    }
  }

  // handles payment method filter
  handleFilterPaymentMethod = (value) => {
    const { profiles } = this.state
    this.setState({
      searchText: '',
      search: false,
      paymentMethodValue: value,
      genderValue: ''
    })
    if (value === undefined) {
      this.setState({
        showing: profiles
      })
    } else {
      let results = profiles.filter((item) => item.PaymentMethod === value)
      this.setState({
        showing: results
      })
    }
  }

  render() {
    const {
      loading,
      paymentMethods,
      showing,
      gender,
      currentProfile,
      isModalVisible,
      currentPage,
      search,
      genderValue,
      paymentMethodValue
    } = this.state

    let start = (currentPage - 1) * 20
    let end = (20 * currentPage)
    let realEnd = end > showing.length ? showing.length : end

    return (
      <div className="main">
        {
          loading ?
            <div className="x-loader">
              <LoadingOutlined style={{ fontSize: 60 }} />
            </div>
            :
            <div className="main-holder">
              <Row gutter={32}>
                <Col lg={7} xs={24}>
                  <div className="filters">
                    <div className="input-search">
                      <h4>Search</h4>
                      <Form>
                        <Input
                          onChange={this.startSearch}
                          name="searchText"
                          size="large" placeholder="Search..." suffix={<SearchOutlined />} />
                      </Form>
                    </div>
                    <div className="filter-by">
                      <h4>Filter By Gender</h4>
                      <Select
                        allowClear
                        placeholder="Select gender"
                        onChange={this.handleFilterGender}
                        value={genderValue}
                      >
                        {
                          gender.map((item) => (
                            <Option
                              key={item}
                              value={item}
                            >{item}
                            </Option>
                          ))
                        }
                      </Select>
                    </div>
                    <div className="filter-by">
                      <h4>Filter By Payment Method</h4>
                      <Select
                        allowClear
                        placeholder="Select payment method"
                        onChange={this.handleFilterPaymentMethod}
                        value={paymentMethodValue}
                      >
                        {
                          paymentMethods.map((item) => (
                            <Option
                              key={item}
                              value={item}
                            >{item}
                            </Option>
                          ))
                        }
                      </Select>
                    </div>
                  </div>
                </Col>
                <Col lg={17} xs={24}>
                  <h2 className="profile-title">Profiles</h2>
                  {
                    search &&
                    <>
                      <h4 className="title">Search Result(s)</h4>
                      {
                        showing.length === 0 && <p className="none-found ">No profile found.</p>
                      }
                    </>
                  }
                  <div className="profile-holder">
                    {
                      showing.slice(start, realEnd).map((profile) => (
                        <Profilecard
                          setUpLocationShow={this.setUpLocationShow}
                          key={profile.PhoneNumber}
                          profile={profile}
                        />
                      ))
                    }
                  </div>
                  {
                    showing.length > 0 &&
                    <Pagination
                      defaultCurrent={currentPage}
                      total={showing.length}
                      onChange={this.onPageChange} defaultPageSize={20}
                    />
                  }
                </Col>
              </Row>

              {
                currentProfile !== null &&
                <Modal
                  title={<h2>{`${currentProfile.FirstName} ${currentProfile.LastName}'s Location`}</h2>}
                  visible={isModalVisible}
                  onOk={this.closeModal}
                  onCancel={this.closeModal}
                  footer={null}
                  className="map-modal"
                >
                  <Location
                    currentProfile={currentProfile} />
                </Modal>
              }

              <BackTop>
                <div className="backtotop">UP</div>
              </BackTop>
            </div>
        }
      </div>
    )
  }
}

