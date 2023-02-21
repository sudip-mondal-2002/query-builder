import {ConditionType, Rule} from "../types/Rule";
import {RuleGroup} from "../types/RuleGroup";
import {QueryTreeContext} from "../provider/QueryTreeProvider";
import React from "react";

export const useQuery = () => {
    const {ruleGroup, setRuleGroup} = React.useContext(QueryTreeContext);
    const getSQLCondition = (condition: ConditionType): string => {
        switch (condition) {
            case "Equals":
                return "=";
            case "Does not equal":
                return "<>";
            case "Like":
                return "LIKE";
            case "Not like":
                return "NOT LIKE";
            case "Is Empty":
                return "IS NULL";
            case "Is":
                return "IS";
            case "Is not":
                return "IS NOT";
        }
    }


    const buildQueryFromRule = (rule: Rule): string => {
        if (!rule.field || !rule.condition || !rule.value) {
            return ("1 = 1");
        }
        if(rule.condition === "Is Empty" ){
            return `${rule.field} ${getSQLCondition(rule.condition)}`;
        }
        return `(${rule.field} ${getSQLCondition(rule.condition)} (${rule.value?.join(", ")}))`;
    }
    const buildQueryFromRuleGroup = (ruleGroup: RuleGroup): string => {
        if (ruleGroup.child_rules.length === 0) {
            return "(1 = 1)";
        }
        let query = "(";
        if (ruleGroup.not) {
            query += "NOT ";
        }
        ruleGroup.child_rules.map((rule, index) => {
            if (rule.type === "rule") {
                return buildQueryFromRule(rule);
            } else {
                return buildQueryFromRuleGroup(rule);
            }
        }).forEach((ruleQuery, index) => {
            if (index > 0) {
                query += ` ${ruleGroup.conjunction} `;
            }
            query += ruleQuery;
        })
        query += ")";
        return query;
    }
    const buildQuery = (): string => {
        return buildQueryFromRuleGroup(ruleGroup);
    }
    return {
        buildQuery
    }
}