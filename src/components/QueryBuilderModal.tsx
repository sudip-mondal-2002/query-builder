import React from "react";
import "../styles/index.css"
import {QueryTreeProvider} from "../provider/QueryTreeProvider";
import {RuleGroupComponent} from "./RuleGroupComponent";
import {QueryOutputComponent} from "./QueryOutputComponent";

export function QueryBuilderModal() {
    return <QueryTreeProvider>
        <div className={"bg-slate-700 bg-opacity-40 p-16 min-h-screen"}>
            <div className={"flex flex-col justify-between min-h-max"}>
        <QueryOutputComponent/>
        <RuleGroupComponent id={[0]}/>
            </div>
        </div>
    </QueryTreeProvider>
}