import instagram from './assets/images/ig.png';
import discord from './assets/images/discord.png';
import twitter from './assets/images/x.png';
import youtube from './assets/images/yt.png';

export const pageLinks = [
  { id: 1, href: '/', text: 'Home' },
  { id: 2, href: '/map', text: 'Map' },
  // { id: 3, href: "/about", text: "About" },
  { id: 4, href: '/dashboard', text: 'Dashboard' },
  // { id: 5, href: "/registration", text: "Sign up" },
  { id: 6, href: '/admin-forms', text: 'Admin' },
];

export const aboutLinks = [
  { id: 1, href: '/about-us#about-us', text: 'About Us >' },
  { id: 2, href: '/about-us#how-it-works', text: 'How It Works >' },
  { id: 3, href: '/about-us#our-partners', text: 'Our Partners >' },
  { id: 4, href: '/about-us#news', text: 'News >' },
];

export const contactsLinks = [
  { id: 1, href: '/contact', text: 'Customer Support >' },
  { id: 2, href: '/contact', text: 'Email Us >' },
  { id: 3, href: '/contact', text: 'Phone Support >' },
  { id: 4, href: '/contact', text: 'Office Location >' },
  { id: 5, href: '/contact', text: 'Contact Form >' },
];

export const legalLinks = [
  { id: 1, href: '/legal#privacy-policy', text: 'Privacy Policy >' },
  { id: 2, href: '/legal#cookie-policy', text: 'Cookie Policy >' },
  { id: 3, href: '/legal#terms-of-service', text: 'Terms of Service >' },
];

export const socialLinks = [
  { id: 1, href: 'https://www.instagram.com/', icon: instagram },
  { id: 2, href: 'https://discord.com/', icon: discord },
  { id: 3, href: 'https://x.com/?lang=en', icon: twitter },
  { id: 4, href: 'https://www.youtube.com/', icon: youtube },
];
