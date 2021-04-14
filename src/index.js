import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-calendar/dist/Calendar.css'
import ReactDOM from 'react-dom'
import App from './app/layout/App'
import ScrollToTop from './app/layout/ScrollToTop'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/configureStore'

const rootEl = document.getElementById('root')


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop/>
        <App/>
      </BrowserRouter>
    </Provider>,
    rootEl,
  )
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function () {
    setTimeout(render)
  })
}

render()
reportWebVitals()
