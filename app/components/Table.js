import React, { Component } from 'react'
import { pipe, map, reduce } from 'ramda'
import '../style/style.scss'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = { data: props.data || [], sort: 'asc' }
    this.sorting = this.sorting.bind(this)
  }
  componentWillMount() {
    const { sortBy } = this.props
    if(sortBy) {
      const sortData = this.state.data.sort((a, b) => a[sortBy] > b[sortBy])
      this.setState((prevState) => ({ data: sortData }))
    }
  }
  sorting() {
    const { sortBy } = this.props
    const { data, sort } = this.state
    const sortData = data.sort((a, b) => sort === 'asc' ? a[sortBy] < b[sortBy] : a[sortBy] > b[sortBy])
    this.setState((prevState) => 
      ({ sort: prevState.sort === 'asc' ? 'desc' : 'asc', data: sortData }))
  }
  render() {
    const { columns, summary, sortBy } = this.props
    const { sort, data } = this.state
    if (data.length === 0 || !columns || columns.length === 0) return null
    return (
      <table>
        <thead>
          <tr>
            { 
              columns.map((column, index) => 
              (<th key={index.toString()}>{column.toUpperCase()}
              {
                sortBy &&
                sortBy === column &&
                <span className="arrow" onClick={this.sorting}>{ sort === 'asc' ? '▾' : '▴' }</span>
              }</th>)) 
            }
          </tr>
        </thead>
        <tbody>
          { data.map((item, index) =>
            (<tr key={'tr' + index.toString()} >
              { columns.map((column, index) =>
                (<td className={column} key={'td' + item[column]}>{item[column]}</td>))
              }
           </tr>))
          }
        </tbody>
        { summary && summary.length > 0 &&
          (<tfoot>
            <tr className="summary">
              { columns.map((column, index) => { 
                if (summary.some(element => element === column )) {
                  return (<td className={column} key={'ft' + index.toString()}>
                    { pipe(
                      map(item => item[column]),
                      reduce((sum, price) => sum + price, 0),
                      (number) => {
                        return number % 1 === 0 ? number.toFixed(0) : number.toFixed(2)
                      } 
                      )(data)
                    }
                    </td>)
                } else {
                  return <td key={'ft' + index.toString()} />
                }
                })
              }
            </tr>
          </tfoot>)      
        } 
      </table>
    )
  }
}

export default Table
