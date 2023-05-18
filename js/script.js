var Direction = 'right';
var SnakeLenght = 1;//отвечает за длину змеи
var Head = 0;
document.addEventListener('keydown',keyPress);
var yAxis = {value: 1};
var xAxis = {value: 1};
var MoveAnimation;
var SnakeSpeed = 100;
var SnakePosition = [];
SnakePosition[Head] = [xAxis,yAxis];
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
            BoardSections[i][j] = 4;//устанавливает нижнюю и верхнюю границу в значение 4
        }
        if(i > 1 && i < 24 && j > 1 && j < 24) 
        {
            BoardSections[i][j] = 0;//устанавливает клетки поля, не включая границы ,в значение 0
        }
        if(i === 1 || i === 23)
        {
            BoardSections[i][j] = 3;//устанавливает пограничные клетки в значение 3 снизу и сверху
        }
        if(i > 1 && i < 24 && (j === 1 || j === 23))
        {
            BoardSections[i][j] = 3;//устаналивливает пограничные клетки границы в значение 3
        }
        if(i > 0 && i < 25 && (j === 0 || j === 24))
        {
            BoardSections[i][j] = 4;//устаналивливает боковые границы в значение 4
        }
    }
}

function ClearData()//очищает все значения при старте игры
{
    SnakeLenght = 1;
    Head = 0;
    X_axis = 1;
    Y_axis = 1;
    SnakePosition = [];
    SnakePosition[Head] = [];

}
function StartGame()//запускает нашу игру
{
    MoveAnimation = setInterval(() => Move(xAxis,yAxis),SnakeSpeed);
}

function Move(X_axis,Y_axis)
{
    if(Direction === 'right')
    {
        let cellElement;
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        cellElement = Cells[Y_axis.value * 25 + X_axis.value];
        cellElement.style.backgroundColor = "white";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 0;
        }
        X_axis.value += 1;
        cellElement = Cells[Y_axis.value * 25 + X_axis.value];
        cellElement.style.backgroundColor = "red";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        switch(BoardSections[Y_axis.value][X_axis.value])
        {
            case 4:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "white";
                GameOver();
                break;
            case 3:
                break;
            case 2:
                SnakeGrown();
                break;
        }
    }

    if(Direction === 'left')
    {
        let cellElement;
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        cellElement = Cells[Y_axis.value * 25 + X_axis.value];
        cellElement.style.backgroundColor = "white";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 0;
        }
        X_axis.value -= 1;
        cellElement = Cells[Y_axis.value * 25 + X_axis.value];
        cellElement.style.backgroundColor = "red";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        switch(BoardSections[Y_axis.value][X_axis.value])
        {
            case 4:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "white";
                GameOver();
                break;
            case 3:
                break;
            case 2:
                SnakeGrown();
                break;
        }
    }
    if(Direction === 'up')
    {
        let cellElement;
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        cellElement = Cells[Y_axis.value * 25 + X_axis.value];
        cellElement.style.backgroundColor = "white";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 0;
        }
        Y_axis.value -= 1;
        cellElement = Cells[Y_axis.value * 25 + X_axis.value];
        cellElement.style.backgroundColor = "red";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        switch(BoardSections[Y_axis.value][X_axis.value])
        {
            case 4:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "white";
                GameOver();
                break;
            case 3:
                break;
            case 2:
                SnakeGrown();
                break;
        }
    }
    if(Direction === 'down')
    {
        let cellElement;
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        cellElement = Cells[Y_axis.value * 25 + X_axis.value];
        cellElement.style.backgroundColor = "white";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 0;
        }
        Y_axis.value += 1;
        cellElement = Cells[Y_axis.value * 25 + X_axis.value];
        cellElement.style.backgroundColor = "red";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        switch(BoardSections[Y_axis.value][X_axis.value])
        {
            case 4:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "white";
                GameOver();
                break;
            case 3:
                break;
            case 2:
                SnakeGrown();
                break;
        }
    }
}



function keyPress(event)
{
    var key = event.key;
    switch(key)
    {
        case 'w':
            TurnUp();
            break;
        case 'a':
            TurnLeft();
            break;
        case 's':
            TurnDown();
            break;
        case 'd':
            TurnRight();
            break;
    }
}



function TurnUp()
{
    Direction = 'up';
    return Direction;
}
function TurnLeft()
{
    Direction = 'left';
    return Direction;
}
function TurnDown()
{
    Direction = 'down';
    return Direction;
}
function TurnRight()
{
    Direction = 'right';
    return Direction;
}







function SnakeGrown()
{

}

function GameOver()
{
    clearInterval(MoveAnimation);
    ClearData();
    console.log("Вы проиграли");
}
StartGame();