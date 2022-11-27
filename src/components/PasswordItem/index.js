import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword, isActive} = props
  const {id, website, username, password} = passwordDetails

  const initialLetter = website.slice(0, 1).toUpperCase()

  const onClickDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-item">
      <h1 className="intial-container">{initialLetter}</h1>
      <div className="details-container">
        <p className="details">{website}</p>
        <p className="details">{username}</p>
        {isActive ? (
          <p className="details">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDelete}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
