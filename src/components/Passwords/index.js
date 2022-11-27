import {v4} from 'uuid'
import {Component} from 'react'

import PasswordItem from '../PasswordItem'
import './index.css'

class Passwords extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isActive: false,
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const newPassword = {
      id: v4(),
      website,
      password,
      username,
    }

    this.setState(prevSate => ({
      passwordsList: [...prevSate.passwordsList, newPassword],
      website: '',
      password: '',
      username: '',
    }))
  }

  renderNoPasswords = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="password-image"
      />
      <p className="your-password">No Passwords</p>
    </div>
  )

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const filteredResults = passwordsList.filter(each => each.id !== id)

    this.setState({passwordsList: filteredResults})
  }

  renderPasswords = () => {
    const {passwordsList, searchInput, isActive} = this.state

    const searchResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const searchResultsLength = searchResults.length > 0

    if (searchResultsLength) {
      return (
        <ul className="passwords-list-container">
          {searchResults.map(eachPassword => (
            <PasswordItem
              key={eachPassword.id}
              passwordDetails={eachPassword}
              onDeletePassword={this.onDeletePassword}
              isActive={isActive}
            />
          ))}
        </ul>
      )
    }
    return this.renderNoPasswords()
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevSate => ({
      isActive: !prevSate.isActive,
    }))
  }

  render() {
    const {passwordsList, website, username, password, searchInput} = this.state

    const passwordCount = passwordsList.length > 0

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-container">
          <div className="form-container">
            <form onSubmit={this.onAddPassword}>
              <h1 className="form-title">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
                <hr className="separator" />
                <input
                  type="text"
                  className="input-text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
                <hr className="separator" />
                <input
                  type="text"
                  className="input-text"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
                <hr className="separator" />
                <input
                  type="password"
                  className="input-text"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button-add">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="top-image"
          />
        </div>

        <div className="bottom-container">
          <div className="search-count-container">
            <div className="password-count-head">
              <h1 className="your-password">Your Passwords</h1>
              <p className="your-password-count">{passwordsList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="icon"
              />
              <hr className="separator" />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox-input"
              id="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox" className="show-password-title">
              Show Passwords
            </label>
          </div>
          {passwordCount ? this.renderPasswords() : this.renderNoPasswords()}
        </div>
      </div>
    )
  }
}

export default Passwords
