import checkManyCidrs from "../src/index"; // Adjust path if necessary

describe("IP Range Checker", () => {
  describe("IPv4 tests", () => {
    it("should return true for an IP within a CIDR range", () => {
      expect(checkManyCidrs("192.168.1.1", "192.168.1.0/24")).toBe(true);
    });

    it("should return false for an IP outside a CIDR range", () => {
      expect(checkManyCidrs("192.168.2.1", "192.168.1.0/24")).toBe(false);
    });

    it("should return true for matching single IPs", () => {
      expect(checkManyCidrs("192.168.1.1", "192.168.1.1")).toBe(true);
    });

    it("should return false for non-matching single IPs", () => {
      expect(checkManyCidrs("192.168.1.1", "192.168.1.2")).toBe(false);
    });

    it("should handle multiple CIDR ranges", () => {
      const ranges = ["192.168.0.0/16", "10.0.0.0/8"];
      expect(checkManyCidrs("192.168.1.1", ranges)).toBe(true);
      expect(checkManyCidrs("10.1.1.1", ranges)).toBe(true);
      expect(checkManyCidrs("172.16.0.1", ranges)).toBe(false);
    });
  });

  describe("IPv6 tests", () => {
    it("should return true for an IPv6 address within a CIDR range", () => {
      expect(checkManyCidrs("2001:cdba::3257:9652", "2001:cdba::/64")).toBe(
        true
      );
    });

    it("should return false for an IPv6 address outside a CIDR range", () => {
      expect(checkManyCidrs("2001:cdba::3257:9652", "2001:abcd::/64")).toBe(
        false
      );
    });

    it("should return true for matching single IPv6 addresses", () => {
      expect(
        checkManyCidrs("2001:cdba::3257:9652", "2001:cdba::3257:9652")
      ).toBe(true);
    });

    it("should handle IPv4-mapped IPv6 addresses", () => {
      expect(checkManyCidrs("::ffff:192.168.1.1", "192.168.0.0/16")).toBe(true);
    });
  });

  describe("Error handling", () => {
    it("should return false for invalid IP addresses", () => {
      expect(checkManyCidrs("invalid-ip", "192.168.1.0/24")).toBe(false);
    });

    it("should return false for invalid CIDR ranges", () => {
      expect(checkManyCidrs("192.168.1.1", "invalid-cidr")).toBe(false);
    });
  });
});
