# IP Range Checker

[![Build Status](https://travis-ci.org/danielcompton/ip-range-check.svg?branch=master)](https://travis-ci.org/danielcompton/ip-range-check)

[![NPM](https://nodei.co/npm/ip-range-checker.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ip-range-checker)

This module allows you to check if an IP address matches one or more IPs or [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) ranges. It supports IPv6, IPv4, and IPv4-mapped over IPv6 addresses.

It accepts either:

- A single CIDR or IP string, e.g., `"125.19.23.0/24"`, `"2001:cdba::3257:9652"`, or `"62.230.58.1"`
- An array of CIDR and/or IP strings, e.g., `["125.19.23.0/24", "2001:cdba::3257:9652", "62.230.58.1"]`

Importantly, it cannot match an IPv4 address to an IPv6 CIDR or vice versa (IPv4-mapped IPv6 addresses notwithstanding).

---

## Installing

```bash
npm install ip-range-checker --save
```

---

## Usage

### IPv4 Example

```typescript
import ipRangeCheck from "ip-range-checker";

// Check CIDR
ipRangeCheck("192.168.1.1", "192.168.1.0/24"); // true
ipRangeCheck("192.168.1.1", "102.1.5.2/24"); // false

// Check if IP matches a single string
ipRangeCheck("192.168.1.1", "192.168.1.1"); // true

// Check an array of CIDRs and strings
ipRangeCheck("192.168.1.1", ["102.1.5.2/24", "192.168.1.0/24", "106.1.180.84"]); // true

// IPv4-mapped IPv6 addresses
ipRangeCheck("::ffff:192.168.1.1", "192.168.0.0/16"); // true
```

### IPv6 Example

```typescript
import ipRangeCheck from "ip-range-checker";

// Handles IPv6 similarly to IPv4
ipRangeCheck("2001:cdba::3257:9652", "2001:cdba::/64"); // true
ipRangeCheck("::1", "::2/128"); // false

// IPv6 addresses/CIDRs are normalized
ipRangeCheck("2001:cdba:0000:0000:0000:0000:3257:9652", [
  "2001:cdba::3257:9652",
]); // true
```

---

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

Ensure your test files are in the `test/` directory with `.test.ts` extensions.

---

## License

This project is licensed under the ISC License.

---

## Author

**TOGTOKH.DEV**  
[GitHub Repository](https://github.com/togtokh-dev/ip-range-checker)

---
