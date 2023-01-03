import React from 'react';

const Footer = () => {
  return (
    <footer className='w-full p-10 mt-16 bg-neutral text-neutral-content'>
      <div className='container mx-auto footer'>
        <div>
          <span className='footer-title'>Services</span>
          <a className='link link-hover'>Branding</a>
          <a className='link link-hover'>Design</a>
        </div>
        <div>
          <span className='footer-title'>Company</span>
          <a className='link link-hover'>About us</a>
          <a className='link link-hover'>Contact</a>
        </div>
        <div>
          <span className='footer-title'>Legal</span>
          <a className='link link-hover'>Terms of use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
