import React from "react";
import {ConditionType, FieldType, possibleConditions, possibleFields, Rule} from "../types/Rule";
import {useRule} from "../hooks/useRule";

export const RuleComponent = ({id}: { id: number[] }) => {
    const {getRuleOrGroupFromId, updateRule, removeRuleItem} = useRule(id);
    const rule = getRuleOrGroupFromId(id) as Rule;
    return <div className={"ml-1 grid grid-cols-4 gap-4 py-2"}>
        <select className={"bg-zinc-600 rounded text-white p-2"} onChange={(e) => {
            updateRule(id, {...rule, field: e.target.value as FieldType})
        }} value={rule.field}>
            {
                possibleFields.map((field, index) => {
                    return <option key={index} value={field}>{field}</option>
                })
            }
        </select>
        <select className={"bg-zinc-600 rounded text-white p-2"} onChange={(e) => {
            updateRule(id, {...rule, condition: e.target.value as ConditionType})
        }} value={rule.condition}>
            {
                possibleConditions.map((condition, index) => {
                    return <option key={index} value={condition}>{condition}</option>
                })
            }
        </select>
        <input disabled={rule.condition === "Is Empty"} className={"bg-zinc-600 rounded p-2 text-white"} type={"text"} value={rule.value?.join(",")} onChange={(e) => {
            updateRule(id, {...rule, value: e.target.value.split(",")})
        }}/>
        {id.length > 1 && <button className={"bg-red-600 mr-6 text-white"} onClick={() => {
            removeRuleItem(id);
        }}>
            Remove rule
        </button>}
    </div>;
}