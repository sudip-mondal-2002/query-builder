import React from "react";
import {useQuery} from "../hooks/useQuery";

export const QueryOutputComponent = () => {
    const {buildQuery} = useQuery();
    return <div className={"bg-purple-600 py-8 px-2.5"}>
        <div className={"bg-violet-800 p-2.5 rounded-xl text-white"}>
            <div className={"flex justify-between"}>
            <div>
                <b>Query: </b>
                {buildQuery()}
            </div>
                <div>
                    <button className={"bg-black px-2 text-white text-sm h-full rounded"} onClick={()=>{
                        navigator.clipboard.writeText(buildQuery()).then(()=>{
                            alert("Query copied to clipboard!");
                        })
                    }}>Copy</button>
                </div>
            </div>
        </div>
    </div>
};