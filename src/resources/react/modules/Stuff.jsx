import { Loader } from "@mantine/core";
import React from 'react'
import { Link } from 'react-router-dom';

const notFound = `${process.env.MIX_APP_URL}/images/not-found.png`

const ErrorPage = () => {
  return (
    <div className="error_page">
      <img src={notFound} alt="" />
      <div className="container">
        <div className="error_page-inner">
          <h2>Данной страницы не существует, <Link to="/">на главную</Link></h2>
        </div>
      </div>
    </div>
  )
}

const random = Math.round(Math.random() * 14)

const Loaded = e => {

  const array = ["blue", "cyan", "dark", "grape", "gray", "green", "indigo", "lime", "orange", "pink", "red", "teal", "violet", "yellow"]

  return (
    <div className="w-full flex justify-center items-center h-96">
      <Loader 
        size="xl" 
        color={array[random]} 
        // variant={random > 5 ? "oval" : "bars"} 
      />
    </div>
  )
}


export default {
  ErrorPage,
  Loaded
}
