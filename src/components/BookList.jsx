import React, { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedBookAsin: null,
  };

  handleBookSelect = (book) => {
    this.setState({ selectedBookAsin: book.asin });
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const filteredBooks = this.props.books.filter((book) =>
      book.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    return (
      <Row className="justify-content-center mt-5">
        <Col xs={6}>
          <Form.Control
            type="text"
            placeholder="Search"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            className="mb-3"
          />
          {filteredBooks.map((b) => (
            <SingleBook
              key={b.asin}
              book={b}
              onSelect={() => this.handleBookSelect(b)}
              selected={this.state.selectedBookAsin === b.asin}
            />
          ))}
        </Col>
        <Col xs={6}>
          <CommentArea asin={this.state.selectedBookAsin} />
        </Col>
      </Row>
    );
  }
}

export default BookList;
