
class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: 0,
			result: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.getDogs = this.getDogs.bind(this);
	}
	render() {
		return (
			<div id="container">
				<section id="header">
					<h1>howmanyhotdogs</h1>
					<h3>The premier USD-to-CHD currency converter</h3>
				</section>
				<section id="price-input">
					<div>
						$ <input type="text" pattern="[0-9]*" onChange={this.handleChange} placeholder="0.00"></input> USD
					</div>
				</section>
				<section id="result">
					{this.getDogs()}
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
	getDogs() {
		if(!this.state.result) {
			return '';
		}
		let strResult = Math.round(this.state.result * 10) / 10;
		return (<p>{strResult} <span class="nowrap">Costco hot dogs</span></p>);
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
