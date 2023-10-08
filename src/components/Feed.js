import Post from './Post'


const Feed = ({user, setOpenPopUp, filteredPosts, getPosts, setInteractingPost, changeLikeStyle}) => {
    return(
        <div className="feed">

            {filteredPosts?.map(filteredPost => 

            <Post 
            key={filteredPost.id} 
            setOpenPopUp = {setOpenPopUp}
            user={user} 
            filteredPost={filteredPost}
            getPosts = {getPosts}
            setInteractingPost = {setInteractingPost}
            changeLikeStyle={changeLikeStyle}
            
            />)}

        </div>
    )
}

export default Feed