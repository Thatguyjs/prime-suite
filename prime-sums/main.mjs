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
	if(!Number.isSafeInteger(val))
		return set_error(`${val} is too large!`);

	run(val);
});


function run(val) {
	if(val < 4) return display_result(false, []);

	const primes = sieve(val - 1);
	let highest = primes.length - 1;
	let lowest = 0;

	while(highest >= lowest) {
		const p_high = primes[highest];
		const p_low = primes[lowest];

		if(p_high + p_low < val)
			lowest++;
		else if(p_high + p_low > val)
			highest--;
		else
			break;
	}

	if(highest < lowest)
		display_result(false, []);
	else
		display_result(true, [primes[lowest], primes[highest]]);
}


const results = {
	sum_of_2: el('#result-sum-of-2'),
	nums: el('#result-nums'),
};

function display_result(sum_of_2, nums) {
	results.sum_of_2.innerText = sum_of_2 ? 'Yes' : 'No';
	results.nums.innerText = nums.join(' + ');
}
