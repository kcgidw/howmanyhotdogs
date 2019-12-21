const {useState, useEffect} = React;

const DOG_PRICE = 1.50;

function toCHD(usdAmount) {
	return usdAmount / DOG_PRICE;
}

function roundCHD(amt) {
	return Math.round(amt * 10) / 10;
}

const Home = () => {
	const [inputString, setInputString] = useState('');
	const [result, setResult] = useState('');
	const [warnInput, setWarnInput] = useState(true);

	// validate input
	useEffect(() => {
		const input = +inputString;
		if (Number.isNaN(input)) {
			// invalid input
			setResult('');
			setWarnInput(true);
		} else {
			if (inputString === '') {
				// empty input
				setResult('');
				setWarnInput(false);
			} else {
				// valid input
				setInputString(input);
				setResult(roundCHD(toCHD(input)));
				setWarnInput(false);
			}
		}
	}, [inputString]);

	const handleSubmit = (evt) => {
		const inputElem = evt.target[0];
		inputElem.blur(); // close mobile keyboards
		evt.preventDefault();
	};

	const hasResult = result !== undefined && result !== '';

	return (
		<div id="container">
			<section id="header">
				<h1>howmanyhotdogs</h1>
				<h3>The premier USD-to-CHD currency converter</h3>
			</section>

			<section id="price-input">
				<form onSubmit={handleSubmit}>
					<div>
						$ <input
							type="text"
							onChange={(evt) => setInputString(evt.target.value.trim())}
							placeholder="0.00"
							className={warnInput ? 'invalid' : ''}></input> USD
					</div>
				</form>
			</section>

			<section id="result">
				<h1 id="result-value" className={hasResult ? '' : 'hidden'}>
					{result}
				</h1>
				<div id="result-desc" className={hasResult ? '' : 'hidden'}>
					Costco hot dogs
				</div>
			</section>
		</div>
	);
};

ReactDOM.render(
	<Home />,
	document.getElementById('root')
);
