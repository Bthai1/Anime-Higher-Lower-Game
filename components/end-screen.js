import styles from './start.module.css';

export default function End_Screen({lostScreen, showScreen, score}){

    function changeScreen(){
        showScreen(2)
    }

    return(
        <div style={{display: lostScreen?"flex":"none"}} className={styles.end_screen}>
            <div className={styles.end_screen_content}>
            <h1>You scored:</h1>
            <h2>{score}</h2>
            <h2></h2>
            <button onClick={changeScreen}>Try again!</button>
            </div>
        </div>
    )
}