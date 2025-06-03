import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stepText, setStepText] = useState('');
  const [animateBar, setAnimateBar] = useState(false);
  const [showBottomExplosion, setShowBottomExplosion] = useState(false);

  const stepMessages = [
    'Reading your mind...',
    'Analyzing brain pattern...',
    'Connecting to your brain via bluetooth...',
    'Calculating 6.37E+89124334534534667577475 possible combinations...',
    'Picking final result...',
  ];

  const handleInput = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const inputValue = evt.target.elements.query.value.trim();
    const numericValue = Number(inputValue);

    if (inputValue === "") {
      toast.error('Nothing? Actually?!', { duration: 5000 });
      setQuery("");
      return;
    }

    if (numericValue <= 0) {
      toast.error(`No way, you're ${numericValue}`, { duration: 5000 });
      setQuery('');
      return;
    }

    if (numericValue > 120) {
      toast.error(`You're actually ${numericValue}? You're hiding something, I think!`, {
        duration: 8000,
      });
      setQuery('');
      return;
    }

    setLoading(true);
    setAge(null);
    setAnimateBar(false);
    setStepText(stepMessages[0]);

    let step = 1;
    const interval = setInterval(() => {
      if (step < stepMessages.length) {
        setStepText(stepMessages[step]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    setTimeout(() => setAnimateBar(true), 50);

    setTimeout(() => {
      setLoading(false);
      setAge(numericValue);
      setShowBottomExplosion(true);
      setTimeout(() => setShowBottomExplosion(false), 10000);
    }, 10000);
  };

  const numberValidation = (e) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'Tab'
    ) {
      e.preventDefault();
      toast.error('I can recognize your age only in numbers, nothing else!', {
        duration: 5000,
      });
    }
  };

  return (
    <>
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <form className='form' onSubmit={handleSubmit}>
          <div className='aligning-container'>
            <input
              className="input"
              onChange={handleInput}
              value={query}
              type="number"
              id="query"
              name="query"
              autoFocus
              disabled={loading}
              onKeyDown={numberValidation}
              placeholder="Type in your age!"
            />
            <button type="submit" className="button" disabled={loading}>
              Guess
            </button>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </form>

        {loading && (
          <div style={{ marginTop: '1.5rem' }}>
            <p className='pop-up-text'>{stepText}</p>
            <div className="progress-container">
              <div
                className="progress-fill"
                style={{ width: animateBar ? '100%' : '0%' }}
              ></div>
            </div>
          </div>
        )}

        {age !== null && !loading && (
          <div style={{ marginTop: '1.5rem', position: 'relative' }}>
            <p className='pop-up-text'>
              I'm guessing, your age is <span style={{ textDecoration: 'underline' }}>{age}</span> years! 😱
            </p>
          </div>
        )}

        {showBottomExplosion && (
          <div className="bottom-explosion">
            <img src="../../../images/explosion.gif" alt="Explosion" />
          </div>
          )}
      </div>
    </>
  );
}

export default App;
