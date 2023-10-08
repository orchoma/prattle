import Post2 from "./Post2"

const PrimaryFeed = ({user, allUsers, post, setOpenPopUp, filteredPosts, getAllPosts, setInteractingPost, changeLikeStyle}) => {



    return(
        <div className="feed">

            {filteredPosts?.map(filteredPost => 

            <Post2 
            key={filteredPost.id} 
            setOpenPopUp = {setOpenPopUp}
            user={allUsers.filter(user => user.user_uuid === filteredPost.thread_from)} 
            filteredPost={filteredPost}
            getAllPosts = {getAllPosts}
            setInteractingPost = {setInteractingPost} 
            changeLikeStyle={changeLikeStyle}
            
            />
            
            )}
        

        </div>
    )
}

export default PrimaryFeed