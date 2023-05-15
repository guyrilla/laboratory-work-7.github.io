var SnakeLenght = 1;//отвечает за длину змеи
var Head = 0;//отвечает за индекс массива, в котором находится 
var X_axis = {value: 1};
var Y_axis = {value: 1};
var SnakePosition = [];
SnakePosition[Head] = [X_axis,Y_axis];
const Cells = document.getElementsByClassName("main-board__cell");
var cellElement;
let BoardSections = [];
for(let i = 0; i < 25; i++)
{
    BoardSections[i] = [];
    for(let j = 0; j < 25; j++)
    {
        BoardSections[i][j] = Cells[i * 25 + j].innerText;
    }
}
for(let i = 0; i < 25; i++)
{
    for(let j = 0; j < 25; j++)
    {
        if(i === 0 || i === 24)
        {
            BoardSections[i][j] = 3;//устанавливает нижнюю и верхнюю границу в значение 2
        }
        else if(i > 0 && i < 25 && j >= 1 && j !== 24) 
        {
            BoardSections[i][j] = 0;//устанавливает клетки поля, не включая границы ,в значение 0
        }
        else if(i > 0 && i < 25 && (j === 0 || j === 24))
        {
            BoardSections[i][j] = 3;//устаналивливает боковые границы в значение 3
        };
    }
}
function ClearData()//очищает все значения при старте игры
{
    SnakeLenght = 1;
    Head = 0;
    X_axis = 1;
    Y_axis = 1;
    SnakePosition = [];
    SnakePosition[Head] = [X_axis,Y_axis];

}
function StartGame()//запускает нашу игру
{
    ClearData();
}
function MoveUp(xAxis,yAxis)
{
    let Move = true;
    while(Move === true)
    {
        let cellElement;
        cellElement = Cells[yAxis.value * 25 + xAxis.value];
        cellElement.style.backgroundColor = "red";
        yAxis.value -= 1;
        cellElement = Cells[yAxis.value * 25 + xAxis.value];
        cellElement.style.backgroundColor = "white";
        switch(BoardSections[yAxis.value][xAxis.value])
        {
            case 3:
                Move = false;
                GameOver();
                break;
            case 2:
                SnakeGrown();
                break;
        }
    }
}
function MoveDown(xAxis,yAxis)
{
    let Move = true;
    let i = 0;
    while(Move === true && i != 10)
    {
        i += 1;
        let cellElement;
        cellElement = Cells[yAxis.value * 25 + xAxis.value];
        cellElement.style.backgroundColor = "white";
        yAxis.value += 1;
        cellElement = Cells[yAxis.value * 25 + xAxis.value];
        cellElement.style.backgroundColor = "red";
        switch(BoardSections[yAxis.value][xAxis.value])
        {
            case 3:
                Move = false;
                GameOver();
                break;
            case 2:
                SnakeGrown();
                break;
        }
    }
}
function MoveLeft(xAxis,yAxis)
{
    let Move = true;
    let i = 0;
    while(Move === true && i != 3)
    {
        i += 1;
        let cellElement;
        cellElement = Cells[yAxis.value * 25 + xAxis.value];
        cellElement.style.backgroundColor = "white";
        xAxis.value -= 1;
        cellElement = Cells[yAxis.value * 25 + xAxis.value];
        cellElement.style.backgroundColor = "red";
        switch(BoardSections[yAxis.value][xAxis.value])
        {
            case 3:
                Move = false;
                GameOver();
                break;
            case 2:
                SnakeGrown();
                break;
        }
    }
}
function MoveRight(xAxis,yAxis)
{   
    let Move = true;
    let i = 0;
    while(Move === true && i != 5)
    {
        i += 1;
        let cellElement;
        cellElement = Cells[yAxis.value * 25 + xAxis.value];
        cellElement.style.backgroundColor = "white";
        xAxis.value += 1;
        cellElement = Cells[yAxis.value * 25 + xAxis.value];
        cellElement.style.backgroundColor = "red";
        switch(BoardSections[yAxis.value][xAxis.value])
        {
            case 3:
                Move = false;
                GameOver();
                break;
            case 2:
                SnakeGrown();
                break;
        }
    }
}
function SnakeGrown()
{

}
function GameOver()
{
    console.log("Вы проиграли");
}
console.log("X_axis после сдвига змейки =" + " " + X_axis.value);