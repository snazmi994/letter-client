import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { showLetters, deleteLetter } from '../../api/letter'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'

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
          heading: 'Show all posts failed with error: ' + error.message,
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
          heading: 'Post was successfully deleted!',
          message: messages.deleteLetterSuccess,
          variant: 'success'
        }))
      .then(() => history.push('/letters'))
      .catch(error => {
        this.setState({ letters: null })
        msgAlert({
          heading: 'Delete post failed with error: ' + error.message,
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
        <p>There are no posts to display.</p>
      )
    } else {
      lettersJsx = (
        <div>
          {this.state.letters.map(letter => (
            <div key={letter._id}>
              <div className="mx-auto mt-5">
                <Card border="primary" className="text-left">
                  <Card.Header as="h4">Post</Card.Header>
                  <Card.Body>
                    <Card.Title>{letter.title}</Card.Title>
                    <Card.Text>
                      {letter.body}
                    </Card.Text>
                    {this.props.user._id === letter.owner ? <Button size="sm" variant="edit" href={`#/letters/${letter._id}/edit-letter`}>
                    Edit</Button> : ''}
                    {this.props.user._id === letter.owner ? <Button size="sm" variant="delete" href={`#/letters/${letter._id}/delete-letter`}>
                    Delete</Button> : ''}
                    <Button size="sm" variant="add-comment" href={`#/create-comment/${letter._id}`}>
                    Add comment</Button>
                  </Card.Body>
                  <Card.Footer as="p" className="text-muted">{letter.updatedAt}</Card.Footer>
                </Card>
                {letter.comments.length > 0
                  ? <Accordion>
                    <Card border="primary">
                      <Card.Header>
                        <Accordion.Toggle size="sm" as={Button} variant="outline-info" eventKey="0">
                          Toggle comments on this post
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          {letter.comments.map(comment => (
                            <div key={comment._id}>
                              <Card.Body>
                                <p>{comment.content}</p>
                                {this.props.user._id === comment.owner ? <Button size="sm" variant="edit" href={`#/comments/${comment._id}/edit-comment/${letter._id}`}>
                              Edit</Button> : ''}
                                {this.props.user._id === comment.owner ? <Button size="sm" variant="delete" href={`#/comments/${comment._id}/delete-comment/${letter._id}`}>
                              Delete</Button> : ''}
                                <div className="comment-separator">
                                </div>
                              </Card.Body>
                            </div>
                          ))}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card bg="primary" border="primary">
                      <Card.Header>
                      </Card.Header>
                    </Card>
                  </Accordion> : ''}
              </div>
            </div>
          ))
          }
        </div>
      )
    }
    return (
      <Fragment>
        <h5 className="main-header">Lost Letters</h5>
        {lettersJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowLetters)
