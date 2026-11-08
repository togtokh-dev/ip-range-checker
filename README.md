# ip-range-checker

[![NPM](https://nodei.co/npm/ip-range-checker.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ip-range-checker)

Check whether an IP address matches one or more IPs or
[CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) ranges.
It supports IPv6, IPv4, and IPv4-mapped-over-IPv6 addresses, and is built on top of
[`ipaddr.js`](https://www.npmjs.com/package/ipaddr.js).

The range argument accepts either:

- A single CIDR or IP string, e.g. `"125.19.23.0/24"`, `"2001:cdba::3257:9652"`, or `"62.230.58.1"`.
- An array of CIDR and/or IP strings, e.g. `["125.19.23.0/24", "2001:cdba::3257:9652", "62.230.58.1"]`.

An IPv4 address is not matched against an IPv6 CIDR or vice versa (IPv4-mapped IPv6
addresses notwithstanding). Invalid input returns `false` rather than throwing.

## Install

```bash
npm install ip-range-checker
```

## API

```ts
ipRangeCheck(addr: string, range: string | string[]): boolean
```

- `addr` — the IP address to test.
- `range` — a single IP/CIDR string, or an array of them.
- Returns `true` if `addr` matches any entry in `range`, otherwise `false`.

## Usage

### TypeScript

```ts
import ipRangeCheck from "ip-range-checker";

// CIDR ranges
ipRangeCheck("192.168.1.1", "192.168.1.0/24"); // true
ipRangeCheck("192.168.1.1", "102.1.5.2/24");   // false

// Single IP match
ipRangeCheck("192.168.1.1", "192.168.1.1"); // true

// Array of IPs / CIDRs
ipRangeCheck("192.168.1.1", ["102.1.5.2/24", "192.168.1.0/24", "106.1.180.84"]); // true

// IPv4-mapped IPv6 address against an IPv4 range
ipRangeCheck("::ffff:192.168.1.1", "192.168.0.0/16"); // true

// IPv6
ipRangeCheck("2001:cdba::3257:9652", "2001:cdba::/64"); // true
ipRangeCheck("2001:cdba::3257:9652", "2001:abcd::/64"); // false
```

### JavaScript (CommonJS)

```js
const ipRangeCheck = require("ip-range-checker").default;

ipRangeCheck("10.1.1.1", ["192.168.0.0/16", "10.0.0.0/8"]); // true
```

## Running tests

```bash
npm test
```

Tests live in the `test/` directory as `*.test.ts` files and run with Jest/ts-jest.

## License

ISC — TOGTOKH.DEV
