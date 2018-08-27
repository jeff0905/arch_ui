/**
 * list . <ul></li>
 * single-select listbox
 * multi-select listbox,
 * Keyboard Interaction, up-arrow, down-arrow, home, end
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import Item from './Item';
import Group from './Group';

import styles from './list.less';

class List extends React.PureComponent {

  render() {
    const { list = [], activeItem, col = 1, children, emptyText, ...rest } = this.props;

    const listCls = classNames(styles['arch-list'], styles[`arch-list-col-${col}`])
    return (
      <div className={listCls}>
        {children}
      </div>
    )
  }

}
List.Divider = () => (<div className={styles['arch-list-divider']} />)
List.Item = Item;
List.Group = Group;
export default List;
