let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");
let winnerMsg = document.querySelector(".winner-msg");

let turnO = false;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (isWinner || count === 9) {
            disableBoxes();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }

    if (count === 9) {
        showWinner("DRAW");
        return true;
    }

    return false;
};


const showWinner = (winner) => {
    if (winner === "DRAW") {
        winnerMsg.innerText = `${winner}`;
    } else {
        winnerMsg.innerText = `${winner} wins!`;
    }
    winnerMsg.classList.remove("hidden");
    reset.innerHTML = "NEW GAME";
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    reset.innerHTML = "RESET";
    winnerMsg.classList.add("hidden");
    count = 0;
};

reset.addEventListener("click", enableBoxes);
