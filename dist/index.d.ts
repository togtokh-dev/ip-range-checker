/**
 * Checks if an IP address falls within a range or multiple ranges.
 *
 * @param addr - The IP address to check.
 * @param range - A CIDR range or an array of CIDR ranges.
 * @returns `true` if the IP address is within the range(s), otherwise `false`.
 */
declare function check_many_cidrs(addr: string, range: string | string[]): boolean;
export default check_many_cidrs;
