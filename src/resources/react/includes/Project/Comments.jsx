import { Avatar, Button, Textarea } from "@mantine/core"
import React from 'react'
import { ImCross } from 'react-icons/im'
import { ProjectContext } from "../../routes/Project"
import { isAdmin, userId } from '../../service/Auth'
import MainService from "../../service/MainService"
import RoleService from "../../service/RoleService"

function Comments ({premium}) {

  const {comments, id, project} = React.useContext(ProjectContext)

  // if (!premium) return (
  //   <div>
  //     У вас нет премиум аккаунта
  //   </div>
  // ) 

  const [comment, setComment] = React.useState({
    project_id: id,
    value: ''
  })

  const addComment = e => {
    if (userId() == project?.user?.id)
    RoleService.addDiary2(comment)
    .then(e => {
      console.log(e);
    })
    .catch(e => {
      console.log(e); 
    })
  }

  const deleteComment = e => {

  }

  
  return (
    <div className="w-full">
      <div className="flex flex-col">
        {comments.map(comment => { 
          return <Comment comment={comment} /> 
        })}
      </div>
      <div>
        <Textarea value={comment.value} onChange={e => setComment({...comment, value: e})} />
        <Button onClick={addComment} />
      </div>
    </div>
  )
}

const Comment = ({comment}) => {
  return (
  <div className="w-full flex">
    <div>
      <Avatar src={comment.image}/>
    </div>
    <div className="flex flex-col">
      <div>
        <span></span>
        <p></p>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  </div>
  )
}

export default Comments


// <>
// {deleteComment && commentId == comment?.id 
//   ? <div className="comment-delete-action">
//       <p>
//         Вы действительно хотите удалить комментарий
//       </p>
//       <div>
//         <button onClick={e => deleteComent(comment.id)}>
//           Да
//         </button>
//         <button onClick={e => setDeleteComment(false)}>
//           Нет
//         </button>
//       </div>
//     </div>
//   : <div className="comment">
//       <div className="commentor-img">
//         <img 
//           src={comment.user.image ?? defaultAvatar} 
//           alt=""
//           onClick={e => selectUser(comment?.user.name)} />
//           {authorId == comment?.user?.id
//             ? <span>Автор</span>
//             : null}
//       </div>
//       <div className="comment-main">
//         <div className="commentor">
//           <article 
//             className="commentor-name" 
//             onClick={e => selectUser(comment?.user.name)}>
//             {comment?.user.name}
//           </article>
//           <span> {date.toLocaleString()}</span>
//         </div>
//         <p className="comment-body">
//           {comment?.comment}
//         </p>
//         <p className="comment-response" onClick={e => selectUser(comment.user.name)}>ответить</p>
//         {userId == comment?.user?.id || isAdmin()
//         ? <i className="comment-remove" onClick={e => handleCommentId(comment.id)}>
//             <ImCross/>
//           </i>
//         : null}
//       </div>
//     </div>
//   }
// </>
