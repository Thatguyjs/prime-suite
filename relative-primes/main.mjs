import { el, gcd } from "../common/common.mjs";


const error = el('#number-error');

function set_error(string) {
	error.innerText = string || '';
	return true;
}


const num_a = el('#number-a');
num_a.focus();
num_a.addEventListener('input', input_listener.bind(null, 'a'));

const num_b = el('#number-b');
num_b.addEventListener('input', input_listener.bind(null, 'b'));

function check_error(n) {
	if(Number.isNaN(n))
		return set_error("Invalid number!");
	if(!Number.isInteger(n))
		return set_error(`${n} is not an integer!`);
	if(!Number.isSafeInteger(n))
		return set_error(`${n} is too large!`);

	return false;
}

function input_listener() {
	set_error();

	const a = +num_a.value;
	const b = +num_b.value;
	if(check_error(a) || check_error(b)) return;

	run(a, b);
}


function run(a, b) {
	if(a < 1 || b < 1) return display_result('N/A');

	display_result(gcd(a, b));
}


const results = {
	coprime: el('#result-coprime'),
	gcd: el('#result-gcd')
};

function display_result(gcd) {
	results.coprime.innerText = gcd === 1 ? 'Yes' : 'No';
	results.gcd.innerText = gcd.toString();
}
