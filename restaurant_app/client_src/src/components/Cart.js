import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';
import './styles.css'
import altImage from '../images/restaurant.jpeg';
import cross from '../images/cross.png'


class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartItems: []
        }
        
    }

    componentWillMount(){
        this.getCartItems()
    }

    getCartItems = () => {
        axios.get('http://localhost:3000/api/cartDetails').then((response) => {
            console.log("response:", response.data)
            this.setState({
                cartItems: response.data
            })
        }).catch((e) => console.log("errror:", e))
    }

    render(){
        const {cartItems} = this.state;
        console.log("ren cartItems:", cartItems)
        return (
            <>
            <Header addToCartLength={cartItems.length}/>
            <div className="menuWrapper">
                {cartItems.map(it => {
                    return (
                    <div className="menuList">
                        <div className="cartMenu">
                                <img src={altImage} alt="image" className="imgSize"></img>
                            <div className="paddingLeft20">
                                <h3>{it.title}</h3>
                                <h5>Rs.{it.price}</h5>
                            </div>
                        </div>
                        <img src={cross} alt="image" className="imgSize14" onClick = {() => {
                            let tempArray = cartItems.filter(u => u.id !== it.id)
                            this.setState({
                                cartItems : tempArray
                            })
                            axios.delete(`http://localhost:3000/api/cartDetails/${it.id}`).then((response) => {
                            console.log("response:", response)
                        }).catch((e) => console.log("errr:", e))
                        }}></img>
                    </div>
                    )
                    }) 
                }
                
            </div>
            <button className="confirmButton" onClick = {() => {
                console.log("0000000:", cartItems)
                    axios.post('http://localhost:3000/api/cartDetails', cartItems).then((response) => {
                            console.log("cart res:", response)
                            if(response.data){
                                this.setState({
                                    cartItems: response.data
                                })
                            }
                            
                        }).catch(e => console.log("errr:", e))
                }}>
                    Confirm
                 </button>
            </>
        )
    }
}

export default Cart