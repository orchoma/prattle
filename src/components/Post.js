import { useState, useEffect } from "react"
import moment from 'moment'

const Post = ({user, setOpenPopUp, filteredPost, getPosts, getAllPosts, setInteractingPost}) => {


    const [replyLength, setReplyLength] = useState(null)


    const timePassed = moment().startOf('day').fromNow(filteredPost.timestamp)

    const handleClick = () => {
        setOpenPopUp(true)
        setInteractingPost(filteredPost)
    }


    const hasBeenLikedByUser = filteredPost.likes.some(like => like.user_uuid === user.user_uuid)


    const postLike = async() => {
        
        
        if(!hasBeenLikedByUser){

            filteredPost.likes.push(
                {user_uuid: user.user_uuid}
            ) 


            try{

                const response = await fetch(`http://localhost:3000/posts/${filteredPost.id}`,
                {
                    method: 'PUT',
                    headers: {
        
                        'Content-Type': 'application/json',
        
                    },
        
                    body: JSON.stringify(filteredPost)
                })

                const result = await response.json()
                console.log("Success", result )
                getPosts()

            } catch (error){
                console.error(error)
            }

        }  else{

            filteredPost.likes.pop({user_uuid: user.user_uuid})


            try{

                const response = await fetch(`http://localhost:3000/posts/${filteredPost.id}`,
                {
                    method: 'PUT',
                    headers: {
        
                        'Content-Type': 'application/json',
        
                    },
        
                    body: JSON.stringify(filteredPost)
                })

                const result = await response.json()
                console.log("Success", result )
                getPosts()

            } catch (error){
                console.error(error)
            }


        }  
    }

    const getRepliesLength = async() => {
        try{

            const response = await fetch(`http://localhost:3000/posts?reply_to=${filteredPost?.id}`)
            const data = await response.json()
            setReplyLength(data.length)

        } catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        getRepliesLength()
    }, [filteredPost])



    return(
        <article className="post-card">

            <div className="text-container">

                <div> 
                    <div className="img-container">
                        <img src={user.img} alt="profile avatar"/>
                    </div>

                    <div>
                        <p> <strong> {user.handle} </strong> </p>
                        <p> {filteredPost.text} </p>
                    </div>
                </div>
                <p className="sub-text"> {timePassed} </p>
            </div>
            <div className="icons">
                <svg className="pointer" onClick={postLike} style={{fill: hasBeenLikedByUser ? 'red' : 'black'}} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
                <svg className="pointer" onClick={handleClick} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007m0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007"/></svg>
                <svg className="pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z"/></svg>
                <svg className="pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"/></svg>
            </div>

            <p className="sub-text"> <span onClick={handleClick}> {replyLength} replies </span> <span> {filteredPost.likes.length} likes </span></p>

        </article>
    )
}

export default Post