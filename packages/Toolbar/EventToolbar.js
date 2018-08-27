/**
 * 事件分析toolbar, 属于Toolbar.
 *
 * 元素:
 * 1. Container
 * 2. Navigation Icon (optional)
 * 3. Title (optional)
 * 4. Action items (optional)
 * 5. Overflow menu (optional);
 * 主题:
 * 1. theme
 * Typography:
 * 1. typography
 *
 * Specs:
 * Mobile:
 *   container: width: 100%, height: 56px; padding: 16 16px.
 *   navigation: icon: {height: 24px, width:24px}
 *   title: paddingLeft: 72px, 离container 左边距离72px.
 *   actionItem: width: 24px.  item之间的间距24px.
 * PC:
 *   container: height: 48PX
 */

import React from 'react';
import { Dropdown, Button, Menu, Switch, Slider, Icon, Modal, Form, Row, Col, Input } from 'antd';
import { connect } from 'dva';
import { EventSetting } from '../../components/Modal';

import styles from './event.less';

const SIMILAR = ['近似计算', '精确计算'];

@connect(({ eventAnalysis }) => ({
  precision: eventAnalysis.precision,
  similar: eventAnalysis.similar,
}))
class EventToolbar extends React.PureComponent {
  constructor(props) {
    super(props);
    const { similar, precision } = this.props;
    this.state = {
      visible: false,
      name: '',
      desp: ''
    };
  }

  openSave() {
    this.setState({ visible: true });
  }

  handleSubmit() {
    const { name, desp } = this.state;
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  /**
   *
   * @param {*} e
   * @param {*} stateName
   */
  handleInputChange(e, stateName) {
    this.setState({ stateName: e.target.value || '' });
  }

  /**
   * 修改近似值.
   *
   * @param {boolean} similar
   */
  handleChangeSimilar(similar) {
    let { precision } = this.props;
    if (!similar) {
      precision = 100;
    }
    console.log('handleChangeSimilar', precision);
    this.props.dispatch({
      type: 'eventAnalysis/saveSimilar',
      payload: {
        similar,
        precision,
      }
    });
  }

  handlePrecisionChange(val) {
    const payload = { precision: val };

    if (val < 100) {
      payload.similar = true;
    } else {
      payload.similar = false;
    }
    console.log('precision', val, payload);
    this.props.dispatch({
      type: 'eventAnalysis/savePrecision',
      payload,
    });
  }

  render() {
    const { style, measures, by_fields, similar, precision } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={() => { this.handleChangeSimilar(true); }}>{SIMILAR[0]}</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => { this.handleChangeSimilar(false); }}>{SIMILAR[1]}</div>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles['toolbar-container']}>
        <div className={styles['toolbar-container__row']}>
          <div className={styles['toolbar-container__title']}>
            事件分析
          </div>
          <div className={styles['toolbar-container__actions']}>

            <div className={styles['toolbar-container__section']}>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button size="small" >
                  { similar ? SIMILAR[0] : SIMILAR[1] }
                </Button>
              </Dropdown>
            </div>

            <div className={styles['toolbar-container__section']}>
              <span className={styles['toolbar-container__label']}>
                精度: {this.props.precision}%
              </span>
              <div className={styles['toolbar-container__opt']}>
                <Slider
                  defaultValue={10}
                  value={precision}
                  onChange={(val) => { this.handlePrecisionChange(val); }}
                  min={10}
                  max={100}
                  step={10}
                  tipFormatter={item => `${item}%`}
                  style={{ width: 100, margin: 0 }}
                />
              </div>
            </div>

            <div
              className={styles['toolbar-container__section']}
              onClick={this.openSave.bind(this)}
            >
              <Button size="small" >保存</Button>
            </div>

          </div>
        </div>
        <EventSetting
          showModal={this.state.visible}
          measures={measures}
          by_fields={by_fields}
          handleCancel={() => this.setState({ visible: false })}
        />
      </div>
    );
  }
}

export default EventToolbar;
