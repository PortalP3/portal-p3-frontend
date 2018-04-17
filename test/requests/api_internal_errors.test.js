import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import {MemoryRouter} from 'react-router-dom'
import reducers from '../../redux/reducers/Reducers' 
import Home from '../../src/components/Home/Home'
import Main from '../../src/components/Main/Main';


const store = createStore(reducers)

const error = {
  data: [], errorMessage: "Network error"
}

const wordpressClient = {
  getCategories: () => {
    return Promise.reject(new Error(error))
  }
}


describe("makes request to api and shows error(calling from home component)", () => {
  /*test("handle timeout", (done)=>{
    // let errorReturned = "null"
    let wrapper = null

    function testExpect() {
      wrapper.update()
      expect(wrapper.find('InternalError')).toHaveLength(1)
      done()
    }
    function errorCallBack(error) {
      console.log("Test", error)
      // errorReturned = error
      testExpect(); 
    }

    wrapper = mount(
      <Provider store={store}>
        <Home onError={errorCallBack} wordpressClient={wordpressClient} />
      </Provider>) 

  })*/

  test("handle 5xx error", (done)=>{
    function whenDone(){
      wrapper.update()
      console.log("wrappperrerkjdhfksdjhfkdshdksj", wrapper.html()) 
      expect(wrapper.find('InternalError')).toHaveLength(1)
      done()
    }
    const wrapper = mount(
      <Provider store={store}>
        <Home onError={this.handleError} />
      </Provider>)
     
      whenDone()

  })
})


test("makes request to api and shows error(calling from article container component)", ()=>{

})

test("makes request to api and shows error(calling from article component)", ()=>{

})