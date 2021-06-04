import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import ShowLetters from './components/ShowLetters/ShowLetters'
import CreateLetter from './components/CreateLetter/CreateLetter'
import EditLetter from './components/EditLetter/EditLetter'
import DeleteLetter from './components/DeleteLetter/DeleteLetter'
import CreateComment from './components/CreateComment/CreateComment'
import EditComment from './components/EditComment/EditComment'
import DeleteComment from './components/DeleteComment/DeleteComment'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      signUpModal: true,
      signInModal: true,
      changePasswordModal: true,
      createLetterModal: true,
      editLetterModal: true,
      createCommentModal: true,
      editCommentModal: true
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  onSignUpModalShow = () => {
    this.setState({ signUpModal: true })
  }

  onSignUpModalClose = () => {
    this.setState({ signUpModal: false })
  }
  onSignInModalShow = () => {
    this.setState({ signInModal: true })
  }

  onSignInModalClose = () => {
    this.setState({ signInModal: false })
  }

  onChangePasswordModalShow = () => {
    this.setState({ changePasswordModal: true })
  }

  onChangePasswordModalClose = () => {
    this.setState({ changePasswordModal: false })
  }

  onCreateLetterModalShow = () => {
    this.setState({ createLetterModal: true })
  }

  onCreateLetterModalClose = () => {
    this.setState({ createLetterModal: false })
  }
  onEditLetterModalShow = () => {
    this.setState({ editLetterModal: true })
  }

  onEditLetterModalClose = () => {
    this.setState({ editLetterModal: false })
  }

  onCreateCommentModalShow = () => {
    this.setState({ createCommentModal: true })
  }

  onCreateCommentModalClose = () => {
    this.setState({ createCommentModal: false })
  }

  onEditCommentModalShow = () => {
    this.setState({ editCommentModal: true })
  }

  onEditCommentModalClose = () => {
    this.setState({ editCommentModal: false })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} onSignUpModalShow={this.onSignUpModalShow} onSignUpModalClose={this.onSignUpModalClose} signUpModal={this.state.signUpModal}/>
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} onSignInModalShow={this.onSignInModalShow} onSignInModalClose={this.onSignInModalClose} signInModal={this.state.signInModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} onChangePasswordModalShow={this.onChangePasswordModalShow} onChangePasswordModalClose={this.onChangePasswordModalClose} changePasswordModal={this.state.changePasswordModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/letters' render={() => (
            <ShowLetters msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-letter' render={() => (
            <CreateLetter msgAlert={this.msgAlert} user={user} onCreateLetterModalShow={this.onCreateLetterModalShow} onCreateLetterModalClose={this.onCreateLetterModalClose} createLetterModal={this.state.createLetterModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/letters/:id/edit-letter' render={() => (
            <EditLetter msgAlert={this.msgAlert} user={user} onEditLetterModalShow={this.onEditLetterModalShow} onEditLetterModalClose={this.onEditLetterModalClose} editLetterModal={this.state.editLetterModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/letters/:id/delete-letter' render={() => (
            <DeleteLetter msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/create-comment/:postId' render={() => (
            <CreateComment msgAlert={this.msgAlert} user={user} onCreateCommentModalShow={this.onCreateCommentModalShow} onCreateCommentModalClose={this.onCreateCommentModalClose} createCommentModal={this.state.createCommentModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/comments/:commentId/edit-comment/:postId' render={() => (
            <EditComment msgAlert={this.msgAlert} user={user} onEditCommentModalShow={this.onEditCommentModalShow} onEditCommentModalClose={this.onEditCommentModalClose} editCommentModal={this.state.editCommentModal}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/comments/:commentId/delete-comment/:postId' render={() => (
            <DeleteComment msgAlert={this.msgAlert} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
