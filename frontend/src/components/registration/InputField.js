// this file is used to make input fields in any page

import React, { useState } from "react";


export default function useInput({ type, placeholder }) {
    const [value, setValue] = useState("");

    const input = (
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type={type}
        placeholder={placeholder}
        
      />
    );
    return [value, input];
  }


