import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

import styles from './list.less';

const prefixCls = 'arch-list';

const cls = {
  itemCls: styles[`${prefixCls}-item`],
  dividerCls: styles[`${prefixCls}-divider`],
  disabledCls: styles[`${prefixCls}-item--disabled`],
  activatedCls: styles[`${prefixCls}-item--activated`]
}
const cx = classNames.bind(cls);

class ListItem extends React.Component {

  render() {
    const {
      style,
      className = '',
      children,
      group = false,
      // 选中, 禁止.
      activated = false,
      disabled = false,
      ...rest
    } = this.props;

    const cls = cx({
      itemCls: true,
      activatedCls: activated,
      disabledCls: disabled,
    })

    return (
     <div
          {...rest} 
          className={cls}
          style={style}
      >   
          {children}
      </div>
    )
  }
}

ListItem.propTypes = {

}

ListItem.defaultProps = {

}

ListItem.LeadingIcon = ({children}) =>  (<div className={styles['arch-list-item__leading-icon']} > {children} </div>);
ListItem.TrailIcon = ({children}) => (<div className={styles['arch-list-item__trail-icon']}> {children}</div>);
ListItem.Text = ({children}) => (<div className={styles['arch-list-item__text']}> { children } </div>);
export default ListItem;