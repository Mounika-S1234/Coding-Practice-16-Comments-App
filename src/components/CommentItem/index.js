// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeImageAltText = isLiked ? 'liked' : 'like'

  const onClickLike = () => {
    toggleLike(id)
  }

  const onClickDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-header">
        <p className={`initial ${initialClassName}`}>{name[0]}</p>
        <div className="comment-content">
          <p className="name">{name}</p>
          <p className="comment">{comment}</p>
          <p className="date">{formatDistanceToNow(new Date(date))} ago</p>
        </div>
      </div>
      <div className="comment-footer">
        <button type="button" className="like-button" onClick={onClickLike}>
          <img
            src={likeImageUrl}
            alt={likeImageAltText}
            className="like-icon"
          />
          <p className="like-text">Like</p>
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={onClickDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
