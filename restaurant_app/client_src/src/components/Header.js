import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './styles.css'
import cart from '../images/cart.png'


class Header extends Component{
    render(){
        const {addToCartLength} = this.props;
        return (
            <nav className = 'menuBar'>
                    <ul className = 'ulList'>
                        <li><Link to='/'>{'Home'}</Link></li>
                        <li><Link to='/menu'>{'Menu'}</Link></li>
                        <li><Link to='/order'>{'Order'}</Link></li>
                        <li><Link to='/cart'><img src={cart} className="cartImg"/></Link><span className="cartLength">{addToCartLength}</span></li>
                        <li><Link to='/login'>{'Login'}</Link></li>
                        <li><Link to='/signup'>{'Signup'}</Link></li>
                    </ul>
                </nav>
        )
    }
}

export default Header