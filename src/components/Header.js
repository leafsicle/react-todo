import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
  let onClick = () => {
    console.log('clicked on +')
  }

  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color='green' text='Add' onClick={onClick} />
    </header>
  )
}
Header.defaultProps = {
  title: 'Task Tracker',
}
Header.protoType = {
  title: PropTypes.string.isRequired,
}

export default Header
