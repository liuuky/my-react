import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem'
import './style.css'

class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }
    // 将this指向放在constructor中执行，在复杂的组件开发中节约性能
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnChange = this.handleBtnChange.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  render () {
    return (
      <Fragment>
        <div>
          <label
            htmlFor="insertArea"
          >
            输入内容：
          </label>
          <input
            id="insertArea"
            className='input'
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnChange}>提交</button>
        </div>
        <ul>
          {/* 如果JSX里包含逻辑代码例如map可以将其抽离出来成为一个函数 */}
          { this.getTodoItem() }
        </ul>
      </Fragment>
    )
  }

  getTodoItem () {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          key={index}
          content={item}
          index={index}
          deleteItem={this.handleItemDelete}
        />
      )
    })
  }

  handleInputChange (e) {
    // react新版本写法,异步获取inputValue数据需要const单独声明
    const value= e.target.value
    this.setState(() => {
      return {
        inputValue: value
      }
    })
    // react旧版本写法
    // this.setState({
    //   inputValue: e.target.value
    // })
  }

  handleBtnChange () {
    // prevState:修改数据之前的那一个数据是怎样的,等价于 this.props
    this.setState((prevState) => {
      return {
        list: [...prevState.list, prevState.inputValue],
        inputValue: ''
      }
    })
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
  }

  handleItemDelete (index) {
    this.setState((prevState) => {
      const list = [...prevState.list]
      list.splice(index, 1)
      return {
        list
      }
    })
    // immutable
    // state 不允许我们做任何的改变
    // const list = [...this.state.list]
    // list.splice(index, 1)
    // this.setState({
    //   list: list
    // })
  }
}

export default TodoList
