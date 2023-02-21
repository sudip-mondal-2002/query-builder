import {RuleGroup} from "../types/RuleGroup";
import {Rule} from "../types/Rule";
import {QueryTreeContext} from "../provider/QueryTreeProvider";
import React from "react";

export const useRule = (id: number[]) => {
    const {ruleGroup, setRuleGroup} = React.useContext(QueryTreeContext);
    const getRuleOrGroupFromId = (id: number[]): RuleGroup | Rule => {
        if (id.length <= 0) {
            throw new Error("Invalid id");
        }
        if (id.length === 1 && id[0] === 0) {
            return ruleGroup;
        }
        if (id.length === 1) {
            throw new Error("Invalid id");
        }
        let currentRuleGroup: RuleGroup = ruleGroup;
        for (let i = 1; i < id.length - 1; i++) {
            currentRuleGroup = currentRuleGroup.child_rules[id[i]] as RuleGroup;
        }
        return currentRuleGroup.child_rules[id[id.length - 1]];
    }

    const addRule = (id: number[]) => {
        const currRuleGroup = getRuleOrGroupFromId(id) as RuleGroup;
        currRuleGroup.child_rules.push({
            type: "rule",
            field: "Theme",
            condition: "Like",
            value: [],
            id: [...id, currRuleGroup.child_rules.length]
        });
        setRuleGroup({...ruleGroup});
    };

    const addRuleGroup = (id: number[]) => {
        const currRuleGroup = getRuleOrGroupFromId(id) as RuleGroup;
        currRuleGroup.child_rules.push({
            child_rules: [],
            conjunction: "AND",
            not: false,
            type: "rule_group",
            id: [...id, currRuleGroup.child_rules.length]
        });
        setRuleGroup({...ruleGroup});
    };

    const updateRule = (id: number[], rule: Rule) => {
        const currRuleGroup = getRuleOrGroupFromId(id.slice(0, id.length - 1)) as RuleGroup;
        currRuleGroup.child_rules[id[id.length - 1]] = rule;
        setRuleGroup({...ruleGroup});
    };

    const updateRuleGroup = (id: number[], newRuleGroup: RuleGroup) => {
        if (id.length == 1) {
            setRuleGroup(newRuleGroup);
            return;
        }
        const currRuleGroup = getRuleOrGroupFromId(id.slice(0, id.length - 1)) as RuleGroup;
        currRuleGroup.child_rules[id[id.length - 1]] = newRuleGroup;
        setRuleGroup({...ruleGroup});
    };
    const removeRuleItem = (id: number[]) => {
        const currRuleGroup = getRuleOrGroupFromId(id.slice(0, id.length - 1)) as RuleGroup;
        currRuleGroup.child_rules.splice(id[id.length - 1], 1);
        currRuleGroup.child_rules.forEach((rule, index) => {
            if(index >= id[id.length - 1]){
                rule.id[rule.id.length - 1] = index;
            }
            const  stack = [rule];
            while(stack.length > 0){
                const currRule = stack.pop();
                if(!currRule){
                    continue;
                }
                if(currRule.type === "rule_group"){
                    currRule.child_rules.forEach((rule, index) => {
                        rule.id[rule.id.length - 1] = index;
                        stack.push(rule);
                    })
                }
            }
        })
        setRuleGroup({...ruleGroup});
    }

    return {
        getRuleOrGroupFromId,
        addRule,
        addRuleGroup,
        updateRule,
        removeRuleItem,
        updateRuleGroup,
    }
}