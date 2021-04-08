/*
 * @Author: your name
 * @Date: 2021-04-01 18:46:01
 * @LastEditTime: 2021-04-01 18:46:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /technology-stack/自动化测试/Jest/enzyme/CheckboxWithLabel.js
 */
import React from 'react';

export default class CheckboxWithLabel extends React.Component {
  state = {
    isChecked: false,
  };

  onChange = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}
