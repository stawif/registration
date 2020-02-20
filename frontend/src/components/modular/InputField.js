import React,{useState} from "react";

export default function InputField(props)
{
    return (
        <div>
            <input name={props.name} type={props.type} placeholder={props.placeholder}></input>
        </div>
    );
}



