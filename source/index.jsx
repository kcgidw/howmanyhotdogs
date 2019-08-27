
class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: 0,
			result: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getDogsText = this.getDogsText.bind(this);
	}
	render() {
		return (
			<div id="container">
				<section id="header">
					<h1>howmanyhotdogs</h1>
					<h3>The premier USD-to-CHD currency converter</h3>
				</section>
				<section id="price-input">
					<form onSubmit={this.handleSubmit}>
						$ <input type="text" onChange={this.handleChange} placeholder="0.00"></input> USD
					</form>
				</section>
				<section id="result">
					{this.getDogsText()}
				</section>
			</div>
		);
	}
	handleChange(evt) {
		let newInput = +evt.target.value;
		if (isNaN(newInput)) {
		} else {
			this.setState({
				input: newInput,
				result: toCHD(newInput),
			});
		}
	}
	handleSubmit(evt) {
		evt.preventDefault();
	}
	getDogsText() {
		if(!this.state.result) {
			return '';
		}
		let strResult = Math.round(this.state.result * 10) / 10;
		return (<p>{strResult} <span className="nowrap">Costco hot dogs</span></p>);
	}
}

const dogPrice = 1.5;

function toCHD(usdAmount) {
	return usdAmount / dogPrice;
}

ReactDOM.render(
	<MainComponent />,
	document.getElementById('root')
);
