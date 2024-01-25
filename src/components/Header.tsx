import React from 'react';
import '../styles/header.css';

export default function Header() {
  return (
    <header className='header-container'>
      <h1 className='header-logo'>Logo</h1>
      <div className='header-menu'>
        <a href="#" target="_blank">Home</a>
        <a href="#" target="_blank">Services</a>
        <a href="" target="_blank">Gallery</a>
        <a href="" target="_blank">Contact Us</a>
      </div>
    </header>
  )
}