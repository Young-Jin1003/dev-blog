import React, { useState, useEffect, useRef } from 'react';
import S3 from 'react-aws-s3';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import router from 'next/router';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	editor: {
		height: '500px',
		marginTop: '10px',
	}
}))

export const modules = {
	toolbar: {
	  container: [
		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],
  
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'script': 'sub' }, { 'script': 'super' }],
		[{ 'indent': '-1' }, { 'indent': '+1' }],
		[{ 'direction': 'rtl' }],
  
		[{ 'size': ['small', false, 'large', 'huge'] }],
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
		[{ 'color': [] }, { 'background': [] }],
		[{ 'font': [] }],
		[{ 'align': [] }],
		['link', 'image', 'formula'],
		['clean'],
	  ],
	},
};

const image = []
const UpadateContainer = (props) => {
	// console.log(props.data, 'update props check')
	const classes = useStyles()

	const Quill = typeof window == 'object' ? require('quill') : () => false

	const quillElement = useRef(null)
  const quillInstance = useRef(null)

	const [title, setTitle] = useState('')

	useEffect(() => {
		setTitle(props.data.title)
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: 'snow',
        placeholder: 'Please enter the contents.',
        modules: modules,
        onchange
      });
    }
		
    const quill = quillInstance.current;
    const toolbar = quill.getModule('toolbar')
    toolbar.addHandler('image', onClickImageBtn)
		quill.root.innerHTML = props.data.content
  }, []);

	const onClickImageBtn = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = function () {
      console.log('on change')
      const file = input.files[0]
      const fileName = file.name

      const config = {
        bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        region: process.env.NEXT_PUBLIC_S3_REGION,
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
      }

      const ReactS3Client = new S3(config)

      ReactS3Client.uploadFile(file, fileName).then((data) => {
				console.log(data)
        if (data.status === 204) {
          const range = quillInstance.current.getSelection(true)
          quillInstance.current.insertEmbed(
            range.index,
            'image',
            `${data.location}`
          );
          image.push(`${data.location}`)
          console.log(image, 'image')
          quillInstance.current.setSelection(range.index + 1)
        } else {
          alert('error')
        }
      })
    }
  }

	const handleTitle = (event) => {
		setTitle(event.currentTarget.value)
	}
	
	
	const blogPost = async (event) => {
		event.preventDefault()
		const response = await axios.put('/api/blog', {
      id: props.data.id,
			title: title,
			content: quillInstance.current.root.innerHTML,
			writer: 'dev hong',
			img: image,
		})
		console.log(response, 'RESPONSE CHECK')
		if (response.status === 200) {
			alert('블로그 포스팅이 정상적으로 수정되었습니다.')
			router.push(`/blog/${props.data.id}`)
		} else {
			alert('BLOG UPDATE FAIL ERROR')
		}
	}

	return (
		<>
			<Container className={classes.root}>
				<form>
					<TextField
						placeholder="제목을 입력해주세요. "
						helperText="필수 입력 사항입니다."
						fullWidth
						margin="normal"
						onChange={handleTitle}
						defaultValue={props.data.title}
					/>
					<div ref={quillElement} className={classes.editor}></div>
					<div style={{display: 'flex', paddingTop: '50px'}}>
						<Button variant="outlined" href="./" style={{color: '#218e16', backgroundColor: 'white'}}>
							Back
						</Button>
						<Button
							variant="outlined"
							endIcon={<SaveIcon />}
							onClick={blogPost}
							style={{marginLeft: 'auto', color: '#218e16', backgroundColor: 'white'}}
						>
							Save
						</Button>
					</div>
				</form>
			</Container>
		</>
	)
}

export default UpadateContainer