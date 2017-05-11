import React from 'react'
import { render } from 'react-dom'
import './componets/css/style.css'
import RoterComponent from './componets/RouterComponent'

import BookStore from './models/BookStore'

window.React = React

render(
<div>
    <RoterComponent bookStore={BookStore}/>
</div>
    ,

      document.getElementById('reactor-container')
)