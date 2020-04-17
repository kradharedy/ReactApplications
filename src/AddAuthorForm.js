import React from 'react';
import "./AddAuthorForm.css"


class AuthorForm extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            name:'',
            imageUrl:'',
            imagesource:'',
            books:[],
            bookTemp:''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onAddAuthor(this.state);
            }

    onFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAdd(event){
       this.setState({
           books: this.state.books.concat([this.state.bookTemp]),
       bookTemp:''
       })
    }
        render(){
            return <form onSubmit={this.handleSubmit}>
            <div className="AddAuthor_Input">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
            </div>
            <div className="AddAuthor_Input">
                <label htmlFor="imageUrl">ImageUrl</label>
                <input type="text" name="imageUrl"  value={this.state.imageUrl} onChange={this.onFieldChange}></input>
            </div>
            <div className="AddAuthor_Input">
                <label htmlFor="imagesource">imagesource</label>
                <input type="text" name="imagesource"  value={this.state.imagesource} onChange={this.onFieldChange}></input>
            </div>
            <div className="AddAuthor_Input">
                {this.state.books.map((book) => <p key={book}>{book}</p>)}
            <label htmlFor="bookTemp">Books</label>
            <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}></input>
            <input type="submit" value='+' onClick={this.handleAdd}></input>
            </div>
            <input type="submit" value="Add"/>
        </form>; 
          }
}
function AddAuthorForm({match,onAddAuthor})
{
  return <div  className="AddAuthorForm">
      <h1>Add Author</h1>
 <AuthorForm  onAddAuthor= {onAddAuthor}/>
</div>;
}

export default AddAuthorForm;