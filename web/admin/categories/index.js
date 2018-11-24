import './index.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AdminCategory extends Component {
  constructor(props) {
    super(props);
    this.api = new API();
    this.state = {categories: []};
  }

  componentDidMount() {
    this.api.category.adminIndex((resp) => {
      if (resp.error) {
        // TODO
        return
      }

      this.setState({categories: resp.data});
    });
  }

  render() {
    return (
      <CategoryIndex categories={this.state.categories} />
    )
  }
}

const CategoryIndex = (props) => {
  const listCategories = props.categories.map((category) => {
    return (
      <li className='category item' key={category.category_id}>
        <div>
          <span className='position'>P{category.position}</span>
          <div>
            {category.name}
            <span className='actions'>
              <FontAwesomeIcon icon={['far', 'edit']} />
              <FontAwesomeIcon icon={['far', 'trash-alt']} />
            </span>
          </div>
          <p className='description'>
            {category.description}
          </p>
        </div>
      </li>
    )
  });

  return (
    <div className='admin categories'>
      <h1 className='welcome'>
        It is used to categorize topics. P+number is the position of the categories.
        <Link to='/admin/categories/new' className='new'>Create New Category</Link>
      </h1>
      <div className='panel'>
        <ul>
          {listCategories}
        </ul>
      </div>
    </div>
  )
}

export default AdminCategory;
