import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { deleteLetter } from '../../api/letter'

class DeleteLetter extends Component {
  constructor () {
    super()

    this.state = {
      delete: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    const { id } = this.props.match.params
    deleteLetter(user, id)
      .then(() => {
        this.setState({ delete: true })
        msgAlert({
          heading: 'Post was successfully deleted!',
          message: messages.deleteLetterSuccess,
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Delete post failed with error: ' + error.message,
          message: messages.deleteLetterFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div>
        {this.state.delete ? <Redirect to="/letters" /> : ''}
      </div>
    )
  }
}

export default withRouter(DeleteLetter)
