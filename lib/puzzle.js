window.puzzles = {}

puzzles.easy = [
    0,2,0,1,7,8,0,3,0,
    0,4,0,3,0,2,0,9,0,
    1,0,0,0,0,0,0,0,6,
    0,0,8,6,0,3,5,0,0,
    3,0,0,0,0,0,0,0,4,
    0,0,6,7,0,9,2,0,0,
    9,0,0,0,0,0,0,0,2,
    0,8,0,9,0,1,0,6,0,
    0,1,0,4,3,6,0,5,0
]

puzzles.blank = [
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0
]

window.step = function (puzzle, base) {
    console.log("step")
    var base = puzzles.blank
    var puzzle = puzzle || puzzles.easy.slice(0)
    var next = nextEmpty(puzzle)

    mapColors(puzzle)
    if (isValid(puzzle) && isComplete(puzzle)) {
        console.log("complete")
    } else if (isValid(puzzle)) {
        console.log("else if")
        start(next, puzzle)
        mapColors(puzzle)
        setTimeout(function () {
            step(puzzle, base)
            },
            50
        )
    } else {
        console.log("else")
        handleLast(puzzle, base, next)
        mapColors(puzzle)
        setTimeout(function () {
            step(puzzle, base)
            },
            50
        )
    }
}

function handleLast (puzzle, base, next) {
    var trace = next - 1 || 80
    while(trace >= 0) {
        if (puzzle[trace] != base[trace]) {
            if (puzzle[trace] != 9) {
                puzzle[trace]++
                return
            } else {
                puzzle[trace] = 0
                mapColors(puzzle)
            }
        }
        trace--
    }
}

function start (next, puzzle) {
    puzzle[next] = 1
}

Array.prototype.count = function (el) {
    num = 0
    for(var i = 0; i < this.length; i++) {
        if (this[i] == el) {
            num ++
        }
    }
    return num
}

function isComplete (puzzle) {
    return puzzle.count(0) === 0
}

function nextEmpty (puzzle) {
    for(var i = 0; i < puzzle.length; i++){
        if (puzzle[i] == 0) {
            return i
        }
    }
}

function mapColors (puzzle) {
    $lis = $("li").removeClass()
    for(var i = 0; i < puzzle.length; i++) {
        $($lis[i]).addClass("b" + puzzle[i])
    }
}

function isValid (puzzle) {
    if (
        areRowsValid(puzzle) &&
        areColumnsValid(puzzle) &&
        areSquaresValid(puzzle)
    ) {
        return true
    } else {
        return false
    }
}

function areRowsValid (puzzle) {
    for(var i = 0; i < 9; i++) {
        subArray = puzzle.slice(i*9, i*9 + 9)
        if (!isGroupValid(subArray)) {
            return false
        }
    }
    return true
}

function isGroupValid (array) {
    for (var j = 1; j <= 9; j++) {
        if (array.count(j) > 1) {
            return false
        }
    }
    return true
}

function areColumnsValid (puzzle) {
    for(var i = 0; i < 9; i++) {
        subArray = []
        for(var j = 0; j < 9; j++) {
            subArray.push(puzzle[j * 9 + i])
        }
        if (!isGroupValid(subArray)) {
            return false
        }
    }
    return true
}

function areSquaresValid (puzzle) {
    places = [0,1,2,9,10,11,18,19,20]
    changes = [0,3,6,27,30,33,54,57,60]
    for(var i = 0; i < changes.length; i++) {
        subArray = []
        for(var j = 0; j < places.length; j++) {
            subArray.push(puzzle[places[j] + changes[i]])

        }
        if(!isGroupValid(subArray)) {
            return false
        }
    }
    return true

}
