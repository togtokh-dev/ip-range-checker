"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipaddr = __importStar(require("ipaddr.js"));
/**
 * Checks if an IP address falls within a range or multiple ranges.
 *
 * @param addr - The IP address to check.
 * @param range - A CIDR range or an array of CIDR ranges.
 * @returns `true` if the IP address is within the range(s), otherwise `false`.
 */
function check_many_cidrs(addr, range) {
    if (typeof range === "string") {
        return check_single_cidr(addr, range);
    }
    else if (Array.isArray(range)) {
        for (const singleRange of range) {
            if (check_single_cidr(addr, singleRange)) {
                return true;
            }
        }
        return false;
    }
    return false;
}
function check_single_cidr(addr, cidr) {
    try {
        const parsedAddr = ipaddr.process(addr);
        if (!cidr.includes("/")) {
            const parsedCidrAsIp = ipaddr.process(cidr);
            if (parsedAddr.kind() === "ipv6" && parsedCidrAsIp.kind() === "ipv6") {
                return (parsedAddr.toNormalizedString() ===
                    parsedCidrAsIp.toNormalizedString());
            }
            return parsedAddr.toString() === parsedCidrAsIp.toString();
        }
        else {
            const parsedRange = ipaddr.parseCIDR(cidr);
            return parsedAddr.match(parsedRange);
        }
    }
    catch (e) {
        return false;
    }
}
exports.default = check_many_cidrs;
