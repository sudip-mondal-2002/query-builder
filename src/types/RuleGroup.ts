import {Rule} from "./Rule";

export interface RuleGroup {
    id: number[],
    child_rules: (RuleGroup | Rule)[],
    conjunction: "AND" | "OR",
    not: boolean,
    type: "rule_group"
}