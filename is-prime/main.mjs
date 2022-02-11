import { el, factors, is_prime } from "../common/common.mjs";


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
	if(val < 2) return display_result(false, []);

	// I realize that I can check if `factors(val).length === 2` for a primality test, but I might make
	// the factor list optional in the future. `primality_test(val)` also doesn't take much time
	display_result(is_prime(val), factors(val));
}


const results = {
	is_prime: el('#result-is-prime'),
	factor_count: el('#result-factor-count'),
	factors: el('#result-factors')
};

function display_result(is_prime, factors) {
	results.is_prime.innerText = is_prime ? 'Yes' : 'No';

	results.factor_count.innerText = factors.length;
	results.factors.innerText = factors.join(', ');
}
