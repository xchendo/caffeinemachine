import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Example() {
  const [drinks, setDrinks] = useState([]);
  const [drinkAmount, setDrinkAmount] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState(0);

  const MAX_CAFFEINE = 500; // mg

  const fetchDrinks = async () => {
    const response = await fetch('/api/drinks');
    const json = await response.json();
    setDrinks(json);
  }

  useEffect(() => {
    fetchDrinks();
  }, []);

  const handleAmountChange = (e) => {
    let amount = e.target.value ? e.target.value : "";
    setDrinkAmount(amount);
  };

  const calculateCaffeineConsumed = () => {
    if (drinks && selectedDrink) {
      let drink = drinks[selectedDrink - 1];
      return drink.total_caffeine * drinkAmount;
    }
    return 0;
  }

  // must return a string
  const createResponseForRemainingCaffeine = (remaining) => {
    let noMore = 0;
    let responseToUser = drinks.map((drink) => {
      let servings = Math.floor(remaining / drink.total_caffeine);
      if (servings === 0) {
        noMore++;
      }
      return `You can drink ${servings} more ${drink.name}${servings === 1 ? '' : 's'}\n`;
    });
    if (noMore === drinks.length) {
      return `You have ${remaining}mg of caffeine left out of the safe limit of ${MAX_CAFFEINE}mg, but drinking anything else will put you over the safe limit. Just have another sip? Then no more caffeine for you!`;
    }
    return responseToUser.join('');
  }

  let consumedCaffeine = calculateCaffeineConsumed();

  let responseToUser = '';
  if (consumedCaffeine > MAX_CAFFEINE) {
    responseToUser = `You've gone ${consumedCaffeine - MAX_CAFFEINE} mg of caffeine over the safe limit of ${MAX_CAFFEINE}mg. No more caffeine for you!`
  } else if (consumedCaffeine === MAX_CAFFEINE) {
    responseToUser = `You've consumed the safe limit of ${MAX_CAFFEINE}mg of caffeine. No more caffeine for you!`;
  } else if (consumedCaffeine < MAX_CAFFEINE && drinks) {
    responseToUser = createResponseForRemainingCaffeine(MAX_CAFFEINE - consumedCaffeine);
  }

  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Caffeine Machine</h1>
          <p className="lead">
            Easy way to track your caffeine intake for maintaining
            it at a safe level.
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-body">
            <span>How many</span>
            <select name="drink" onChange={(e) => setSelectedDrink(e.target.value)}>
              <option value="">caffeinated drinks</option>
              {drinks.map((drink) => (
                <option
                  key={drink.id}
                  value={drink.id}
                >
                  {drink.name}
                </option>
              ))}
            </select>
            <span> have you had today?</span>
            <input
              name="amount"
              type="number"
              min="0"
              value={drinkAmount}
              onChange={(e) => handleAmountChange(e)}
            />
          </div>
          <div style={{ whiteSpace: "pre-wrap" }} className="card card-body">
            <p>{responseToUser}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;

if (document.getElementById('example')) {
  ReactDOM.render(<Example />, document.getElementById('example'));
}
