const PostInput = ({user, text, setText, postPost}) => {
    return(
        <>

        <p> {user.handle} </p>
        <input value={text} onChange={e => setText(e.target.value)} />
        <button className="primary" onClick={postPost}> Post </button>

        </>
    )
}

export default PostInput