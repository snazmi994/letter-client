import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showLetters, deleteLetter } from '../../api/letter'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class ShowLetters extends Component {
  constructor () {
    super()

    this.state = {
      letters: null,
      owner: false
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    showLetters(user)
      .then(res => {
        this.setState({ letters: res.data.letters })
      })
      .catch(error => {
        this.setState({ letters: null })
        msgAlert({
          heading: 'Show all letters failed with error: ' + error.message,
          message: messages.showLettersFailure,
          variant: 'danger'
        })
      })
  }

  deleteLetter = (letterId) => {
    const { msgAlert, user } = this.props
    deleteLetter(user, letterId)
      .then(() =>
        msgAlert({
          heading: 'Letter was successfully deleted!',
          message: messages.deleteLetterSuccess,
          variant: 'success'
        }))
      .then(() => history.push('/letters'))
      .catch(error => {
        this.setState({ letters: null })
        msgAlert({
          heading: 'Delete Letter failed with error: ' + error.message,
          message: messages.deleteLetterFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let lettersJsx = ''
    if (this.state.letters === null) {
      lettersJsx = (
        <p>Loading...</p>
      )
    } else if (this.state.letters.length === 0) {
      lettersJsx = (
        <p>There are no letters to display.</p>
      )
    } else {
      lettersJsx = (
        <div>
          {this.state.letters.map(letter => (
            <div key={letter._id}>
              <Card className="text-left">
                <Card.Body>
                  <Card.Title>{letter.title}</Card.Title>
                  <Card.Text>
                    {letter.body}
                  </Card.Text>
                  {this.props.user._id === letter.owner ? <Button href={`#/letters/${letter._id}/edit-letter`}>
                 Edit</Button> : ''}
                  {this.props.user._id === letter.owner ? <Button href={`#/letters/${letter._id}/delete-letter`}>
                 Delete</Button> : ''}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )
    }
    return (
      <Fragment>
        <h1>Thoughts and Well Wishes</h1>
        {lettersJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowLetters)
