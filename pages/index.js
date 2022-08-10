import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import Start_Screen from '../components/start-screen';
import End_Screen from '../components/end-screen';

export default function Home(props) {

  const [animeOne, setAnimeOne] = useState(props.anime_one)
  const [animeTwo, setAnimeTwo] = useState(props.anime_two)
  const [startScreen, setStartScreen] = useState(true);
  const [gameScreen, setGameScreen] = useState(false);
  const [lostScreen, setLostScreen] = useState(false);
  const [score, setScore] = useState(0);

  //Choose which screen to show depending on the value of the variable screen
  const showScreen = (screen) =>{
      if(screen == 1){
        setStartScreen(true)
        setGameScreen(false)
        setLostScreen(false)
      }else if(screen == 2){
        setStartScreen(false)
        setGameScreen(true)
        setLostScreen(false)
        resetScore()
      }else if(screen == 3){
        setStartScreen(false)
        setGameScreen(false)
        setLostScreen(true)
      }
  }

  const incrementScore = () =>{
    setScore(score+1)
  }
  
  const resetScore = () =>{
    setScore(0)
  }

  async function getNewRandomAnime(){
    const res = await fetch('https://api.jikan.moe/v4/random/anime')
    const data = await res.json();
    setAnimeTwo(data)
  }

  //User has clicked higher button check animeTwo has more members than animeOne 
  //If so incrementScore else change to end screen
  const checkHigher = () =>{
    if(animeTwo.data.members > animeOne.data.members){
      incrementScore()
    }else{
      showScreen(3)
    }
    setAnimeOne(animeTwo)
    getNewRandomAnime()
  }

  const checkLower = () =>{
    if(animeTwo.data.members < animeOne.data.members){
      incrementScore()
    }else{
      showScreen(3)
    }
    setAnimeOne(animeTwo)
    getNewRandomAnime()
  }

  return (
    <div className={styles.container}>
      
      <Start_Screen startScreen={startScreen} showScreen={showScreen}></Start_Screen>
      <End_Screen lostScreen={lostScreen} showScreen={showScreen} score={score}></End_Screen>
      <div style={{display: gameScreen?"grid":'none'}} className={styles.game}>
        <div className={styles.leftDiv}>
          <Image
            src = {animeOne.data.images.jpg.large_image_url}
            layout = "fill"
            objectPosition = "center"
            objectFit= 'cover'
            style={{opacity:"50%"}}
          />
          <div className={styles.animeContent}>
          <h1>{animeOne.data.title}</h1>
          <p>has</p>
          <h1>{animeOne.data.members}</h1>
          <p>members</p>
          </div>
        </div>
        <div className={styles.rightDiv}>
        <Image
            src = {animeTwo.data.images.jpg.large_image_url}
            layout = "fill"
            objectPosition = "center"
            objectFit= 'cover'
            style={{opacity:"50%"}}
          />
          <div className={styles.animeContent}>
          <h1>{animeTwo.data.title}</h1>
          <p>has</p>
          <button onClick={checkHigher}>Higher</button>
          <button onClick={checkLower}>Lower</button>
          <p>members than {animeOne.data.title}</p>
          </div>
        </div>
        <div className={styles.middleCircle}>
          <div className={styles.middleText}>VS</div>
        </div>
      </div>
    </div>
  )
}

//This function is used to fetch data from API before website renders so an error doesn't occur.
export async function getStaticProps(){
  //Tried to make this into an async function but did not work. Not sure if there is a way to not have a duplicate.
  const res_one = await fetch('https://api.jikan.moe/v4/random/anime')
  const data_one = await res_one.json();

  const res_two = await fetch('https://api.jikan.moe/v4/random/anime')
  const data_two = await res_two.json();

    return {
      props:{ anime_one: data_one,
              anime_two: data_two }
    }
}