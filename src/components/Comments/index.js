import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    if (nameInput !== '' && commentInput !== '') {
      const initialBackgroundColorClassName =
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ]
      const newComment = {
        id: uuidv4(),
        name: nameInput,
        comment: commentInput,
        date: new Date(),
        isLiked: false,
        initialClassName: initialBackgroundColorClassName,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        nameInput: '',
        commentInput: '',
      }))
    }
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state
    const commentsCount = commentsList.length

    return (
      <div className="comments-app">
        <h1 className="app-title">Comments</h1>
        <p className="app-description">Say Something about 4.0 Technologies</p>
        <div className="comment-input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comments-image"
          />
          <form className="form" onSubmit={this.onAddComment}>
            <input
              type="text"
              placeholder="Your Name"
              className="input"
              value={nameInput}
              onChange={this.onChangeNameInput}
            />
            <textarea
              placeholder="Your Comment"
              className="textarea"
              value={commentInput}
              onChange={this.onChangeCommentInput}
            />
            <button type="submit" className="add-button">
              Add Comment
            </button>
          </form>
        </div>
        <hr className="separator" />
        <p className="comments-count">
          <span className="count">{commentsCount}</span> Comments
        </p>
        <ul className="comments-list">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              toggleLike={this.toggleLike}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
