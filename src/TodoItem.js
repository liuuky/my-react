import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
  // 当父组件的render函数被运行时，它的子组件的render都将被重新运行一次
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.content !== this.props.content) {
      return true
    }else {
      return false
    }
  }

  render() {
    console.log('child render')
    const { content } = this.props
    return (
        <li onClick={this.handleClick}>
          { content }
          {/* { this.props.content } */}
        </li>
    )
  }

  handleClick () {
    const { deleteItem, index } = this.props
    deleteItem(index)
    // this.props.deleteItem(this.props.index)
  }
}

// PropTypes规定父组件传递值的类型
TodoItem.propTypes = {
  // // isRequired 设置属性为必传
  // test: PropTypes.string.isRequired,
  // oneOfType：一个对象可以是几种类型中的任意一个类型
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number
}
// 若父组件没有给子组件传值（test），可以通过defaultProps设置默认值
// TodoItem.defaultProps = {
//   test: 'hello world'
// }

export default TodoItem
