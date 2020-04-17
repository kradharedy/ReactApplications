import React, { Component , StyleSheet, Text, View }  from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Hero()
{
  return (
  <div className="row">
    <div className="jumbotron col-10 offset-1">
  <h1>Author Quiz</h1>
  <p>Select the book written by the author shown</p>
  </div>
  </div>);
}

function Footer()
{
  return (
  <div id="footer" className="row">
  <div className="col-12">
    <p className="text-muted credit">All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page"/> </p>
  </div>
  </div>
  );
}



function Turn({author,books,highlight,onAnswerSelected})
{
  function HighlightToBGColor(highlight)
{
const mapping ={
  'none':'',
  'correct':'green',
  'wrong':'red'
};
return mapping[highlight];
}
  return (
  <div className="row turn" style={{background :HighlightToBGColor(highlight)}}>
<div className="col-4 offset-1">
<img src={author.imageUrl} className="authorimage" alt="Author"/>
</div>
<div className="col-6" className="books">
 {books.map((title) => <Book title ={title} key={title} onClick={onAnswerSelected}></Book>)}
</div>
  </div>);
}


function Book({title, onClick})
{
return( <div className="answer" onClick={()=> {onClick(title);}}>
  <h4>{title}</h4>
</div>)
}

function Continue({show, onContinue})
{
  return (
  <div className="row continue">
    {
      show ? <div className="col-11">
        <input type="button" className="btn btn-primary btn-lg float-right" value ='continue' onClick={onContinue}/>
  </div>
  : null
  }
  </div>
  );
}


function AuthorQuiz({turnData,highlight,onAnswerSelected,onContinue})
{
  return( <div className="container-fluid">
<Hero/>
<Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
<p><Link to="/add">Add an author.</Link></p>
<Continue show={highlight === 'correct'} onContinue={onContinue}/>
<Footer/>
</div>);
}

Turn.propTypes = {
  author : PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl : PropTypes.string.isRequired,
    imagesource : PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

export default AuthorQuiz;