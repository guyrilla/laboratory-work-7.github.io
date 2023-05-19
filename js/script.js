var Direction = 'right';
var ButtonClicked = false;
var Apple_Xaxis = {value: 2};
var Apple_Yaxis = {value: 2};
function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
var ScoreInDocument = document.querySelector('.score-box__number');
var Menu = document.querySelector('.menu');
var Button = document.querySelector('.menu__button');
Button.addEventListener('click',handleClick);
function handleClick()
{
    if(ButtonClicked == false)
    {
        StartGame();
    }
    else
    {
        return;
    }
}
var Score = 0;
document.addEventListener('keydown',keyPress);
var yAxis = {value: 1};
var xAxis = {value: 1};
var MoveAnimation;
var Speed = 100;
const Cells = document.getElementsByClassName("main-board__cell");
let BoardSections = [];
for(let i = 0; i < 25; i++)
{
    BoardSections[i] = [];
    for(let j = 0; j < 25; j++)
    {
        BoardSections[i][j] = Cells[i * 25 + j].innerText;
    }
}
var Obstacles1 = [
[5,6],
[5,10],
[6,2],
[4,3],
[8,5],
[6,7],
[10,2],
[15,8],
[17,7],
[5,10],
[10,7],
[7,9],
[10,14],
[10,18],
[12,20],
[13,15],
[17,18]
];
var Obstacles2 = [
[5,5],
[5,6],
[5,7],
[5,8],
[5,9],
[5,10],
[5,11],
[5,12],
[5,13],
[7,5],
[7,6],
[7,7],
[7,8],
[7,9],
[7,10],
[7,11],
[7,12],
[7,13],
[10,4],
[10,5],
[10,6],
[10,7],
[10,8],
[10,9],
[10,10],
[10,11],
[10,12],
[10,13],
[10,14],
[10,15],
[10,16],
[10,17],
[11,7],
[6,2],
[8,6],
[12,8],
[19,1],
[20,10],
[20,15],
[18,12],
[12,18],
[12,10],
[12,10],
[15,21],
[18,18],
[21,21],
[22,10],
];
var Obstacles3 = [
[13,15],
[3,21],
[14,22],
[16,12],
[17,2],
[19,5],
[20,17],
[18,7],
[18,8],
[18,9],
[18,10],
[21,13],
[5,15],
[7,12],
[18,6],
[13,2],
[17,15],
[7,15],
[20,7],
[11,20],
[12,15],
[15,2],
[3,8],
[12,12],
[12,13],
[12,14],
[12,15],
[12,16],
[12,17],
[12,18],
[12,19],
[12,20],
[12,3],
[12,4],
[12,5],
[12,6],
[12,7],
[12,8],
[12,9],
[12,10],
[12,11]
];
var Obstacles4 =
[[6, 14],
[19, 3],
[2, 21],
[8, 17],
[16, 5],
[12, 9],
[4, 20],
[10, 2],
[7, 12],
[15, 6],
[1, 22],
[18, 13],
[9, 11],
[3, 8],
[21, 16],
[13, 7],
[5, 18],
[11, 10],
[17, 4],
[22, 1]]
var Obstacles5 =
[[14, 20],
[7, 15],
[2, 10],
[12, 18],
[21, 8],
[17, 6],
[4, 3],
[9, 1],
[6, 16],
[15, 11],
[22, 19],
[13, 9],
[5, 4],
[1, 7],
[19, 21],
[10, 12],
[8, 2],
[16, 14],
[3, 13],
[11, 5],
[18, 22]]
var Obstacles6 =
[[19, 5],
[3, 21],
[10, 17],
[15, 12],
[2, 7],
[22, 16],
[14, 8],
[7, 1],
[9, 13],
[20, 3],
[13, 9],
[6, 22],
[16, 5],
[8, 10],
[1, 15],
[4, 20],
[18, 2],
[11, 14],
[5, 19],
[21, 6],
[12, 9],
[7, 4]]
var Obstacles7 =
[[12, 1],
[6, 18],
[3, 10],
[15, 7],
[19, 13],
[9, 20],
[5, 4],
[11, 9],
[1, 14],
[17, 2],
[7, 16],
[22, 12],
[13, 5],
[4, 21],
[8, 6],
[2, 19],
[14, 3],
[10, 17],
[20, 8],
[16, 11]]
function BuildLvl(Obstacles)
{
    for(let i = 0; i < Obstacles[0].length - 1; i++)
    {
        for(let j = 0; j < Obstacles.length; j++)
        {
            let cellElement = Cells[Obstacles[j][i] * 25 + Obstacles[j][i + 1]];
            cellElement.style.backgroundColor = "red";
            BoardSections[Obstacles[j][i]][Obstacles[j][i + 1]] = 5;
        }
    }
}
function PickRandomLvl()
{
    let Lvl = getRandomInt(1, 8);
    switch(Lvl)
    {
        case 1:
            BuildLvl(Obstacles1);
            break;
        case 2:
            BuildLvl(Obstacles2);
            break;
        case 3:
            BuildLvl(Obstacles3);
            break;
        case 4:
            BuildLvl(Obstacles4);
            break;
        case 5:
            BuildLvl(Obstacles5);
            break;
        case 6:
            BuildLvl(Obstacles6);
            break;
        case 7:
            BuildLvl(Obstacles7);
            break;
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
    Direction = 'right';
    Apple_Xaxis = {value: 2};
    Apple_Yaxis = {value: 2};
    Score = 0;
    ScoreInDocument.textContent = Score;
    yAxis = {value: 1};
    xAxis = {value: 1};
    ButtonClicked = false;
    for(let i = 0; i < 25; i++)
    {
        for(let j = 0; j < 25; j++)
        {
            let cellElement = Cells[j * 25 + i];
            cellElement.style.backgroundColor = "white";
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
}
function StartGame()//запускает нашу игру
{
    ButtonClicked = true;
    Menu.style.opacity = "0";
    NewRandomApple(Apple_Xaxis,Apple_Yaxis);
    PickRandomLvl();
    MoveAnimation = setInterval(() => Move(xAxis,yAxis),Speed);
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
        cellElement.style.backgroundColor = "black";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        switch(BoardSections[Y_axis.value][X_axis.value])
        {
            case 5:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "red";
                GameOver();
                break;
            case 4:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "white";
                GameOver();
                break;
            case 2:
                BoardSections[Apple_Yaxis.value][Apple_Xaxis.value] = 1;
                NewRandomApple(Apple_Xaxis,Apple_Yaxis);
                Score += 1;
                ScoreInDocument.textContent = Score;
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
        cellElement.style.backgroundColor = "black";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        switch(BoardSections[Y_axis.value][X_axis.value])
        {
            case 5:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "red";
                GameOver();
                break;
            case 4:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "white";
                GameOver();
                break;
            case 2:
                BoardSections[Apple_Yaxis.value][Apple_Xaxis.value] = 1;
                NewRandomApple(Apple_Xaxis,Apple_Yaxis);
                Score += 1;
                ScoreInDocument.textContent = Score;
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
        cellElement.style.backgroundColor = "black";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        switch(BoardSections[Y_axis.value][X_axis.value])
        {
            case 5:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "red";
                GameOver();
                break;
            case 4:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "white";
                GameOver();
                break;
            case 2:
                BoardSections[Apple_Yaxis.value][Apple_Xaxis.value] = 1;
                NewRandomApple(Apple_Xaxis,Apple_Yaxis);
                Score += 1;
                ScoreInDocument.textContent = Score;
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
        cellElement.style.backgroundColor = "black";
        if(BoardSections[Y_axis.value][X_axis.value] == 0 || BoardSections[Y_axis.value][X_axis.value] == 3)
        {
            BoardSections[Y_axis.value][X_axis.value] = 1;
        }
        switch(BoardSections[Y_axis.value][X_axis.value])
        {
            case 5:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "red";
                GameOver();
                break;
            case 4:
                cellElement = Cells[Y_axis.value * 25 + X_axis.value];
                cellElement.style.backgroundColor = "white";
                GameOver();
                break;
            case 2:
                BoardSections[Apple_Yaxis.value][Apple_Xaxis.value] = 1;
                NewRandomApple(Apple_Xaxis,Apple_Yaxis);
                Score += 1;
                ScoreInDocument.textContent = Score;
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
        case 'ц':
            TurnUp();
            break;
        case 'ф':
            TurnLeft();
            break;
        case 'ы':
            TurnDown();
            break;
        case 'в':
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



function GameOver()
{
    clearInterval(MoveAnimation);
    ClearData();
    Menu.style.opacity = "1";
}
function NewRandomApple(Apple_X_axis,Apple_Y_axis)
{
    let ApplePositionIsFound = false;
    while(ApplePositionIsFound === false)
    {
        Apple_X_axis.value = getRandomInt(1, 25);
        Apple_Y_axis.value = getRandomInt(1, 25);
        if (BoardSections[Apple_Y_axis.value][Apple_X_axis.value] === 0) 
        {
            BoardSections[Apple_Y_axis.value][Apple_X_axis.value] = 2;
            let cellElement = Cells[Apple_Y_axis.value * 25 + Apple_X_axis.value];
            cellElement.style.backgroundColor = "green";
            ApplePositionIsFound = true;
        }
    }
}