import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Link className="brand" to="/" aria-label="Stockroom home"><span className="brand-mark">▦</span> stockroom<span className="brand-dot">.</span></Link>
        <nav aria-label="Main navigation"><a href="#features">Features</a><a href="#how-it-works">How it works</a></nav>
        <Link className="nav-link" to="/inventory">Open inventory <span>↗</span></Link>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="landing-eyebrow"><span /> A BETTER WAY TO MANAGE STOCK</p>
            <h1>Everything in its place<span>.</span></h1>
            <p className="hero-description">A simple home for your inventory. Keep track of your items, stay organized, and get back to what matters.</p>
            <div className="hero-actions"><Link className="landing-button" to="/inventory">Explore your inventory <span>→</span></Link><a className="text-link" href="#how-it-works">See how it works <span>↓</span></a></div>
            <div className="hero-note"><span className="note-icon">✓</span> All your items, together in one place</div>
          </div>
          <div className="hero-visual" aria-label="Illustration of an organized inventory">
            <div className="visual-top"><span>YOUR WORKSPACE</span><span>✳</span></div>
            <div className="visual-title">A little more<br /><em>organized.</em></div>
            <div className="visual-shelf"><div className="box box-one"><span>01</span></div><div className="box box-two"><span>02</span></div><div className="box box-three"><span>03</span></div></div>
            <div className="visual-bottom"><span>GOOD THINGS ARE IN STORE</span><span>↗</span></div>
            <div className="floating-card"><span className="floating-icon">✓</span><div><strong>All accounted for</strong><small>Your inventory, organized.</small></div></div>
          </div>
        </section>
        <section className="features" id="features"><div className="section-heading"><p className="landing-eyebrow">MADE FOR THE EVERYDAY</p><h2>Less searching.<br />More doing.</h2><p>Whether you're adding something new or updating the details, everything you need is right where you need it.</p></div><div className="feature-grid"><article><span className="feature-icon">▦</span><h3>See the whole picture</h3><p>Bring your items, categories, and details together in one clear view.</p></article><article><span className="feature-icon">＋</span><h3>Add with ease</h3><p>Give every item a name, description, category, and image in just a few steps.</p></article><article><span className="feature-icon">↗</span><h3>Keep things current</h3><p>Update item details or remove what you no longer need as things change.</p></article></div></section>
        <section className="landing-cta" id="how-it-works"><div><p className="landing-eyebrow">READY WHEN YOU ARE</p><h2>Make space for<br />better organization.</h2><p>Start by exploring your inventory or adding your first item.</p></div><Link className="landing-button light-button" to="/addItem">Add an item <span>→</span></Link></section>
      </main>
      <footer className="landing-footer"><span className="brand">stockroom<span className="brand-dot">.</span></span><span>A little order goes a long way.</span><span>INVENTORY, MADE SIMPLE.</span></footer>
    </div>
  );
}
