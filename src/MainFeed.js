import {useState, useEffect} from "react"
import { Link, withRouter } from "react-router-dom";
import Nav from './components/Nav'
import Header2 from './components/Header2'
import Feed from './components/Feed'
import WriteIcon from "./components/WriteIcon"
import HomeIcon from "./components/HomeIcon"
import PopUp from "./components/PopUp"
import PrimaryFeed from "./components/PrimaryFeed";





const MainFeed = () => {

const [user, setUser] = useState(null)
const [allUsers, setAllUsers] = useState(null)
const [postUser, setPostUser] = useState(null)
const [posts, setPosts ] = useState(null)
const [allPosts, setAllPosts ] = useState(null)
const [viewAllPostsFeed, setViewAllPostsFeed] = useState(true)
const [filteredPosts, setFilteredPosts] = useState(null)
const [openPopUp, setOpenPopUp] = useState(false)
const [interactingPost, setInteractingPost] = useState(null)
const [popUpFeedPosts, setPopUpFeedPosts] = useState(null)
const [text, setText] = useState("")


const userId = "8e2c0f1d-ded4-4e76-a529-a6b18f25a0ef"


const getUser = async () => {

    try{
    const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`)
    const data = await response.json()
    setUser(data[0])

    } catch (error){
        console.error(error)
    }

}

const getAllUsers = async () => {

    try{
        const response = await fetch(`http://localhost:3000/users`)
        const data = await response.json()
        setAllUsers(data)
    
        } catch (error){
            console.error(error)
        }

}


const getPosts = async () => {
    try{
    const response = await fetch(`http://localhost:3000/posts?thread_from=${userId}`)
    const data = await response.json()
        setPosts(data)
    } catch (error) {
        console.error(error)
    }
}



    const getAllPosts = async () => {
    try{
        const response = await fetch(`http://localhost:3000/posts`)
        const data = await response.json()
        setAllPosts(data)
    } catch (error) {
        console.error(error)
    }
    }



    const getAllPostsFeed = () => {
    if(viewAllPostsFeed){
        const standAlonePosts = allPosts?.filter(post => post.reply_to === null)
        setFilteredPosts(standAlonePosts)
    }
    if (!viewAllPostsFeed) {
        const replyPosts = allPosts?.filter(post => post.reply_to!== null)
        setFilteredPosts(replyPosts)
    }
}

    const getReplies = async () => {

    try{
        const response = await fetch(`http://localhost:3000/posts?reply_to=${interactingPost?.id}`)
        const data = await response.json()
        setPopUpFeedPosts(data)
    } catch (error) {
        console.error(error)
    }

}

    const postPost = async () => {

    const post = 

    {
    "timestamp": new Date(),
    "thread_from": user.user_uuid,
    "thread_to": user.user_uuid || null,
    "reply_to": interactingPost?.id || null,
    "text": text,
    "likes": []
    }

    try{

        const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(post)

        })

            const result = await response.json()

            console.log(result)
            getPosts()
            getReplies()
            setText("")

    }catch (error) {
      console.error(error)
    }
  }

  const handleClick = () => {
    setPopUpFeedPosts(null)
    setInteractingPost(null)
    setOpenPopUp(true)
  }


  useEffect(() => {
    getReplies()
  }, [interactingPost])


  useEffect(() => {
    getUser()
    getAllPosts()
  }, [] )

  useEffect(() => {
    getAllPostsFeed()
  }, [user, posts, viewAllPostsFeed] )

  console.log('interactingPost', interactingPost)


  return (
    <>

    {user && <div className="app">

      <Nav/>
      <Header2
      user = {user}
      viewAllPostsFeed = {viewAllPostsFeed}
      setViewAllPostsFeed={setViewAllPostsFeed}
      />
      <PrimaryFeed
        user = {user}
        setOpenPopUp={setOpenPopUp}
        filteredPosts = {filteredPosts}
        getAllPosts = {getAllPosts}
        setInteractingPost = {setInteractingPost}
      />

      {openPopUp && 
      
      <PopUp
        
        user={user}
        setOpenPopUp={setOpenPopUp}
        popUpFeedPosts = {popUpFeedPosts}
        text = {text}
        setText={setText}
        postPost={postPost}
      
      />}

      <div   className="write-icon-container">

      <div onClick={handleClick}>  <WriteIcon/> </div>
      <Link to={"/main"}> <HomeIcon/> </Link> 


      </div>

      
      </div>}
    </>
  );
}

export default MainFeed;
