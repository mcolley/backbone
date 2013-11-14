/**
 * Created by mcolley on 14/11/13.
 */
$(document).ready(function(){try {
    if (typeof AudioContext !== 'undefined') {
        context = new AudioContext();
    }
    else if (typeof webkitAudioContext !== 'undefined') {
        context = new webkitAudioContext();
    }
    else {
        throw 'Audio context not defined!';
    }
}
catch (e) {
    console.log(e);
}

    var topRow = $('ul#top-row');
    var bottomRow = $('ul#bottom-row');
    var blackNoteIndices = [1,4,6,9,11,13,16,18];
    var noSharp = [3,];
    var baseFrequency = 110.0;


    var ii = 0;

    do {
        var whiteNote = $('<li>').data('index',ii),
            blackNote = $('<li>');

        bottomRow.append(whiteNote);
        ii++;
        if (blackNoteIndices.indexOf(ii) != -1) {
            topRow.append(blackNote.data('index',ii));
            blackNote.addClass('display');
            ii++

        }
        else {
            topRow.append(blackNote);
        }
    } while (ii < 20);


    var oscillator = context.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 110;
    oscillator.start(0);

    var volume = context.createGain();
    volume.gain.value = 0;

    oscillator.connect(volume);
    volume.connect(context.destination);

    $('ul.notes li').on('mousedown',function( ev) {

        oscillator.detune.value = $(this).data().index * 100;
        console.log(ev, this, oscillator);
        volume.gain.value=0.5;
    })

    $('ul.notes li').on('mouseup',function(ev) {
        volume.gain.value=0;
    })
});