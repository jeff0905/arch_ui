import React from 'react';
import constants from './constant';
import styles from './list.less';


const groupCls = styles[`${constants.PREFIX_CLS}-group`];
class Group extends React.Component {

  render() {
    const { text, children } = this.props;
    return (
      <div className={groupCls}>
        <div className={styles['arch-list-group__header']}>
          <div className={styles['arch-list-group__header--text']}>{text}</div>
          {/* <div className={styles['arch-list-group__header--divider']} /> */}
        </div>
        <div className={styles['arch-list-divider']} />
        {children}
      </div>
    )
  }
}

Group.All = ({children}) => (<div className={styles['arch-list-group__all']}> {children}</div>)

export default Group;