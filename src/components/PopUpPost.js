import moment from "moment"
import {useState, useEffect} from "react"

const PopUpPost = ({popUpFeedPost}) => {

    const[user, setUser] = useState(null)

    const timePassed = moment().startOf('day').fromNow(popUpFeedPost.timestamp)

    const getUser = async() => {

        try{
            const response = await fetch(`http://localhost:3000/users?user_uuid=${popUpFeedPost.thread_from}`)
            const data = await response.json()
            setUser(data[0])
        } catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return(
        <article >
            <div className="text-container">

                <div>

                    <div className="img-container">
                        <img src={user?.img} alt="profile avatar"/>               
                    </div>

                    <div>
                        <p><strong> {user?.handle} </strong> </p>
                        <p> {popUpFeedPost.text} </p>
                    </div>


                </div>

                <p className="sub-text"> {timePassed} </p>

            </div>

        </article>
    )
}

export default PopUpPost