import * as ipaddr from "ipaddr.js";

/**
 * Checks if an IP address falls within a range or multiple ranges.
 *
 * @param addr - The IP address to check.
 * @param range - A CIDR range or an array of CIDR ranges.
 * @returns `true` if the IP address is within the range(s), otherwise `false`.
 */
function check_many_cidrs(addr: string, range: string | string[]): boolean {
  if (typeof range === "string") {
    return check_single_cidr(addr, range);
  } else if (Array.isArray(range)) {
    for (const singleRange of range) {
      if (check_single_cidr(addr, singleRange)) {
        return true;
      }
    }
    return false;
  }
  return false;
}

function check_single_cidr(addr: string, cidr: string): boolean {
  try {
    const parsedAddr = ipaddr.process(addr);

    if (!cidr.includes("/")) {
      const parsedCidrAsIp = ipaddr.process(cidr);
      if (parsedAddr.kind() === "ipv6" && parsedCidrAsIp.kind() === "ipv6") {
        return (
          parsedAddr.toNormalizedString() ===
          parsedCidrAsIp.toNormalizedString()
        );
      }
      return parsedAddr.toString() === parsedCidrAsIp.toString();
    } else {
      const parsedRange = ipaddr.parseCIDR(cidr);
      return parsedAddr.match(parsedRange);
    }
  } catch (e) {
    return false;
  }
}

export default check_many_cidrs;
