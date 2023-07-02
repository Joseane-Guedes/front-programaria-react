import { useState, useEffect } from 'react'
import listaImg from '../assets/4706239.jpg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [nome, setNome] = useState('')
  const [minibio, setminibio] = useState('')
  const [citacao, setCitacao] = useState('')
  const [imagem, setImagem] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://backend-jrhz.onrender.com/mulheres'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueNome(event) {
    setNome(event.target.value)
  }

  function handleInputValueminibio(event) {
    setminibio(event.target.value)
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function handleInputValueCitacao(event) {
    setCitacao(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', nome, citacao, minibio, imagem)

    async function sendData() {
      await Axios.post(baseURL, {
        nome: nome,
        citacao: citacao,
        minibio: minibio,
        imagem: imagem
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setNome('')
    setminibio('')
    setImagem('')
    setCitacao('')
  }

  return (
    <>
      <Header
        title='Women in Tech Brazil'
        subtitle='Get to know female personalities who are transforming technology in Brazil!'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return(
                <div key={repo._id} className={styles.cardRepo}>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.imagem} />
                </div>
                <details>
                  <summary className={styles.cardRepoSummary}>
                    {repo.nome}
                  </summary>
                  <p className={styles.cardRepoText}>{repo.minibio}</p>
                  <q className={styles.cardRepoQuote}>{repo.citacao}</q>
                </details>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Register a tech queen:</h2>
        <form  className={styles.form} onSubmit={handleCreateMessage}>
          <input 
            onChange={handleInputValueNome} 
            placeholder="Name"
            value={nome}
            className={styles.formInput}
          />
          <textarea 
            onChange={handleInputValueImagem} 
            placeholder="Link"
            value={imagem}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueminibio} 
            placeholder="Mini biography"
            value={minibio}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueCitacao} 
            placeholder="Quote"
            value={citacao}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Send message</button>
          {success && <p>Registration successfully completed.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}
