/**
 * 
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './menu.less';

const cls = {
  menu: styles['arch-menu'],
  scrollBar: 'scrollbar'
}

const cx = classNames.bind(cls);

class ArchMenu extends React.Component {
 
  render() {
    const { list = [], children} = this.props;

    const menuCls = cx({menu: true, scrollBar: true})
    return (
      <div className={menuCls}>
        {children}
      </div>
    )
  }
}

ArchMenu.propTypes = {
  list: PropTypes.array,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
}

ArchMenu.defaultProps = {
  list: [],
}

export default ArchMenu;


