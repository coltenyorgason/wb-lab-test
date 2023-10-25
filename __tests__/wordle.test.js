
import { jest } from '@jest/globals';

const mockIsWord = jest.fn(() => true);
jest.unstable_mockModule('../src/words.js', () => {
    return {
      getWord: jest.fn(() => 'APPLE'),
      isWord: mockIsWord
    };
  });
  
  const { Wordle, buildLetter } = await import('../src/wordle.js');

  
  describe('building a letter object', () => {
    test('returns a letter object', () => {
        const letter = buildLetter ('A', 'PRESENT')
        expect(letter).toEqual({letter: 'A', status: 'PRESENT'})
    });
  });

  describe('constructing a new Wordle game', () => {
    test('sets max guesses to 6 if no arguments passed', () => {
       const game = new Wordle()
       expect(game.maxGuesses).toEqual(6)
    })
    test('sets max guesses to argument', () => {
        const game = new Wordle(10)
        expect(game.maxGuesses).toEqual(10)
     })
     test('sets guesses to an array length', () => {
        const game = new Wordle()
        expect(game.guesses.length).toEqual(6)
     })
     test('sets curr guess to 0', () => {
        const game = new Wordle()
        expect(game.currGuess).toEqual(0)
     })

     test('check if the value is apple', () => {
        const word = new Wordle()
        expect(word.word).toEqual('APPLE')
     })
    });
  describe('checking buildGuessFromWords', () => {
    test('sets status to correct', () => {
        const correctStatus = new Wordle()
        const guessBuild = correctStatus.buildGuessFromWord('A____')
        expect(guessBuild[0].status).toEqual('CORRECT')
    })
    test('sets status to present', () => {
        const presentStatus = new Wordle()
        const present = presentStatus.buildGuessFromWord('E____')
        expect(present[0].status).toEqual('PRESENT')
    })
    test('sets status to absent', () => {
        const absentStatus = new Wordle()
        const absent = absentStatus.buildGuessFromWord('Z____')
        expect(absent[0].status).toEqual('ABSENT')
  })
});

describe('check if something throws an error', () => {
test('throws an error if there is not any more guesses allowed', () => {
    const error = new Wordle(1)
    error.appendGuess('22222')
    expect(() => {
        error.appendGuess('33333')
    }).toThrow()
})
test('throws an error if the guess is is not the lenth of 5', () => {
    const error = new Wordle(1)
    expect(() => {
        error.appendGuess('333333')
    }).toThrow()
})
test('throws an error if the guess is not a word', () => {
    const error = new Wordle(1)
    mockIsWord.mockReturnValueOnce(false)
    expect(() => {
        error.appendGuess('33333')
    }).toThrow()
})
test('increments the current guess', () => {
    const guess = new Wordle(1)
    guess.appendGuess('shitt')
    expect(guess.currGuess).toEqual(1)
        })
})

describe('latest guess is the correct word', () => {
    test('return true', () => {
        const isTrue = new Wordle()
        isTrue.appendGuess('APPLE') 
        expect(isTrue.isSolved()).toEqual(true)
    })
})

describe('ends the game', () => {
    test('returns true if the latest guess is the correct word', () => {
        const isTrue = new Wordle()
        isTrue.appendGuess('APPLE')
        expect(isTrue.shouldEndGame()).toEqual(true)
    })
    test('returns true if there are no more guesses left', () => {
        const isTrue = new Wordle(1)
        isTrue.appendGuess('APPLE')
        expect(isTrue.shouldEndGame()).toEqual(true)
    })
    test('returns false if there are guesses left and the word has not been guessed', () => {
        const isTrue = new Wordle()
        isTrue.appendGuess('Orang')
        expect(isTrue.shouldEndGame()).toEqual(false)
})
test('returns false if no guess has been made', () => {
    const isTrue = new Wordle()
    expect(isTrue.shouldEndGame()).toEqual(false)
})

})