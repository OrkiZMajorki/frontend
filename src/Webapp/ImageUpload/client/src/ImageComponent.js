import React, { Component } from 'react'
import Notifications, { notify } from 'react-notify-toast'
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'
import WakeUp from './WakeUp'
import { API_URL } from './config'
import './ImageComponent.css'

const toastColor = { 
  background: '#505050', 
  text: '#fff' 
}

export default class ImageComponent extends Component {
  
  state = {
    loading: true,
    uploading: false,
    image_url:'',
    images: []
  }

  componentDidMount() {
    fetch(`/wake-up`)
      .then(res => {
        if (res.ok) {
          return this.setState({ loading: false })  
        }
        const msg = 'Something is went wrong with Heroku' 
        this.toast(msg, 'custom', 2000, toastColor)
      })
  }

  toast = notify.createShowQueue()

  onChange = e => {
    const errs = [] 
    const files = Array.from(e.target.files)

    const types = ['image/png', 'image/jpeg', 'image/gif']

    this.setState({ uploading: true })
    const formData = new FormData();
    formData.append('file', files[0]);
    // replace this with your upload preset name
    formData.append('upload_preset', 'u5gaiejl');
    const options = {
      method: 'POST',
      body: formData,
    };
    
    // replace cloudname with your Cloudinary cloud_name
    return fetch('https://api.Cloudinary.com/v1_1/dkdxsnlit/image/upload', options)
      .then(res => res.json())
      .then(res => {console.log(res);
        return res;
      })
      .then(res => {this.setState({image_url: res.secure_url});console.log(res.secure_url);console.log(this.state)
    })

      .catch(err => console.log(err));

  }
  
  render() {
    const { loading, uploading, images } = this.state
    
    const content = () => {
      switch(true) {
        case loading:
          return <WakeUp />
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images 
                  images={images} 
                  removeImage={this.removeImage} 
                  onError={this.onError}
                 />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return (
      <div className='container'>
        <Notifications />
        <div className='buttons'>
          {content()}
        </div>
  
      </div>
    )
  }
}
