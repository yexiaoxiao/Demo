import $ from 'jquery'
import React from 'react'
import { render } from 'react-dom'
import NewsList from './NewsList.js'
import './app.css'

render(<NewsList />,$('#content')[0])