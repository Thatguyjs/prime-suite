import { el, sieve } from "../common/common.mjs";


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
	if(val > 2 ** 31 - 1)
		return set_error(`${val} is too large!`);

	run(val);
});


function run(val) {
	if(val < 2) return display_result([]);

	display_result(sieve(val));
}


const results = {
	prime_count: el('#result-prime-count'),
	primes: el('#result-primes')
};

function display_result(primes, message) {
	const count = primes.length;
	results.prime_count.innerText = message ? message : count;

	results.primes.replaceChildren();
	add_primes(primes);
}

// Uses chunking if primes.length > 1000 (prevents browser crashing)
function add_primes(primes, start=0) {
	if(primes.length > 1000) {
		const end = Math.min(start + 1000, primes.length);

		for(let p = start; p < end; p++) {
			const span = document.createElement('span');
			span.innerText = primes[p];

			results.primes.appendChild(span);
		}

		if(end !== primes.length)
			window.requestAnimationFrame(add_primes.bind(null, primes, end));
	}
	else {
		for(let p in primes) {
			const span = document.createElement('span');
			span.innerText = primes[p];

			results.primes.appendChild(span);
		}
	}
}
