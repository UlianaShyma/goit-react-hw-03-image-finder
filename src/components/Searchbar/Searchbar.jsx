import { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../../icons/searchIcon.svg';
import {
  SearchHed,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    props: PropTypes.node,
  };

  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  onFormSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.query.trim());
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <SearchHed>
        <SearchForm onSubmit={this.onFormSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            <SearchIcon width="25" height="25" />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </SearchForm>
      </SearchHed>
    );
  }
}
