import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import './style.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }
    render() {
        return (
            <Fragment>
                <div>
                    <label htmlFor='insertArea'>输入内容</label>
                    <input
                    id='insertArea'
                    className='input'
                    value={this.state.inputValue}
                    onChange={this.handleInputChange} />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                {
                    this.state.list.map((item,index) => {
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
                </ul>
            </Fragment>
        )
    }

    handleInputChange(e) {
        //使用setState中函数返回时，需要外部保存e事件，原因是产生了异步。
        const value = e.target.value
        this.setState(() => ({
            inputValue: value
        }))
    }
    handleBtnClick() {
        //prevState等于修改数据前的数据，等价于this.state
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }))
    }
    handleItemDelete(index) {
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index,1);
            return {list}
        })
    }
}

export default TodoList;