import {RuleGroup} from "../types/RuleGroup";
import React from "react";
export const QueryTreeContext = React.createContext<any>(null);

export const QueryTreeProvider = ({children}: { children: React.ReactNode }) => {
    const [ruleGroup, setRuleGroup] = React.useState<RuleGroup>({
        child_rules: [],
        conjunction: "AND",
        not: false,
        type: "rule_group",
        id: [0]
    });


    return <QueryTreeContext.Provider
        value={{
            ruleGroup,
            setRuleGroup
        }}>
        {children}
    </QueryTreeContext.Provider>
}