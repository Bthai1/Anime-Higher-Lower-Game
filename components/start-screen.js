import styles from './start.module.css';

export default function Start_Screen({startScreen, showScreen, anime}){

    function changeScreen(){
        showScreen(2)
    }

    return(
        <div style={{display: startScreen?"flex":"none"}} className={styles.start_screen}>
            <div className={styles.start_screen_content}>
            <h1>The Higher Lower Game Anime Edition</h1>
            <h2> What are the most popular animes?</h2>
            <h2>An anime spin on the popular web game The Higher Lower Game. <br/> The data is taken from the Jikan Rest API.</h2>
            <button onClick={changeScreen}>Start</button>
            </div>
        </div>
    )
}