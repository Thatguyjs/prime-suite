import { el, sieve, is_prime } from "../common/common.mjs";


const error = el('#number-error');

function set_error(string) {
	error.innerText = string || '';
}


const number = el('#number');
number.focus();

number.addEventListener('input', () => {
	set_error();
	const val = +number.value;

	if(Number.isNaN(val))
		return set_error("Invalid number!");
	if(!Number.isInteger(val))
		return set_error(`${val} is not an integer!`);
	if(!Number.isSafeInteger(val))
		return set_error(`${val} is too large!`);

	run(val);
});


function run(val) {
	if(val < 2) return display_result([]);

	display_result(factorize(val));
}


// https://en.wikipedia.org/wiki/Trial_division
function factorize(n) {
	if(is_prime(n)) return [n];

	let factors = [];

	while(n % 2 === 0) {
		factors.push(2);
		n /= 2;
	}

	let factor = 3;

	while(n > 1) {
		if(n % factor === 0) {
			factors.push(factor);
			n /= factor;
		}
		else factor += 2;
	}

	return factors;
}

// https://en.wikipedia.org/wiki/Quadratic_sieve
function quad_sieve(n) {
	// TODO
}


const results = {
	factors: el('#result-factors'),
	total: el('#result-total'),
	distinct: el('#result-distinct')
};

function display_result(factors) {
	let factor_count = {};

	for(let f in factors) {
		if(!(factors[f] in factor_count)) factor_count[factors[f]] = 0;
		factor_count[factors[f]]++;
	}

	const sorted = Object.keys(factor_count).sort((a, b) => +a - +b);
	let factor_strings = [];

	for(let s in sorted) {
		const f = +sorted[s];
		if(factor_count[f] > 1) factor_strings.push(`${f}<sup>${factor_count[f]}</sup>`);
		else factor_strings.push(f.toString());
	}

	results.factors.innerHTML = factor_strings.join(' \u00d7 '); // Unicode multiplication symbol
	results.total.innerText = factors.length.toString();
	results.distinct.innerText = factor_strings.length.toString();
}
