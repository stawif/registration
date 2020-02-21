import React,{useState, useEffect} from "react";

const InputField = React.memo( 
(props) =>{
    const [machineList, setMachineList] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const fetchProduct = async () =>{
        console.log("Fetch calls");
        const responseMachineList = await fetch("http://127.0.0.1:8000/list-of-machines/");
        const jsonMachineList = await responseMachineList.json();
        setMachineList(jsonMachineList);
      }
    
      fetchProduct(); 

      function checkMachine() {
        try {
          //errors.firstName.message();
          setErrorMessage("");
          const showList = (item, index) => {
            if (props.machineName === item.name) {
              setErrorMessage("* This machine name is already exist!!!");
            }
            else{}
          };
          machineList.forEach(showList);
        } 
        catch (err) {}
      }

      useEffect(
        () => {
          checkMachine();
        },
        [machineList,errorMessage,props.machineList]
      );
          

    return (
        <div>
            <input 
                    type={props.type} 
                    className="mb-2" 
                    name={props.name} 
                    placeholder={props.placeholder} 
                    onChange={props.onChange} 
            />
			
            <br/>
            { errorMessage }
        </div>
    );
}
);

export default InputField;


