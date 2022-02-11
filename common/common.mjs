// Useful and commonly-used functions


export function el(selector) {
	return document.querySelector(selector);
}

export function els(selectors) {
	return document.querySelectorAll(selectors);
}


export function gcd(a, b) {
	a = Math.abs(a);
	b = Math.abs(b);
	if(b > a) [a, b] = [b, a];

	while(a > 0) {
		const temp = a;
		a = b % a;
		b = temp;
	}

	return b;
}

export function factors(n, sort=true) {
	if(n === 1) return [1];

	const even = n % 2 === 0;
	const max = Math.sqrt(n);
	const step = even + 1;

	let result = [1];

	for(let i = even ? 2 : 3; i <= max; i += step) {
		if(n % i !== 0) continue;

		result.push(i);

		const comp = n / i;
		if(comp !== i) result.push(comp);
	}

	result.push(n);
	if(sort) result.sort((a, b) => a - b);
	return result;
}


// Adapted from https://en.wikipedia.org/wiki/Primality_test#JavaScript
export function is_prime(val) {
	if(val <= 3) return val > 1;
	if(val % 2 === 0 || val % 3 === 0) return false;

	let count = 5;

	while(count * count <= val) {
		if(val % count === 0 || val % (count + 2) === 0) return false;
		count += 6;
	}

	return true;
}


// Possibly faster than `array.push(n);`, don't know for sure
export function int_range(start, stop, step=1, type=null, offset=0) {
	if(stop < start) [start, stop] = [stop, start];

	const diff = Math.floor((stop - start) / step) + 1;
	const ints = type ? new type(diff + offset) : new Array(diff + offset);

	for(let i = 0; i < diff; i++)
		ints[i + offset] = start + i * step;

	return ints;
}

function sieve_step(nums, start, end) {
	const next_prime = nums[start];
	let new_ind = start + 1;

	for(let n = start + 1; n < end; n++)
		if(nums[n] % next_prime !== 0)
			nums[new_ind++] = nums[n];

	return new_ind;
}

export function sieve(max) {
	if(max < 2) return [];
	if(max === 2) return [2];

	let nums = int_range(3, max, 2, Uint32Array, 1);
	nums[0] = 2;
	let start = 1;
	let end = nums.length;

	while(nums[0] ** 2 <= max) {
		const new_end = sieve_step(nums, start, end);
		if(end === new_end) break;

		end = new_end;
		start++;
	}

	return nums.subarray(0, end);
}
