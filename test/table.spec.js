import React from 'react'
import { shallow, mount } from 'enzyme'
import Table from '../app/components/Table'
import ITEMS from '../app/helpers/fakeData'

describe('test ready', () => {
  it('start test', () => {
    expect(true).to.equal(true)
  })
})

describe('component Table', () => {
  it('should no render table', () => {
    const table = shallow(<Table />)
    expect(table.find('table')).to.length(0)
  })

  it('should render table', () => {
    const table = shallow(<Table data={ITEMS} columns={['brand', 'title', 'description']} />)
    expect(table.find('table')).to.length(1)
  })

  it('should table has correct columns', () => {
    const table = shallow(<Table data={ITEMS} columns={['brand', 'description']} />)
    const columns = table.find('th')
    expect(columns).to.length(2)
    expect(columns.first().text().trim()).to.equal('BRAND')
    expect(columns.last().text().trim()).to.equal('DESCRIPTION')
  })

  it('should table doesn\'t has summary', () => {
    const table = shallow(<Table data={ITEMS} columns={['brand']} />)
    expect(table.find('.summary')).to.have.length(0)
  })

  it('should table display correct summary', () => {
    const table = shallow(<Table data={ITEMS} columns={['brand', 'count', 'price']} summary={['price', 'count']} />) 
    expect(table.find('.count').last().text()).to.equal('2210')
    expect(table.find('.price').last().text()).to.equal('962.11')
  })

  it('should sort data of table and has triangle', () => {
    const sortBrands = ['Bose', 'Intel', 'NVidia']
    const table = mount(<Table data={ITEMS} columns={['id', 'brand']} sortBy='brand' />)
    
    expect(table.find('.arrow')).to.have.length(1)
    
    const brands = table.find('.brand')

    brands.forEach((item, index) => {
      expect(item.text()).to.equal(sortBrands[index])
    })
  })

  it('should click on triangle for sorting', () => {
    const sortIds = ['10160045', '10090403', '10007598']
    const table = shallow(<Table data={ITEMS} columns={['id', 'brand']} sortBy='id' />)
    table.find('.arrow').simulate('click')
    const brands = table.find('.id')

    brands.forEach((item, index) => {
      expect(item.text()).to.equal(sortIds[index])
    })
  })
})
  