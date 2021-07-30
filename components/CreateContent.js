function CreateContent(props) {
  console.log('Create Content render')
  return (
    <article>
      <h2>Create</h2>
      <form
        action="/create_process"
        method="post"
        onSubmit={function(e) {
          e.preventDefault()
          // debugger
          props.onSubmit(
            e.target.title.value,
            e.target.desc.value
          )
        }}
      >
        <p><input type="text" name="title" placeholder="title" /></p>
        <p>
          <textarea name="desc" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </article>
  )
}

export default CreateContent