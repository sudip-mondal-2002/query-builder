import React from "react";
import {RuleComponent} from "./RuleComponent";
import {RuleGroup} from "../types/RuleGroup";
import {useRule} from "../hooks/useRule";

export const RuleGroupComponent = ({id}: { id: number[] }) => {
    const {getRuleOrGroupFromId, addRule, addRuleGroup, updateRuleGroup, removeRuleItem} = useRule(id);
    const ruleGroup = getRuleOrGroupFromId(id) as RuleGroup;
    const rules = ruleGroup.child_rules.filter((rule) => rule.type === "rule");
    const ruleGroups = ruleGroup.child_rules.filter((rule) => rule.type === "rule_group");
    return <div className={"flex flex-col items-start justify-center"}>
        <div className={"pl-1 rounded w-full my-1"} style={{
            backgroundColor: "#00000022"
        }}>
            {id.length > 1 && <button className={"bg-red-600 py-2 px-6 text-white rounded m-1"} onClick={() => {
                removeRuleItem(id);
            }}>
                Remove Group
            </button>}
            <button className={"bg-purple-500 text-white m-1 p-2 rounded mt-2"} onClick={() => {
                addRule(id)
            }}> + Add rule
            </button>
            <button className={"bg-purple-500 text-white ml-1 mb-1 p-2 rounded mt-10"} onClick={() => {
                addRuleGroup(id)
            }}> + Add new group filter
            </button>
            <div className={"my-2 ml-1"}>
                <label className="relative inline-flex items-center cursor-pointer mr-10">
                    <input type={"checkbox"} className={"sr-only peer"}
                           onChange={() => {
                               updateRuleGroup(id, {...ruleGroup, not: !ruleGroup.not});
                           }}/>
                    <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-white"><b>Not</b></span>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type={"checkbox"} className={"sr-only peer checked:bg-purple-500"}
                           onChange={() => {
                               updateRuleGroup(id, {...ruleGroup, conjunction: ruleGroup.conjunction === "AND" ? "OR" : "AND"});
                           }}/>
                    <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span className="ml-3 text-sm font-medium text-white"><b>{ruleGroup.conjunction}</b></span>
                </label>
            </div>

            {
                rules?.map((rule, index) => {
                    return <RuleComponent id={rule.id} key={index}/>
                })
            }

            <br/>
            {
                ruleGroups?.map((rule, index) => {
                    return <RuleGroupComponent id={rule.id} key={index}/>
                })
            }
        </div>
    </div>

};