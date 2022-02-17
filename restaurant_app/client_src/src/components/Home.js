import React, {Component} from 'react';
import './styles.css'
import Img1 from '../images/1123.png'
import axios from 'axios'
import Header from './Header';


class Home extends Component {
    constructor(){
        super();

    }

    componentWillMount(){
        this.getUser()
    }

    getUser = () => {
        axios.get('http://localhost:3000/api/restaurantapps').then((response) => {
            console.log("response:", response.data)
        })
    }


    render(){

        return (
            <div className = 'mainWrapper'>
                <Header/>
                <div className = 'subWrapper'>
                    <img src={Img1} alt="image" className = "image"></img>
                </div>
               
            </div>
        )
    }
}

export default Home