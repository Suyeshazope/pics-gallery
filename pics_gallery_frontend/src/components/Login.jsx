import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo_white.png';
import jwt_decode from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';


import { client } from '../client';
 
function Login(){
  const navigate = useNavigate();

  const credentialResponse=(response)=>{
    // console.log(response.credential) ;
    localStorage.setItem('user', JSON.stringify(response));
    const decodedHeader = jwt_decode(response.credential);
    // console.log(decodedHeader) ;

    const { name, picture , sub } = decodedHeader;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
      .then(() =>{
        navigate('/', { replace: true });
      })

  }

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`} className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
              <div className='p-5'>
                <img src={logo} width="130px" alt="logo" />
              </div>
              <div className='shadow-2x1'>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  onSuccess={(response) => credentialResponse(response)}
                  onError={() => console.log('error')}
                />
              </div>
        </div>

      </div>
      
      
    </GoogleOAuthProvider>
  )
}

export default Login