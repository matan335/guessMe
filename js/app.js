'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;
var KEY_QUEST = 'KEY_QUEST'

$(document).ready(init);

function init() {
    $('.wonState').hide()
    if (loadFromStorage(KEY_QUEST)) {
        gQuestsTree = loadFromStorage(KEY_QUEST)
        gCurrQuest = gQuestsTree;
    }
    else {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Yaron?');
        gQuestsTree.no = createQuest('Hen?');
        gCurrQuest = gQuestsTree;
    }
}

function startGuessing() {
    $('.wonState').hide();
    $('h2').show();
    $('.gameStart').hide();
    renderQuest();
    $('.gameQuest').css("display", "block");

}

function renderQuest() {
    $('h2').text(gCurrQuest.txt)

}

function userResponse(res) {
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            // alert('Yes, I knew it!');
            $('.gameQuest').hide();
            console.log($('.wonState'))
            $('.wonState').show();
            restartGame();
            // TODO: improve UX
        } else {
            $('.gameQuest').css("display", "none");
            $('.gameNewQuest').css("display", "block");
            
            
        }
    } else {
        gPrevQuest = gCurrQuest
        gCurrQuest = gCurrQuest[res]
        gLastRes = res;
        // TODO: update the prev, curr and res global vars
        renderQuest();
    }
}

function addGuess() {
    debugger;
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    var newChar = $('.AddCharacter').val()
    var newQuest = $('.AddQuestion').val()
    gPrevQuest[gLastRes] = createQuest(newQuest);
    gPrevQuest[gLastRes].yes = createQuest(newChar + '?')
    gPrevQuest[gLastRes].no = gCurrQuest;
    saveToStorage(KEY_QUEST, gQuestsTree)
    restartGame();
}


function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
   
    $('h2').hide()
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}