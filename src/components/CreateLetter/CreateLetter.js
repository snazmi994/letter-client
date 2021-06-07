import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { createLetter } from '../../api/letter'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class CreateLetter extends Component {
  constructor () {
    super()

    this.state = {
      letter: {
        title: '',
        body: ''
      }
    }
  }

  componentDidMount () {
    this.props.onCreateLetterModalShow()
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props

    createLetter(this.state, user)
      .then(res => {
        this.setState({ letter: res.data.letter })
      })
      .then(() =>
        msgAlert({
          heading: 'Create post success',
          message: messages.createLetterSuccess,
          variant: 'success'
        }))
      .then(() => history.push('/letters'))
      .catch(error => {
        this.setState({ title: '', body: '' })
        msgAlert({
          heading: 'Create post failed with error: ' + error.message,
          message: messages.createLetterFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { title, body } = this.state
    return (
      <div>
        <Modal show={this.props.createLetterModal} onHide={this.props.onCreateLetterModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>I Wish I Could Have Told You</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-10 col-md-8 mx-auto mt-5">
                <h3></h3>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>Dear</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value={title}
                      placeholder="who is this addressed to?"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="body">
                    <Form.Label></Form.Label>
                    <Form.Control
                      required
                      name="body"
                      value={body}
                      type="textarea"
                      placeholder="..?"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default withRouter(CreateLetter)
