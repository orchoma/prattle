import PostInput from './PostInput'
import PopUpPost from './PopUpPost'


const PopUp = ({user, setOpenPopUp, popUpFeedPosts, text, setText, postPost}) => {

    return(
        <div className="popup">

            <p onClick={() => setOpenPopUp(false)}>X</p>
            {popUpFeedPosts?.map(popUpFeedPost => 
            
            <PopUpPost
                key={popUpFeedPost.id}
                popUpFeedPost = {popUpFeedPost}

            />)}

            <PostInput
            
            user={user}
            text={text}
            setText={setText} 
            postPost={postPost}

            />

        </div>
    )
}

export default PopUp