import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AuthorQuiz from './AuthorQuiz';
import {shuffle,sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import AddAuthorForm from  './AddAuthorForm';
 
const authors = [
  {
    name: 'ArundhathiRoy',
    imageUrl: 'images/authors/ArundhatiRoy.jpg',
    imageSource:"wikimedia commons",
    books: ['The God of small things',
  'The End of imagination',
'Man booker prize',
'Arundhathi Roy']
  },
  {
    name: 'Mahatma Gandhi',
    imageUrl: 'images/authors/MahatmaGandhi.jpg',
    imageSource:"wikimedia commons",
    books: ['Pathway to God',
  'Mahatma Gandhi',
'The Essential Gandhi',
'Mahatma Gandhi']
  },
  {
    name: 'APJ Abdul Kalam',
    imageUrl: 'images/authors/APJAbdulKalam.jpg',
    imageSource:"wikimedia commons",
    books: ['Turning Points',
  'Ignited Minds',
'India 2020',
'APJ Abdul Kalam']
  },
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/MarkTwain.jpg',
    imageSource:"wikimedia commons",
    books: ['The Innocents Abroad',
  'Life On the Mississippe',
'The adventure of Tom Sawyer',
'Mark Twin']
  }
];

function  getTurnData(authors)
{
const allBooks = authors.reduce(function (p,c,i)
{
  return p.concat(c.books);
},[]);
const fourRandonBooks = shuffle(allBooks).slice(0,4);
alert(fourRandonBooks);

const answer = sample(fourRandonBooks);
return{
  books: fourRandonBooks,
  author: authors.find((author) => 
  author.books.some((title) => title === answer)
  )
}
}

function resetState(){
  return{
    turnData: getTurnData(authors),
    //author:authors[0],
    //books:authors[0].books
    highlight: "correct"
  };    
}


let state = resetState();

function onAnswerSelected(answer)
{
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App(){
return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}
onContinue={()=>{
  state=resetState();
  render();
}}
/>;
}

const AuthorWrapper = withRouter(({history}) => 
   <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }}/>
);

function render(){
  ReactDOM.render(
    <BrowserRouter>
    <React.Fragment>
    <Route exact path="/" component={App}/>
    <Route path="/add" component={AuthorWrapper}/>
   </React.Fragment>
   </BrowserRouter>,
  document.getElementById('root')
);
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
