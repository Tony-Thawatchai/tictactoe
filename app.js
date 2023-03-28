const xClass = "x"
const circleClass = 'circle'
const cellElements = document.querySelectorAll('.cell')
const boardElement = document.getElementById('board')
let circleTurn
const winningArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



startGame()

function startGame(){
    console.log ('start game')
    winningMessage.classList.remove('show')
    cellElements.forEach((cell)=>{
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
    })
    circleTurn = false;
    cellElements.forEach ((cell)=>{
        cell.addEventListener('click', cellClicked, {once:true})
    })
    setHover()
    showTurnDisplay()
}

function showTurnDisplay(){
    if (circleTurn){
        turnDisplay.innerHTML = "Circle's turn"
        turnDisplay.style.color = "green"
    } else {
        turnDisplay.innerHTML = "X's turn"
        turnDisplay.style.color = "Firebrick"
    }
}

function cellClicked(e) {
    const selectedCell = e.target
    const currentClass = circleTurn ? circleClass : xClass
    addMark(selectedCell, currentClass)
    if(checkWin(currentClass)){
        gameWin(currentClass)
    } else if (checkDraw()){
        gameDraw()
    }else {
        switchTurn()
        showTurnDisplay()
        setHover()
    }
   
}

function addMark(selectedCell, currentClass){
    selectedCell.classList.add(currentClass)
}

function switchTurn(){
    circleTurn = !circleTurn
}

function setHover(){
    boardElement.classList.remove(xClass)
    boardElement.classList.remove(circleClass)
    if (circleTurn){
        boardElement.classList.add(circleClass)
    } else {
        boardElement.classList.add(xClass)
    }
}

function checkWin(currentClass){
    return  winningArray.some((combination) => {
        return combination.every((index) =>{
            return cellElements[index].classList.contains(currentClass)
        })
    } )
}

function checkDraw(){
    return [...cellElements].every((cell) => {
            return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    } )
}

function gameWin(currentClass){
    winningMessage.classList.add('show')
    winningMessageText.innerHTML = `${currentClass.toUpperCase()} WIN!`   
    if (currentClass == xClass){
        winningMessageText.style.color = "Firebrick"
    } else {
        winningMessageText.style.color = "green"
    }

}

function gameDraw(){
    winningMessage.classList.add('show')
    winningMessageText.innerHTML = `DRAW!`
}
        
restartBtn.addEventListener('click', startGame)

