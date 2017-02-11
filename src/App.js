import React, { Component } from 'react';

import './App.css';

import { listPairs, shuffleArray } from './utils';
import { VALUES, OBJECTS } from './constants';

const PAIRS_SPECIAL = [
  ['help', 'me'],
  ['this test', 'shit'],
  ['your mom', Infinity],
  [0, '00'],
  [0.00001, 0.000001],
  [0.000001, 0.000001],
  [-0.000001, 0.000001],
  [Symbol(0), Symbol(0)],
  [Symbol(0), '0'],
  ['kozulya', 'kozu1ya'],
  ['yes', true],
  ['no', false],
];

const getBalancedPairs = () => {
  const pairsFalsy = [];
  const pairsTruthy = [];

  listPairs(VALUES)
    .forEach((pair) => {
      const [left, right] = pair;
      const target = left == right ? // eslint-disable-line eqeqeq
        pairsTruthy : pairsFalsy;

      target.push(pair);
    });

  const length = pairsTruthy.length;

  return shuffleArray(
    pairsTruthy
      .concat(shuffleArray(pairsFalsy).slice(-length))
      .concat(PAIRS_SPECIAL)
  );
};

let pairs = getBalancedPairs();

const total = pairs.length;

const getObjectString = (obj) => {
  switch (obj) {
    case OBJECTS[0]:
      return '[]';
    case OBJECTS[1]:
      return '[[]]';
    case OBJECTS[2]:
      return '[{}]';
    case OBJECTS[3]:
      return '[0]';
    case OBJECTS[4]:
      return '[1]';
    default:
      return '{}';
  }
};

const getStringFrom = (value) => {
  if (value === '') {
    return '""';
  }

  const str = OBJECTS.indexOf(value) === -1 ?
    String(value) : getObjectString(value)

  switch (typeof value) {
    case 'string':
      return `"${str}"`;
    default:
      return str;
  }
};

const ValueElement = ({ value }) => {
  const str = getStringFrom(value);

  return (
    <div className="pair__value">{ str }</div>
  );
};

class App extends Component {
  state = {
    points: 0,
    step: 0,
    pair: null,
    isStarted: false,
    isFinished: false,
  };

  chooseAnswer = (value) => {
    this.setState((state) => {
      if (state.isFinished) {
        pairs = getBalancedPairs();

        return {
          points: 0,
          pair: pairs.pop(),
          step: 1,
          isFinished: false,
        };
      }

      let {
        points,
        pair: previous,
      } = state;

      if (previous) {
        const [left, right] = previous;
        const result = left == right; // eslint-disable-line eqeqeq

        if (result === value) {
          points += 100;
        }
      }

      if (!pairs.length) {
        return {
          points,
          isFinished: true,
        };
      }

      return {
        points,
        pair: pairs.pop(),
        step: state.step + 1,
        isStarted: true,
      };
    });
  };

  render() {
    const {
      points,
      step,
      pair,
      isStarted,
      isFinished,
    } = this.state;

    return (
      <div className="app">
        {
          isStarted && !isFinished ? (
            <div>
              <div className="stats">
                <div className="stats__total">
                  {
                    `${total - pairs.length} / ${total}`
                  }
                </div>
                <div className="stats__points">
                  { points }
                </div>
              </div>
              <div className="pair">
                <ValueElement value={pair[0]} />
                <div className="pair__equals">==</div>
                <ValueElement value={pair[1]} />
              </div>
              <div className="choice">
                <button
                  className="btn choice__true"
                  onClick={() => this.chooseAnswer(true)}
                >true</button>
                <button
                  className="btn choice__false"
                  onClick={() => this.chooseAnswer(false)}
                >false</button>
              </div>
            </div>
          ) : null
        }
        {
          isFinished ? (
            <div className="result">
              <div className="result__points">
                Your final result: { points }
              </div>
            </div>
          ) : null
        }
        {
          !step || isFinished ? (
            <button
              type="button"
              className="btn app__start"
              onClick={this.chooseAnswer}
            >start</button>
          ) : null
        }
      </div>
    );
  }
}

export default App;
