class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			result: '',
			emoji: '',
			showInvalid: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.hasResult = this.hasResult.bind(this);
	}
	render() {
		return (
			<div id='container'>
				<section id='header'>
					<h1>howmanyhotdogs</h1>
					<h3>The premier USD-to-CHD currency converter</h3>
				</section>
				<section id='price-input'>
					<form onSubmit={this.handleSubmit}>
						<div>
							${' '}
							<input
								type='text'
								onChange={this.handleChange}
								placeholder='0.00'
							></input>{' '}
							USD
						</div>
						{/* <div id="validation-comment" className={this.state.showInvalid ? '' : 'hidden'}>Invalid input</div> */}
					</form>
				</section>
				<section id='result'>
					<h1 id='result-value' className={this.hasResult() ? '' : 'hidden'}>
						{this.state.result}
					</h1>
					<div id='result-desc' className={this.hasResult() ? '' : 'hidden'}>
						Costco hot dogs*
					</div>
					<div id='result-emoji' className={this.hasResult() ? '' : 'hidden'}>
						{this.state.emoji}
					</div>
				</section>
			</div>
		);
	}
	hasResult() {
		return this.state.result !== undefined && this.state.result !== '';
	}
	handleChange(evt) {
		let elem = evt.target;
		let inputVal = evt.target.value.trim();
		let newInput = +inputVal;
		// let regex = /^[0-9]*(\.[0-9]?[0-9]?)?$/;
		if (isNaN(newInput)) {
			// invalid
			elem.classList.add('invalid');
			this.setState({
				result: '',
				showInvalid: true
			});
		} else {
			elem.classList.remove('invalid');
			if (inputVal === '') {
				// empty input
				this.setState({
					result: '',
					showInvalid: false
				});
			} else {
				// valid input
				this.setState({
					input: newInput,
					result: roundCHD(toCHD(newInput)),
					emoji: generateEmojis(roundCHD(toCHD(newInput))),
					showInvalid: false
				});
			}
		}
	}
	handleSubmit(evt) {
		let inputElem = evt.target[0];
		inputElem.blur(); // close mobile keyboards
		evt.preventDefault();
	}
}

const dogPrice = 1.5;
const HOTDOG_UNICODE = '\ud83c\udf2d';

function toCHD(usdAmount) {
	return usdAmount / dogPrice;
}
function roundCHD(amt) {
	return Math.round(amt * 10) / 10;
}
function generateEmojis(num) {
	let numFullDogs = Math.floor(num);
	return HOTDOG_UNICODE.repeat(numFullDogs);
}

ReactDOM.render(<MainComponent />, document.getElementById('root'));
