import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';
import './styles.css'
import altImage from '../images/restaurant.jpeg'

class Menu extends Component{
    constructor(props){
        super(props)
        this.state = {
            menuItems: [],
            addToCart: [],
            cartItems: []
        }     
    }

    componentWillMount(){
        this.mounted = true;
        this.getMenus()
    }

    getMenus = () => {
        axios.get('http://localhost:3000/api/menus').then((response) => {
            if(this.mounted){
                console.log("response new:", response.data)
                this.setState({
                    menuItems: response.data
                })
            }
        }).catch((e) => console.log("errror:", e))
    }

    componentWillUnmount() {
        this.mounted = false;

        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState({
            menuItems: []
        })
    }

    render(){
        const {menuItems, addToCart} = this.state;
        // console.log("ren menuItems:", menuItems)
        console.log("this,state:", this.state)
        return (
            <>
            <Header addToCartLength = {addToCart && addToCart.length}/>
            <div className="menuWrapper">
            {menuItems.map(it => {
                return (
                <div className="menuList" key={it.id}>
                    <div>
                        <h3>{it.title}</h3>
                        <h5>Rs.{it.price}</h5>
                    </div>
                    <div className="menuImage">
                        <img src={altImage} alt="image" className="imgSize"></img>
                        <button className="primaryButton" onClick={(e) => {
                            let tempArray = this.state.addToCart;
                            !it.isCartAdded && tempArray.push({
                                "title": it.title, "price" : it.price, "isCartAdded" : !it.isCartAdded, "menuId": it.id
                            })
                            menuItems.map(it => tempArray.find(i => i.menuId === it.id) ? it.isCartAdded = true : it);
                            this.setState({
                                addToCart: tempArray, 
                                menuItems
                            })
                            axios.post('http://localhost:3000/api/cartDetails', addToCart).then((response) => {
                                console.log("cart res:", response)
                                if(response.data){
                                    // this.getMenus();
                                    this.setState({
                                        cartItems: response.data
                                    })
                                }
                                
                            }).catch(e => console.log("errr:", e))
                         }}>
                            {it.isCartAdded ? `Added` : `Add to Cart`}
                        </button>
                    </div>
                </div>
                )
                }) 
            }
            </div>
            </>
        )
    }
}

export default Menu