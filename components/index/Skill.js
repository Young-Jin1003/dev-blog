import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    height: '30vw',
  },
  skill: {
    marginTop: '6vw',
    textAlign: 'center',
    fontSize: '1.5vw',
  },
	skillMobile: {

	},
  detailImg: {
    marginTop: '4vw',
    height: '5vw',
  },
  detailBox: {
    display: 'inline-block',
    '& div': {
      fontSize: '0.7vw',
    }
  },
}))

const skill = () => {
  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const divide = 800

  useEffect(() => {
    if (mobile === null) {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }
    window.addEventListener('resize', function() {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }, {passive: true})
    console.log(mobile, 'first')
  })

  return (
    <Box className={classes.box}>
			{mobile ? (
				<section>
					<div className={classes.skill}>
						<div style={{color: '#218e16'}}>Skills</div>
						<div style={{fontSize: '1.6vw', paddingTop: '1vw', fontWeight: 50}}>
							웹 개발 파트별로 정리한 간략한 기술 스택입니다.<br />
							분야별 기술에 대하여 더 자세한 내용은 소개 페이지에서 확인 하실 수 있습니다.
						</div>
					</div>
					<div className={classes.detailImg}>
						{/* <Box className={classes.detailBox} style={{marginRight: '13vw'}}> */}
						<Box style={{marginLeft: '8vw'}}>
							<Image src={'/images/frontend4.png'} width={100} height={100} />
							<div style={{paddingTop: '0.7vw'}}>
								<div style={{fontSize: '1vw', paddingBottom: '1vw'}}>Front-End</div>
								HTML·CSS·JQuery 웹 퍼블리싱<br />
								Vue·React SPA 개발
							</div>
						</Box>
						<Box style={{marginRight: '13vw'}}>
							<Image src={'/images/backend2.png'} width={100} height={100} />
							<div style={{paddingTop: '0.7vw'}}>
								<div style={{fontSize: '1vw', paddingBottom: '1vw'}}>Back-End</div>
								SpringBoot·NodeJS API 구축<br />
								MySQL DB 스키마 설계
							</div>
						</Box>
						<Box className={classes.detailBox}>
							<Image src={'/images/server.png'} width={100} height={100} />
							<div style={{paddingTop: '0.7vw'}}>
								<div style={{fontSize: '1vw', paddingBottom: '1vw'}}>DEV-OPS</div>
								Linux·AWS 서버 구축<br />
								Git 버전관리
							</div>
						</Box>
					</div>
				</section>
			) : (
				<section className={classes.skill}>
					<div style={{color: '#218e16'}}>Skills</div>
					<div style={{fontSize: '15px', paddingTop: '1vw', fontWeight: 50}}>
						웹 개발 파트별로 정리한 간략한 기술 스택입니다.<br />
						분야별 기술에 대하여 더 자세한 내용은 소개 페이지에서 확인 하실 수 있습니다.
					</div>
					<div className={classes.detailImg}>
						<Box className={classes.detailBox} style={{marginRight: '13vw'}}>
							<Image src={'/images/frontend4.png'} width={100} height={100} />
							<div style={{paddingTop: '0.7vw'}}>
								<div style={{fontSize: '1vw', paddingBottom: '1vw'}}>Front-End</div>
								HTML·CSS·JQuery 웹 퍼블리싱<br />
								Vue·React SPA 개발
							</div>
						</Box>
						<Box className={classes.detailBox} style={{marginRight: '13vw'}}>
							<Image src={'/images/backend2.png'} width={100} height={100} />
							<div style={{paddingTop: '0.7vw'}}>
								<div style={{fontSize: '1vw', paddingBottom: '1vw'}}>Back-End</div>
								SpringBoot·NodeJS API 구축<br />
								MySQL DB 스키마 설계
							</div>
						</Box>
						<Box className={classes.detailBox}>
							<Image src={'/images/server.png'} width={100} height={100} />
							<div style={{paddingTop: '0.7vw'}}>
								<div style={{fontSize: '1vw', paddingBottom: '1vw'}}>DEV-OPS</div>
								Linux·AWS 서버 구축<br />
								Git 버전관리
							</div>
						</Box>
					</div>
				</section>
			)}
    </Box>
  )
}

export default skill